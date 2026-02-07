
// --- DATA ---
let issues = [];
let profiles = [];

// --- STATE ---
let currentIssueIndex = 0;
let threshold = 0.5;
let radarChart = null;
let barChart = null;
let mapCanvas = null;
let currentProfile = null;

// --- INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch Data
        const [issuesRes, profilesRes] = await Promise.all([
            fetch('issues.json'),
            fetch('profiles.json')
        ]);

        if (!issuesRes.ok || !profilesRes.ok) throw new Error("Failed to load data");

        issues = await issuesRes.json();
        profiles = await profilesRes.json();

        // Initialize UI
        initCharts();
        renderProfileList();
        renderProfileInspector(profiles[0]);

        // Setup Listeners
        document.getElementById('thresholdSlider').addEventListener('input', (e) => {
            threshold = parseFloat(e.target.value) / 100;
            document.getElementById('thresholdValue').innerText = threshold.toFixed(2);
            updateSimulationUI();
        });

        // Initial set issue
        setIssue(0);

    } catch (error) {
        console.error("Initialization Error:", error);
        document.body.innerHTML = `<div class="p-10 text-red-600 font-bold">Error loading data: ${error.message}. Please insure you are running this on a local server.</div>`;
    }
});

// --- CALCULATION ENGINE ---
function calculateRelevance(user, issue) {
    let reasons = [];

    // 1. Demographic (D)
    let scoreD = 0;
    let dReasons = [];
    if (issue.targetDemo.minAge && user.demographics.age >= issue.targetDemo.minAge) {
        scoreD += 0.5; dReasons.push(`Age match`);
    }
    if (issue.targetDemo.family && user.demographics.family) {
        const hasKids = user.demographics.family.some(f => f.toLowerCase().includes('son') || f.toLowerCase().includes('daughter') || f.toLowerCase().includes('child') || f.toLowerCase().includes('grand'));
        // If issue targets 'kids', check if user has relevant relatives
        if (issue.targetDemo.family === 'kids' && hasKids) {
            scoreD += 0.5; dReasons.push(`Family match (Has children/grandkids)`);
        }
    }
    if (issue.targetDemo.employment && user.demographics.employment === issue.targetDemo.employment) {
        scoreD += 0.5; dReasons.push(`Employment match`);
    }
    scoreD = Math.min(scoreD, 1.0);
    if (dReasons.length === 0) scoreD = 0.1;

    // 2. Geospatial (G)
    const dist = Math.sqrt(Math.pow(user.location.x - issue.location.x, 2) + Math.pow(user.location.y - issue.location.y, 2));
    const maxDist = issue.location.radius * 1.5;
    let scoreG = 0;
    if (issue.location.radius > 0) {
        scoreG = Math.max(0, 1 - (dist / maxDist));
    }

    // 3. Interest (X)
    const matches = user.interests.filter(i => issue.tags.includes(i));
    let scoreX = matches.length / Math.max(1, issue.tags.length);
    if (matches.length > 0) scoreX = Math.max(scoreX, 0.4);

    // 4. Social (S)
    let scoreS = Math.min(1, user.socialConnections / 40) * 0.8;

    // TOTAL
    const total = (scoreD * issue.weights.D) +
        (scoreG * issue.weights.G) +
        (scoreS * issue.weights.S) +
        (scoreX * issue.weights.X);

    // Reasoning Generation
    if (scoreG > 0.6 && issue.weights.G > 0) reasons.push(`<strong>Geospatial:</strong> Close proximity (${Math.round(dist)} units).`);
    if (scoreD > 0.6 && issue.weights.D > 0) reasons.push(`<strong>Demographics:</strong> ${dReasons.join(", ")}.`);
    if (scoreX > 0.5 && issue.weights.X > 0) reasons.push(`<strong>Interests:</strong> Matches '${matches.join(", ")}'.`);
    if (total < threshold) reasons.push(`<em>Score too low based on current weights (${issue.title}).</em>`);

    return {
        total: total.toFixed(2),
        breakdown: { D: scoreD, G: scoreG, S: scoreS, X: scoreX },
        reasons: reasons
    };
}

// --- VIEW 1: PROFILE INSPECTOR ---
function renderProfileList() {
    const listEl = document.getElementById('profile-list');
    listEl.innerHTML = '';
    profiles.forEach(p => {
        const div = document.createElement('div');
        div.className = `p-3 rounded-lg cursor-pointer transition-colors hover:bg-blue-50 border border-transparent hover:border-blue-100 flex justify-between items-center group`;
        div.innerHTML = `
        <div>
            <div class="font-medium text-slate-700 group-hover:text-blue-700">${p.name}</div>
            <div class="text-xs text-slate-400">${p.demographics.age}yo • ${p.demographics.employment}</div>
        </div>
        <div class="text-xs font-mono text-slate-300 group-hover:text-blue-400">${p.id}</div>
    `;
        div.onclick = () => renderProfileInspector(p);
        listEl.appendChild(div);
    });
}

function renderProfileInspector(user) {
    currentProfile = user;
    document.getElementById('inspector-name').textContent = user.name;
    document.getElementById('inspector-id').textContent = user.id;

    // Expertise Summary
    const edu = user.expertise_data?.education[0];
    const level = edu ? edu.level : "N/A";
    const domain = edu ? edu.degree : "General";
    document.getElementById('inspector-expertise').innerHTML = `
        <div class="font-medium text-slate-800">${level}</div>
        <div class="text-xs text-slate-500 truncate" title="${domain}">${domain}</div>
    `;

    document.getElementById('inspector-badges').innerHTML = `
    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">${user.demographics.employment}</span>
    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">${user.demographics.family ? user.demographics.family.length + ' Relatives' : 'No Direct Relatives'}</span>
`;

    document.getElementById('inspector-demo').innerHTML = `
    <li><strong>Age:</strong> ${user.demographics.age}</li>
    <li><strong>Income:</strong> ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(user.demographics.income)}</li>
    <li><strong>Family:</strong> <ul class="list-disc pl-4 mt-1">${user.demographics.family ? user.demographics.family.map(f => `<li>${f}</li>`).join('') : '<li class="text-slate-400 italic">None</li>'}</ul></li>
`;
    document.getElementById('inspector-geo').innerHTML = `
    <li><strong>Coords:</strong> [${user.location.x}, ${user.location.y}]</li>
    <li><strong>Sector:</strong> ${Math.floor(user.location.x / 50)}-${Math.floor(user.location.y / 50)}</li>
`;
    document.getElementById('inspector-interests').innerHTML = user.interests.map(i => `<span class="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded text-xs">${i}</span>`).join('');

    // RADAR CHART UPDATE
    // Map attributes to 6 abstract axes to show "shape"
    // D: Age, Income, Family, Age, Income, Family
    const dData = [
        (user.demographics.age / 90) * 100,
        (user.demographics.income / 210000) * 100,
        (user.demographics.family ? Math.min(100, user.demographics.family.length * 25) : 10), // Family Size Score
        (user.demographics.age / 90) * 80,
        ((user.demographics.income / 210000) / 3) * 90 + 30,
        user.demographics.family ? 80 : 30 // Binary family presence
    ];

    // G: X, Y, X, Y, X, Y (Create a shape based on location)
    const gData = [
        user.location.x, user.location.y,
        100 - user.location.x, 100 - user.location.y,
        (user.location.x + user.location.y) / 2, 50
    ];

    // S: Connections (Repeated with variance)
    const sBase = (user.socialConnections / 60) * 100;
    const sData = [sBase, 100 - (sBase * 0.8), sBase * 1.1, sBase * 0.9, sBase, 100 - (sBase * 0.7)];

    // X: Interest count & diversity
    const xBase = (user.interests.length / 8) * 100;
    const xData = [xBase, xBase * 1.2, xBase * 0.8, xBase, xBase * 0.5, xBase * 1.1];

    radarChart.data.datasets[0].data = dData;
    radarChart.data.datasets[1].data = gData;
    radarChart.data.datasets[2].data = sData;
    radarChart.data.datasets[3].data = xData;
    radarChart.update();
}

// --- VIEW 2: SIMULATOR ---
function setIssue(index) {
    currentIssueIndex = index;
    const issue = issues[index];

    // Update UI Text
    document.getElementById('scenario-title').innerText = issue.title;
    document.getElementById('scenario-desc').innerText = issue.desc;
    document.getElementById('scenario-logic').innerHTML = issue.logic;

    [0, 1, 2].forEach(i => {
        const btn = document.getElementById(`btn-issue-${i}`);
        if (i === index) btn.className = "flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white shadow-sm transition-all";
        else btn.className = "flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all";
    });

    document.getElementById('weight-d').innerText = issue.weights.D;
    document.getElementById('weight-g').innerText = issue.weights.G;
    document.getElementById('weight-s').innerText = issue.weights.S;
    document.getElementById('weight-x').innerText = issue.weights.X;

    updateSimulationUI();
}

function updateSimulationUI() {
    const issue = issues[currentIssueIndex];
    const memberList = document.getElementById('microcommunity-list');
    memberList.innerHTML = '';
    let count = 0;

    // Draw Map
    drawMap(issue);

    // List Population
    profiles.forEach(p => {
        const result = calculateRelevance(p, issue);
        const isIncluded = result.total >= threshold;

        if (isIncluded) {
            count++;
            const el = document.createElement('div');
            el.className = "p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer flex justify-between items-center group";
            el.innerHTML = `
            <div>
                <div class="text-sm font-semibold text-slate-700">${p.name}</div>
                <div class="text-xs text-slate-500">Relevance: <span class="text-blue-600 font-bold">${result.total}</span></div>
            </div>
            <svg class="w-4 h-4 text-slate-300 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        `;
            el.onclick = () => openModal(p, result);
            memberList.appendChild(el);
        }
    });

    document.getElementById('member-count').innerText = `${count}/${profiles.length}`;
}

function drawMap(issue) {
    const canvas = document.getElementById('simCanvas');
    if (!mapCanvas) {
        // Initial Setup
        mapCanvas = canvas;
    }

    // Handle Resize
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    // Draw Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const scaleX = w / 100;
    const scaleY = h / 100;

    // Draw Issue Radius
    if (issue.location.radius > 0) {
        ctx.beginPath();
        ctx.arc(issue.location.x * scaleX, issue.location.y * scaleY, issue.location.radius * scaleX, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.stroke();

        // Center Dot
        ctx.beginPath();
        ctx.arc(issue.location.x * scaleX, issue.location.y * scaleY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
    }

    // Draw Users
    profiles.forEach(p => {
        const res = calculateRelevance(p, issue);
        const included = res.total >= threshold;

        ctx.beginPath();
        const px = p.location.x * scaleX;
        const py = p.location.y * scaleY;

        ctx.arc(px, py, included ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = included ? '#2563eb' : '#cbd5e1'; // Blue vs Grey
        ctx.fill();

        if (included) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
}

// --- MODAL ---
function openModal(user, result) {
    const issue = issues[currentIssueIndex];

    document.getElementById('modal-username').innerText = user.name;
    document.getElementById('modal-score').innerText = result.total;
    document.getElementById('modal-score-bar').style.width = `${result.total * 100}%`;

    const statusEl = document.getElementById('modal-status');
    if (result.total >= threshold) {
        statusEl.className = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1";
        statusEl.innerText = "Included";
    } else {
        statusEl.className = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1";
        statusEl.innerText = "Excluded";
    }

    document.getElementById('modal-reasoning').innerHTML = result.reasons.length > 0
        ? `<ul class="list-disc pl-4 space-y-1">${result.reasons.map(r => `<li>${r}</li>`).join('')}</ul>`
        : `<p class="italic text-slate-400">Moderate relevance.</p>`;

    // Modal Chart
    barChart.data.datasets[0].data = [
        result.breakdown.D * issue.weights.D,
        result.breakdown.G * issue.weights.G,
        result.breakdown.S * issue.weights.S,
        result.breakdown.X * issue.weights.X
    ];
    barChart.data.datasets[1].data = [issue.weights.D, issue.weights.G, issue.weights.S, issue.weights.X];
    barChart.update();

    document.getElementById('factor-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('factor-modal').classList.add('hidden');
}

// --- EXPERTISE VISUALIZATION ---
function openExpertiseModal(user) {
    document.getElementById('exp-modal-username').innerText = user.name;
    document.getElementById('expertise-modal').classList.remove('hidden');

    // Wait for modal to render to get dimensions
    requestAnimationFrame(() => {
        drawKnowledgeSphere(user);
        drawExperienceWaterfall(user);
        drawResourceCloud(user);
    });
}

function closeExpertiseModal() {
    document.getElementById('expertise-modal').classList.add('hidden');
}

function drawKnowledgeSphere(user) {
    new EducationSphere('knowledge-sphere').draw(user.expertise_data?.education, null);
}

function drawExperienceWaterfall(user) {
    new ExperienceWaterfall('experience-waterfall').draw(user, null);
}

function drawResourceCloud(user) {
    const container = document.getElementById('resource-cloud');
    container.innerHTML = '';

    const resData = user.expertise_data?.resources || [];
    if (resData.length === 0) {
        container.innerHTML = '<span class="text-slate-400 italic text-sm">No resources listed.</span>';
        return;
    }

    resData.forEach(res => {
        const tag = document.createElement('span');
        // Check if res is object (new format) or string (old format fallback)
        let name = res;
        let weight = 1;

        if (typeof res === 'object' && res !== null) {
            name = res.name;
            weight = res.weight || 1;
        }

        // Size mapping: 1 (min) -> 0.75rem, 10 (max) -> 1.5rem
        const sizeRem = 0.75 + (weight / 10) * 0.75;
        const opacity = 0.6 + (weight / 10) * 0.4;

        tag.className = "inline-block align-middle mr-2 mb-1 cursor-default text-slate-700 font-semibold leading-none";
        tag.style.fontSize = `${sizeRem}rem`;
        tag.style.opacity = opacity;
        tag.innerText = name;
        // tag.title = `Rarity/Weight: ${weight}`; // Removed tooltip as requested

        container.appendChild(tag);
    });
}

// --- SETUP CHARTS ---
function initCharts() {
    // RADAR CHART (Multi-dimensional)
    const ctxRadar = document.getElementById('profileRadarChart').getContext('2d');
    radarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Val 1', 'Val 2', 'Val 3', 'Val 4', 'Val 5', 'Val 6'], // Abstract axes
            datasets: [
                {
                    label: 'Demographics',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue
                    borderColor: 'rgba(59, 130, 246, 0.8)',
                    borderWidth: 1.5,
                    pointRadius: 0
                },
                {
                    label: 'Geospatial',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)', // Green
                    borderColor: 'rgba(16, 185, 129, 0.8)',
                    borderWidth: 1.5,
                    pointRadius: 0
                },
                {
                    label: 'Social',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(168, 85, 247, 0.2)', // Purple
                    borderColor: 'rgba(168, 85, 247, 0.8)',
                    borderWidth: 1.5,
                    pointRadius: 0
                },
                {
                    label: 'Interests',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(249, 115, 22, 0.2)', // Orange
                    borderColor: 'rgba(249, 115, 22, 0.8)',
                    borderWidth: 1.5,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { display: false },
                    grid: { circular: true, color: '#e2e8f0' },
                    angleLines: { color: '#e2e8f0' },
                    pointLabels: { display: false } // Hiding axis labels
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    // BAR CHART (Modal)
    const ctxBar = document.getElementById('factorBarChart').getContext('2d');
    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Demo', 'Geo', 'Soc', 'Int'],
            datasets: [
                {
                    label: 'User Score',
                    data: [0, 0, 0, 0],
                    backgroundColor: ['#3b82f6', '#10b981', '#a855f7', '#f59e0b']
                },
                {
                    label: 'Max Potential',
                    data: [0, 0, 0, 0],
                    backgroundColor: '#f1f5f9',
                    grouped: false,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 0.8 } },
            plugins: { legend: { display: false } }
        }
    });
}

// --- EXPERTISE ENGINE ---
function calculateExpertise(user, issue) {
    let scoreEdu = 0;
    let scoreExp = 0;
    let scoreRes = 0;

    // 1. Education (Cosine Similarity of Angles)
    if (user.expertise_data?.education) {
        user.expertise_data.education.forEach(edu => {
            let diff = Math.abs(edu.angle - issue.required_education_angle);
            if (diff > 180) diff = 360 - diff;

            const widthHalved = issue.required_width / 2;
            let similarity = 0;

            if (diff <= widthHalved) similarity = 1.0;
            else if (diff <= widthHalved + 45) similarity = 0.5; // Adjacent
            else similarity = 0;

            let power = 1;
            const l = edu.level.toLowerCase();
            if (l.includes('phd')) power = 1.5;
            else if (l.includes('master')) power = 1.2;
            else if (l.includes('bachelor')) power = 1.0;
            else power = 0.5;

            scoreEdu += (similarity * power);
        });
    }

    // 2. Experience (Total Years vs Required)
    const requiredYears = issue.required_experience_years || 0;
    if (user.expertise_data?.experience) {
        const totalYears = user.expertise_data.experience.reduce((sum, e) => sum + e.years, 0);
        if (requiredYears > 0) {
            scoreExp = Math.min(1.5, totalYears / requiredYears); // Cap at 1.5x
        }
    }

    // 3. Resources (Count Matches)
    if (user.expertise_data?.resources && issue.required_resources) {
        user.expertise_data.resources.forEach(ur => {
            const rName = (typeof ur === 'object') ? ur.name : ur;
            // Simple substring match
            const match = issue.required_resources.some(req =>
                req.toLowerCase().includes(rName.toLowerCase()) ||
                rName.toLowerCase().includes(req.toLowerCase())
            );
            if (match) scoreRes += 1;
        });
    }

    return {
        total: (scoreEdu + scoreExp + scoreRes).toFixed(1),
        edu: scoreEdu,
        exp: scoreExp,
        res: scoreRes
    };
}

// --- EXPERTISE CONTROLLER ---
function switchIssueExpertise(index) {
    setIssue(index); // Updates global index and Simulator UI
    updateExpertiseUI(); // Updates Expertise UI
}

function updateExpertiseUI() {
    const issue = issues[currentIssueIndex];

    // 0. Update Selection Buttons
    [0, 1, 2].forEach(i => {
        const btn = document.getElementById(`btn-exp-${i}`);
        if (btn) {
            if (i === currentIssueIndex) btn.className = "px-2 py-2 rounded text-xs font-bold bg-blue-600 text-white shadow-sm truncate transition-all";
            else btn.className = "px-2 py-2 rounded text-xs font-bold bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 truncate transition-all";
        }
    });

    // 1. Left Block: Issue Requirements
    document.getElementById('exp-issue-category').innerText = issue.category;
    document.getElementById('exp-issue-title').innerText = issue.title;
    document.getElementById('exp-issue-desc').innerText = issue.desc;

    // document.getElementById('exp-target-angle').innerText = `Target Angle: ${issue.required_education_angle}° (±${issue.required_width / 2}°)`;
    document.getElementById('exp-target-years').innerText = issue.required_experience_years;

    const resContainer = document.getElementById('exp-target-resources');
    resContainer.innerHTML = '';
    issue.required_resources.forEach(r => {
        resContainer.innerHTML += `<span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">${r}</span>`;
    });

    // Viz: Target Sphere
    drawTargetSphere(issue);

    // 2. Right Block: Expert List (Filtered by Relevance Logic)
    const list = document.getElementById('expertise-list');
    list.innerHTML = '';

    // Sort by Expertise Score descending
    const relevantUsers = profiles
        .map(p => {
            const rel = calculateRelevance(p, issue);
            return { profile: p, relevance: rel.total };
        })
        .filter(item => item.relevance >= threshold)
        .map(item => {
            const exp = calculateExpertise(item.profile, issue);
            return { ...item, expertise: exp };
        })
        .sort((a, b) => b.expertise.total - a.expertise.total);

    if (relevantUsers.length === 0) {
        list.innerHTML = `<div class="p-4 text-center text-slate-400 text-sm italic">No relevant members found above threshold (${threshold}).</div>`;
    } else {
        relevantUsers.forEach(u => {
            const el = document.createElement('div');
            el.className = "p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer flex justify-between items-center group transition-colors";
            el.onclick = () => openCompAnalysis(u.profile, issue, u.expertise);
            el.innerHTML = `
            <div>
                <div class="font-bold text-slate-700">${u.profile.name}</div>
                <div class="text-[10px] text-slate-400">Relevance: ${u.relevance}</div>
            </div>
            <div class="text-right">
                <div class="text-lg font-bold text-emerald-600">${u.expertise.total}</div>
                <div class="text-[10px] text-slate-400 uppercase tracking-wider">Expertise</div>
            </div>
        `;
            list.appendChild(el);
        });
    }

    // Auto-select first member if available
    if (relevantUsers.length > 0) {
        openCompAnalysis(relevantUsers[0].profile, issue, relevantUsers[0].expertise);
    } else {
        document.getElementById('comp-empty-state').classList.remove('hidden');
        document.getElementById('comp-content').classList.add('hidden');
        document.getElementById('comp-user-badge').classList.add('hidden');
    }
}



function openCompAnalysis(user, issue, score) {
    document.getElementById('comp-empty-state').classList.add('hidden');
    document.getElementById('comp-content').classList.remove('hidden');

    // Show viz containers
    document.getElementById('comp-sphere').parentElement.classList.remove('hidden');
    document.getElementById('comp-waterfall').parentElement.classList.remove('hidden');
    document.getElementById('comp-resources').parentElement.classList.remove('hidden');

    document.getElementById('comp-user-badge').classList.remove('hidden');
    document.getElementById('comp-username').innerText = user.name;

    // Update Score Breakdown
    document.getElementById('comp-score-edu').innerText = score.edu ? score.edu.toFixed(1) : "0.0";
    document.getElementById('comp-score-exp').innerText = score.exp ? score.exp.toFixed(1) : "0.0";
    document.getElementById('comp-score-res').innerText = score.res ? score.res.toFixed(1) : "0.0";

    // 1. Draw Comparative Sphere
    drawCompSphere(user, issue);

    // 2. Draw Waterfall
    const reqYears = issue.required_experience_years;
    const usrYears = user.expertise_data?.experience?.reduce((a, b) => a + b.years, 0) || 0;
    // document.getElementById('comp-req-years').innerText = reqYears;
    // document.getElementById('comp-user-years').innerText = usrYears;

    // Deficit Check for individual
    if (usrYears < reqYears) document.getElementById('comp-user-years').className = "text-lg font-bold text-red-500";
    else document.getElementById('comp-user-years').className = "text-lg font-bold text-emerald-600";

    drawCompWaterfall(user, issue);

    // 3. Resources (Cloud Style)
    drawCompResourceCloud(user, issue);
}

function drawCompResourceCloud(user, issue) {
    const container = document.getElementById('comp-resources');
    container.innerHTML = '';

    const resData = user.expertise_data?.resources || [];
    if (resData.length === 0) {
        container.innerHTML = '<span class="text-slate-400 italic text-sm">No resources listed.</span>';
        return;
    }

    resData.forEach(res => {
        let name = res;
        let weight = 1;
        if (typeof res === 'object' && res !== null) {
            name = res.name;
            weight = res.weight || 1;
        }

        // Check Match
        const match = issue.required_resources.some(req =>
            req.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(req.toLowerCase())
        );

        // Size Mapping (Same as Profile Cloud)
        const sizeRem = 0.75 + (weight / 10) * 0.75;
        const opacity = 0.6 + (weight / 10) * 0.4;

        const tag = document.createElement('span');
        tag.className = "inline-block align-middle mr-2 mb-1 cursor-default font-semibold leading-none transition-all";
        tag.style.fontSize = `${sizeRem}rem`;

        if (match) {
            tag.style.color = "#2563eb"; // Blue
            tag.style.opacity = 1;
        } else {
            tag.style.color = "#94a3b8"; // Slate 400 (Grey)
            tag.style.opacity = opacity * 0.7; // Dimmer if irrelevant
        }

        tag.innerText = name;
        tag.title = match ? "Relevant Resource" : "Irrelevant Resource";
        container.appendChild(tag);
    });
}


// --- TOOLTIP MANAGER ---
const TooltipManager = {
    el: null,
    init() {
        if (this.el) return;
        this.el = document.createElement('div');
        this.el.className = "fixed pointer-events-none bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 transition-opacity duration-150";
        this.el.style.zIndex = "9999";
        document.body.appendChild(this.el);
    },
    show(html, x, y) {
        if (!this.el) this.init();
        this.el.innerHTML = html;
        // Offset to avoid cursor covering content
        const offset = 10;

        // Boundary detection (basic)
        let left = x + offset;
        let top = y + offset;

        // If close to right edge, shift left
        if (left + 150 > window.innerWidth) left = x - 160;

        this.el.style.left = `${left}px`;
        this.el.style.top = `${top}px`;
        this.el.style.opacity = '1';
    },
    move(x, y) {
        if (!this.el) return;
        const offset = 10;
        let left = x + offset;
        let top = y + offset;
        if (left + 150 > window.innerWidth) left = x - 160;
        this.el.style.left = `${left}px`;
        this.el.style.top = `${top}px`;
    },
    hide() {
        if (this.el) this.el.style.opacity = '0';
    }
};

// --- VIZ ---
class EducationSphere {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = 300;
        this.height = 300;
        this.radius = 110;
        this.svg = null;
    }

    draw(userData, issueData) {
        this.initSVG();
        if (userData) this.drawUserSectors(userData, issueData);
        if (issueData) this.drawTargetArc(issueData);
        this.drawAxes();
    }

    initSVG() {
        this.container.innerHTML = '';
        this.svg = d3.select(this.container).append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g").attr("transform", `translate(${this.width / 2},${this.height / 2})`);

        // Add Filter for Glow
        const defs = this.svg.append("defs");
        const filter = defs.append("filter").attr("id", "softGlow");
        filter.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", 3).attr("result", "blur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "blur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    }

    drawAxes() {
        const axisLabels = [
            { deg: 0, label: "Philosophy", text: "& Theory" },
            { deg: 90, label: "Natural Sciences", text: "& Medicine" },
            { deg: 180, label: "Business", text: "& Operations" },
            { deg: 270, label: "Arts &", text: "Humanities" },
            { deg: 45, label: "Logic &", text: "Mathematics" },
            { deg: 135, label: "Engineering", text: "& Technology" },
            { deg: 225, label: "Policy &", text: "Social Science" },
            { deg: 315, label: "Education", text: "& Culture" }
        ];

        const axes = this.svg.append("g").attr("class", "axes opacity-40");
        axisLabels.forEach(d => {
            const angle = (d.deg - 90) * Math.PI / 180;
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);

            axes.append("line").attr("x1", 0).attr("y1", 0).attr("x2", x).attr("y2", y).attr("stroke", "#94a3b8").attr("stroke-width", 1).attr("stroke-dasharray", "4 4");
            axes.append("text").attr("x", x * 1.15).attr("y", y * 1.15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "#24344b").attr("font-size", "11px").attr("font-weight", "bold").text(d.label);
            axes.append("text").attr("x", x * 1.15).attr("y", y * 1.15 + (d.deg === 0 ? -12 : 12)).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "#24344b").attr("font-size", "11px").attr("font-weight", "bold").text(d.text);
        });
    }

    drawUserSectors(userData, issueData) {
        const userArc = d3.arc()
            .innerRadius(0)
            .outerRadius(d => {
                let r = 0.5;
                const l = d.level ? d.level.toLowerCase() : "";
                if (l.includes("phd")) r = 1.0;
                else if (l.includes("master")) r = 0.8;
                else if (l.includes("bachelor")) r = 0.6;
                return r * this.radius;
            })
            .startAngle(d => (d.angle * Math.PI / 180))
            .endAngle(d => {
                let width = 20;
                if (d.level.includes("Bachelor")) width = 45;
                if (d.level.includes("PhD")) width = 90;
                if (d.level.includes("Master")) width = 60;
                return (d.angle + width) * Math.PI / 180;
            });

        this.svg.selectAll("path.user")
            .data(userData)
            .enter().append("path")
            .attr("class", "user")
            .attr("d", userArc)
            .attr("fill", d => {
                if (!issueData) return `hsl(${d.angle}, 70%, 60%)`; // Default color if no issue context

                let diff = Math.abs(d.angle - issueData.required_education_angle);
                if (diff > 180) diff = 360 - diff;
                const hit = diff <= (issueData.required_width / 2 + 45);
                return hit ? `hsl(${d.angle}, 70%, 60%)` : "#e2e8f0";
            })
            .attr("stroke", "white")
            .style("opacity", 0.9)
            .on("mouseenter", (event, d) => {
                const text = `${d.degree} (${d.level})`;
                TooltipManager.show(text, event.clientX, event.clientY);
                d3.select(event.currentTarget).style("opacity", 1);
            })
            .on("mousemove", (event) => {
                TooltipManager.move(event.clientX, event.clientY);
            })
            .on("mouseleave", (event) => {
                TooltipManager.hide();
                d3.select(event.currentTarget).style("opacity", 0.9);
            });
    }

    drawTargetArc(issueData) {
        const targetArc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius)
            .startAngle((issueData.required_education_angle - issueData.required_width / 2) * Math.PI / 180)
            .endAngle((issueData.required_education_angle + issueData.required_width / 2) * Math.PI / 180);

        this.svg.append("path")
            .attr("d", targetArc)
            .attr("fill", "none")
            .attr("stroke", "#ef4444")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "6 4")
            .append("title").text(`Target: ${issueData.required_education_angle}° ±${issueData.required_width / 2}°`);

        // Center Tick
        // const angleRad = (issueData.required_education_angle - 90) * Math.PI / 180;
        // this.svg.append("line").attr("x1", 0).attr("y1", 0).attr("x2", this.radius * Math.cos(angleRad)).attr("y2", this.radius * Math.sin(angleRad)).attr("stroke", "#ef4444").attr("stroke-width", 2);
    }
}


class ExperienceWaterfall {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.rowHeight = 24;
    }

    draw(user, issue = null) {
        this.container.innerHTML = '';

        const expData = user.expertise_data?.experience || [];
        const chronologicalExp = [...expData].reverse();
        const totalYears = chronologicalExp.reduce((acc, curr) => acc + curr.years, 0);
        const scaleYears = Math.max(totalYears, 50);

        // Wrapper with Border and Overflow Hidden
        const wrapper = document.createElement('div');
        wrapper.className = "relative w-full h-full border border-slate-200 bg-slate-50/50 rounded overflow-hidden";
        this.container.appendChild(wrapper);

        // 1. Grid Lines (Every 10 years)
        for (let y = 10; y < scaleYears; y += 10) {
            const pct = (y / scaleYears) * 100;
            const gridLine = document.createElement('div');
            gridLine.className = "absolute top-0 bottom-0 border-l border-slate-300 border-dashed pointer-events-none opacity-50";
            gridLine.style.left = `${pct}%`;
            wrapper.appendChild(gridLine);

            // Grid Label (Bottom markers)
            const label = document.createElement('div');
            label.className = "absolute bottom-0 text-[8px] text-slate-400 transform -translate-x-1/2 pointer-events-none mb-1";
            label.style.left = `${pct}%`;
            label.innerText = y;
            wrapper.appendChild(label);
        }

        // 2. Render Bars
        let cumulativeYears = 0;
        chronologicalExp.forEach((exp, index) => {
            const widthPct = (exp.years / scaleYears) * 100;
            const leftPct = (cumulativeYears / scaleYears) * 100;

            const bar = document.createElement('div');
            bar.className = "absolute h-5 rounded hover:opacity-90 group transition-all flex items-center shadow-sm z-10 cursor-default";
            bar.style.left = `${leftPct}%`;
            bar.style.width = `calc(${widthPct}% - 1px)`;
            bar.style.top = `${index * (this.rowHeight + 4) + 16}px`; // Top padding

            // Relevance Logic
            let isRelevant = true;
            let hue = exp.hue || 200;

            if (issue) {
                const matchString = (exp.role + " " + (exp.desc || "")).toLowerCase();
                const tags = issue.tags || [];
                const res = issue.required_resources || [];

                // Explicit tags check
                let tagMatch = false;
                if (exp.tags && exp.tags.length > 0) {
                    tagMatch = exp.tags.some(t =>
                        tags.some(it => it.toLowerCase() === t.toLowerCase()) ||
                        (issue.category && issue.category.toLowerCase() === t.toLowerCase())
                    );
                }

                if (!tagMatch) {
                    // Fallback string match
                    tagMatch = tags.some(t => matchString.includes(t.toLowerCase())) ||
                        res.some(r => matchString.includes(r.toLowerCase())) ||
                        (issue.category === "Tech" && (matchString.includes("developer") || matchString.includes("engineer") || matchString.includes("software")));
                }

                isRelevant = tagMatch;
            }

            // Styling
            if (isRelevant) {
                bar.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
            } else {
                bar.style.backgroundColor = "#e2e8f0"; // Slate 200
                bar.classList.add("text-slate-400");
            }

            // Label inside bar
            if (widthPct > 5) {
                bar.innerHTML = `<span class="text-[10px] ${isRelevant ? 'text-white' : 'text-slate-500'} font-semibold truncate px-2 w-full select-none">${exp.role}</span>`;
            }

            // Tooltip (Global Tooltip Manager)
            bar.addEventListener('mouseenter', (e) => {
                const text = `${exp.role} (${exp.years}y)${issue && !isRelevant ? ' (Irrelevant)' : ''}`;
                TooltipManager.show(text, e.clientX, e.clientY);
                // Highlight styles?
                bar.style.zIndex = 50;
            });
            bar.addEventListener('mousemove', (e) => {
                TooltipManager.move(e.clientX, e.clientY);
            });
            bar.addEventListener('mouseleave', () => {
                TooltipManager.hide();
                bar.style.zIndex = "10";
            });

            wrapper.appendChild(bar);
            cumulativeYears += exp.years;
        });

        // 3. Target Line (Only if issue context)
        if (issue && issue.required_experience_years) {
            const reqYears = issue.required_experience_years;
            const targetPct = (reqYears / scaleYears) * 100;

            const targetLine = document.createElement('div');
            targetLine.className = "absolute top-0 bottom-0 border-l-2 border-red-200 border-dashed z-20 pointer-events-none";
            targetLine.style.left = `${targetPct}%`;
            wrapper.appendChild(targetLine);
        }

        // 4. Legend / Stats
        const stats = document.createElement('div');
        stats.className = "absolute top-1 right-2 text-[10px] text-slate-500 bg-white/60 px-2 rounded backdrop-blur-sm";
        stats.innerText = `Total: ${totalYears} Years`;
        wrapper.appendChild(stats);
    }
}

function drawTargetSphere(issue) {
    new EducationSphere('exp-target-sphere').draw(null, issue);
}

function drawCompSphere(user, issue) {
    new EducationSphere('comp-sphere').draw(user.expertise_data?.education, issue);
}

function drawCompWaterfall(user, issue) {
    new ExperienceWaterfall('comp-waterfall').draw(user, issue); return;
}

// --- GLOBAL NAV ---
window.switchTab = function (tabId) {
    // List of all tabs/views
    const tabs = ['profiles', 'sim', 'expertise', 'values', 'contribution', 'isr-complete'];

    // Hide all
    tabs.forEach(id => {
        const view = document.getElementById(`view-${id}`);
        const btn = document.getElementById(`nav-${id}`);
        if (view) view.classList.add('hidden');
        if (btn) btn.className = 'tab-inactive px-4 py-2 rounded-md text-sm font-medium transition-all';
    });

    // Show Active
    const activeView = document.getElementById(`view-${tabId}`);
    const activeBtn = document.getElementById(`nav-${tabId}`);

    if (activeView) activeView.classList.remove('hidden');
    if (activeBtn) {
        // Uniform Active State (Matches HTML Onload)
        activeBtn.className = 'tab-active px-4 py-2 rounded-md text-sm font-medium transition-all';
    }

    // Tab Specific Logic
    if (tabId === 'sim') {
        setTimeout(() => updateSimulationUI(), 50);
    }
    if (tabId === 'expertise') {
        updateExpertiseUI();
    }
};
