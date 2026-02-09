
// --- DATA ---
let issues = [];
let profiles = [];
let valuesData = [];

// --- STATE ---
let currentIssueIndex = 0;
let threshold = 0.5;
let radarChart = null;
let barChart = null;
let mapCanvas = null;
// --- TOOLTIP MANAGER ---
const TooltipManager = {
    el: null,
    init() {
        this.el = document.createElement('div');
        this.el.className = 'fixed z-[9999] px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg pointer-events-none transition-opacity opacity-0';
        document.body.appendChild(this.el);
    },
    show(content, x, y) {
        if (!this.el) this.init();
        this.el.innerHTML = content;
        this.el.style.opacity = '1';
        this.move(x, y);
    },
    move(x, y) {
        if (!this.el) return;
        const maxW = window.innerWidth - this.el.offsetWidth - 20;
        const maxH = window.innerHeight - this.el.offsetHeight - 20;
        const left = Math.min(x + 15, maxW);
        const top = Math.min(y + 15, maxH);
        this.el.style.left = `${left}px`;
        this.el.style.top = `${top}px`;
    },
    hide() {
        if (this.el) this.el.style.opacity = '0';
    }
};

/* --- VALUES CONSTANTS --- */
const PAIR_TO_CATS = [
    [0, 7], [1, 5], [3, 4], [3, 7], [1, 6], [0, 2], [5, 6], [0, 7], [0, 7], [1, 2],
    [0, 7], [1, 3], [0, 2], [0, 2], [5, 7], [2, 6], [3, 8], [0, 7], [1, 9], [0, 2],
    [1, 5], [6, 9], [6, 9], [0, 6], [1, 3], [1, 2], [7, 9], [1, 9], [7, 9], [2, 9],
    [6, 9], [7, 8], [1, 9], [5, 9], [7, 9], [3, 7]
];

const PAIR_NAMES = [
    "Individual Freedom vs. Collective Harmony", "Truth-Telling vs. Kindness", "Proportional Justice vs. Restoration", "Equal Distribution vs. Merit-Based",
    "Kin/Close vs. Universal Responsibility", "Stability vs. Change", "Tradition vs. Innovation", "Self-Interest vs. Collective Welfare",
    "Individual Responsibility vs. Systemic Causation", "Self-Sacrifice vs. Self-Preservation", "Competition vs. Cooperation", "In-Group Loyalty vs. Impartial Justice",
    "Question Authority vs. Accept Authority", "Certainty vs. Possibility", "Principle vs. Pragmatism", "Present vs. Future Security",
    "Universal Standards vs. Cultural Relativism", "Individual Rights vs. Collective Duty", "Efficiency vs. Human Care", "Freedom vs. Structure",
    "Inner Truth vs. Social Belonging", "Environmental Sustainability vs. Economic Prosperity", "Cultural Preservation vs. Modernization", "Protective Authority vs. Respecting Autonomy",
    "Accountability vs. Compassion", "Emotional Openness vs. Self-Protection", "Digital Privacy vs. Convenience", "Human Labor vs. Automation",
    "Tech Innovation vs. Democratic Control", "Digital Privacy vs. Safety", "Digital Inclusion vs. Environmental Cost", "Spiritual Authority vs. Democratic Governance",
    "Digital Privacy vs. Social Connection", "Digital vs. Embodied Experience", "Digital Privacy vs. Collective Transparency", "Justice-Based vs. Cooperative Distribution"
];

const VALUES_CATEGORIES = [
    "Freedom & Autonomy", "Care & Relationality", "Security & Order", "Justice & Fairness",
    "Redemption & Restoration", "Authentic Expression", "Stewardship & Protection",
    "Cooperation & Governance", "Spiritual & Religious", "Digital Rights & Tech"
];

let currentProfile = null;

// --- INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch Data
        const [issuesRes, profilesRes, valuesRes] = await Promise.all([
            fetch('issues.json'),
            fetch('profiles.json'),
            fetch('values-site.json')
        ]);

        if (!issuesRes.ok || !profilesRes.ok || !valuesRes.ok) throw new Error("Failed to load data");

        issues = await issuesRes.json();
        profiles = await profilesRes.json();
        valuesData = await valuesRes.json();

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
        <div class="text-xs font-mono text-slate-300 group-hover:text-blue-400">${p.uid}</div>
    `;
        div.onclick = () => renderProfileInspector(p);
        listEl.appendChild(div);
    });
}

function renderProfileInspector(user) {
    currentProfile = user;
    document.getElementById('inspector-name').textContent = user.name;
    document.getElementById('inspector-id').textContent = user.uid;

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

    radarChart.data.datasets[1].data = gData;
    radarChart.data.datasets[2].data = sData;
    radarChart.data.datasets[3].data = xData;
    radarChart.update();

    // Values Logic
    const vData = valuesData.find(v => v.uid === user.uid);
    const container = document.getElementById('inspector-values');
    container.innerHTML = '';

    if (vData && vData.domains) {
        // Mini Histogram Trigger
        const w = 200, h = 40;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.className = "cursor-pointer hover:opacity-80 transition-opacity";
        canvas.onclick = () => openValuesModal(user);
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const barWidth = w / 10;
        vData.domains.forEach((d, i) => {
            if (d !== null) {
                const barH = (d / 100) * h;
                ctx.fillStyle = "#10b981";
                ctx.fillRect(i * barWidth, h - barH, barWidth - 2, barH);
            } else {
                ctx.fillStyle = "#e2e8f0";
                ctx.fillRect(i * barWidth, 0, barWidth - 2, h);
            }
        });
    } else {
        container.innerHTML = '<span class="text-slate-400 text-xs italic">No data</span>';
    }

    // Remove old button if properly replaced
    // Check if next sibling is button and remove it? The HTML structure had a button.
    // I need to update the HTML to remove the hardcoded button or hide it here.
    // The previous HTML had the button AFTER inspector-values div.
    // I will hide the button by selecting it via ID or next sibling if I can't change HTML yet.
    // Actually, I can just not render the button in HTML or hide it via CSS. 
    // But since I am in JS, I can try to find the button. 
    // The best way is to update HTML to remove the button, but I'll do it in a separate step.
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
    document.getElementById('comp-username').innerText = `${user.name} Expertise: ${score.total} (${score.edu.toFixed(1)}+${score.exp.toFixed(1)}+${score.res.toFixed(1)})`;

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

        // Gradient
        const gradient = defs.append("radialGradient")
            .attr("id", "sphereGradient")
            .attr("cx", "30%")
            .attr("cy", "30%")
            .attr("r", "70%");
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#fff");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#e2e8f0");
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

    // Check if the active tab is inside the dropdown, if so highlight "More"
    // checkActiveTabVisibility(); // Removed for hamburger menu
};

// --- RESPONSIVE TABS LOGIC ---
function initResponsiveTabs() {
    const navContainer = document.querySelector('header .flex.space-x-1');
    const moreBtnContainer = document.getElementById('nav-more').parentElement;
    const moreBtn = document.getElementById('nav-more');
    const moreMenu = document.getElementById('nav-more-menu');

    // Toggle dropdown
    moreBtn.onclick = (e) => {
        e.stopPropagation();
        moreMenu.classList.toggle('hidden');
    };

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!moreBtnContainer.contains(e.target)) {
            moreMenu.classList.add('hidden');
        }
    });

    const updateTabs = () => {
        // Reset: Move all items back to main container before measuring
        // We need to keep the original order. The original IDs are:
        // nav-profiles, nav-sim, nav-expertise, nav-values, nav-contribution, nav-isr-complete
        const originalOrder = ['nav-profiles', 'nav-sim', 'nav-expertise', 'nav-values', 'nav-contribution', 'nav-isr-complete'];

        originalOrder.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                // Remove from dropdown specific classes
                el.classList.remove('dropdown-item');
                // Restore original classes
                if (el.classList.contains('tab-active')) {
                    el.className = 'tab-active px-4 py-2 rounded-md text-sm font-medium transition-all';
                } else {
                    el.className = 'tab-inactive px-4 py-2 rounded-md text-sm font-medium transition-all';
                }

                // Insert back into navContainer before the "More" button container
                navContainer.insertBefore(el, moreBtnContainer);
            }
        });

        moreBtn.classList.add('hidden'); // Hide "More" initially

        const containerWidth = navContainer.clientWidth;
        // Calculate total width of children
        // We need to identify the tab buttons. They are the children excluding the 'relative group' (more button)
        let totalWidth = 0;
        const children = Array.from(navContainer.children).filter(c => c !== moreBtnContainer);

        children.forEach(c => totalWidth += c.offsetWidth + 4); // +4 for gap (space-x-1 is 0.25rem = 4px approx)

        // If we overflow
        if (totalWidth > containerWidth) {
            moreBtn.classList.remove('hidden');
            let availableWidth = containerWidth - moreBtn.offsetWidth - 20; // Buffer

            let currentWidth = 0;
            let overflow = false;

            children.forEach(c => {
                if (!overflow) {
                    currentWidth += c.offsetWidth + 4;
                    if (currentWidth > availableWidth) {
                        overflow = true;
                    }
                }

                if (overflow) {
                    // Move to dropdown
                    c.className = 'dropdown-item'; // Apply dropdown styling
                    if (c.classList.contains('tab-active')) {
                        c.classList.add('tab-active'); // Keep active status for styling
                    }
                    moreMenu.appendChild(c);
                }
            });
        }

        checkActiveTabVisibility();
    };

    // Initial check
    updateTabs();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
        // Debounce slightly or just run
        requestAnimationFrame(updateTabs);
    });
    resizeObserver.observe(document.querySelector('header'));
}

function checkActiveTabVisibility() {
    const moreBtn = document.getElementById('nav-more');
    const moreMenu = document.getElementById('nav-more-menu');
    const activeTabObj = moreMenu.querySelector('.tab-active');

    if (activeTabObj) {
        moreBtn.classList.add('tab-active');
        moreBtn.classList.remove('tab-inactive');
    } else {
        moreBtn.classList.remove('tab-active');
        moreBtn.classList.add('tab-inactive');
    }
}

// Call init once DOM is ready (or immediately if already ready, but this script is loaded at end of body)
initResponsiveTabs();

/* --- VALUES & CONFLICT RESOLUTION --- */
// Constants moved to top of file


function openValuesModal(user) {
    try {
        const vData = valuesData.find(v => v.uid === user.uid);
        if (!vData) {
            alert("No values data found for this user.");
            return;
        }

        document.getElementById('val-modal-username').innerText = user.name;

        // Prototype
        const protoHtml = vData.prototype
            ? `<div class="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                 <span class="text-xs font-bold text-indigo-500 uppercase tracking-wide block mb-1">Prototype</span>
                 <span class="text-slate-800 font-medium">${vData.prototype}</span>
               </div>`
            : '';

        document.getElementById('val-description').innerHTML = protoHtml + (vData.values_description
            ? `<p class="mb-4">${vData.values_description.replace(/\n\n/g, '</p><p class="mb-4">')}</p>`
            : '<p class="text-slate-400 italic">No description available.</p>');

        document.getElementById('values-modal').classList.remove('hidden');

        // Wait for render/transition
        setTimeout(() => {
            try {
                drawValuesDomains(vData, 'viz-domains');
                drawContextualShifts(vData, 'viz-context');
                drawConflictResolution(vData, 'viz-conflict');
            } catch (e) {
                console.error("Drawing Error:", e);
                alert("Error drawing charts: " + e.message);
            }
        }, 100);
    } catch (e) {
        console.error("Modal Error:", e);
        alert("Error opening modal: " + e.message);
    }
}

function closeValuesModal() {
    document.getElementById('values-modal').classList.add('hidden');
    TooltipManager.hide();
}

function drawValuesDomains(vData, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    // Setup Canvas
    const svg = d3.select(container).append("svg")
        .attr("width", w)
        .attr("height", h);

    const margin = { top: 20, right: 10, bottom: 30, left: 30 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale
    const x = d3.scaleBand()
        .range([0, width])
        .domain(d3.range(10))
        .padding(0.1);

    // Y Scale
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    // Data preparation
    const data = vData.domains || [];

    // Bars (Columns)
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(i))
        .attr("width", x.bandwidth())
        .attr("y", d => d === null ? 0 : y(d))
        .attr("height", d => d === null ? height : height - y(d))
        .attr("fill", d => d === null ? "#e2e8f0" : "#10b981") // Grey if null, Green if value
        .attr("data-index", (d, i) => i)
        .on("mouseenter", (event, d) => {
            const index = parseInt(d3.select(event.currentTarget).attr("data-index"));
            const name = VALUES_CATEGORIES[index] || "Unknown";
            const val = d === null ? "N/A" : d;
            TooltipManager.show(`${index + 1}. ${name}: ${val}`, event.clientX, event.clientY);
            d3.select(event.currentTarget).style("opacity", 0.8);
        })
        .on("mousemove", (event) => TooltipManager.move(event.clientX, event.clientY))
        .on("mouseleave", (event) => {
            TooltipManager.hide();
            d3.select(event.currentTarget).style("opacity", 1);
        });

    // Numbers below columns
    g.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
        .attr("y", height + 15)
        .attr("text-anchor", "middle")
        .text((d, i) => i + 1)
        .attr("font-size", "10px")
        .attr("fill", "#64748b");
}

function drawContextualShifts(vData, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const contexts = ['work', 'family', 'private', 'crisis'];
    const colors = { work: 'slate', family: 'slate', private: 'slate', crisis: 'slate' }; // Using slate for container, bars are red/blue

    // We need to match the layout of Domains exactly.
    // We will create 4 svgs or one big svg? 
    // To ensure alignment, better to use the same width/margin logic.
    // We can stacking div blocks.

    const w = container.offsetWidth;
    const h = 40; // Reduced height per row (was 80, requesting "smaller in height")
    // User asked for "Contextual Shifts diagrams locate closer each to other remaining the bars height as it is"
    // Wait, "bars height as it is" implies internal bar height? 
    // "diagrams locate closer each to other" -> reduce margin/padding of containers.
    // "bars make twice bigger" -> applied in previous step.
    // Let's keep internal height but reduce container padding.
    // Actually, user said "make twice bigger" in previous step, then "smaller in width and in height" in this step.
    // Contradictory? "make twice bigger (the values could be from -50 to +50)" - this refers to SCALE.
    // "diagram smaller in width and in height" refers to CONTAINER.
    // So: Bars fill the height, but height is smaller?
    // Let's try height=60px per row, tight margins.

    const margin = { top: 2, right: 10, bottom: 2, left: 30 }; // Tighter margins
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    contexts.forEach(ctx => {
        const row = document.createElement('div');
        row.style.width = '100%';
        row.style.height = `${h}px`;
        // Remove margin-bottom if any
        container.appendChild(row);

        const svg = d3.select(row).append("svg")
            .attr("width", w)
            .attr("height", h);

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // Label
        g.append("text")
            .attr("x", -5)
            .attr("y", height / 2)
            .attr("text-anchor", "end")
            .attr("alignment-baseline", "middle")
            .text(ctx.charAt(0).toUpperCase())
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .attr("fill", "#64748b");

        const x = d3.scaleBand()
            .range([0, width])
            .domain(d3.range(10))
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([-50, 50]); // Shift values usually -50 to 50? Or -100 to 100?
        // Data seems to be small numbers e.g. -20, 10. Let's assume -50 to 50 is safe range.

        const data = vData.contextual_shifts ? vData.contextual_shifts[ctx] : [];
        if (!data || data.length === 0) return;

        // Zero line
        g.append("line")
            .attr("x1", 0)
            .attr("y1", y(0))
            .attr("x2", width)
            .attr("y2", y(0))
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1);

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("x", (d, i) => x(i))
            .attr("width", x.bandwidth())
            .attr("y", d => d > 0 ? y(d) : y(0))
            .attr("height", d => Math.abs(y(d) - y(0)))
            .attr("fill", d => d > 0 ? "#ef4444" : "#3b82f6") // Red > 0, Blue < 0
            .on("mouseenter", (event, d) => {
                const index = parseInt(d3.select(event.currentTarget).attr("data-index"));
                const name = VALUES_CATEGORIES[index] || "Unknown";
                // User requested: "1. Freedom & Autonomy in crisis -10"
                TooltipManager.show(`${index + 1}. ${name} in ${ctx} ${d}`, event.clientX, event.clientY);
                d3.select(event.currentTarget).style("opacity", 0.8);
            })
            .attr("data-index", (d, i) => i) // Bind index
            .on("mousemove", (event) => TooltipManager.move(event.clientX, event.clientY))
            .on("mouseleave", (event) => {
                TooltipManager.hide();
                d3.select(event.currentTarget).style("opacity", 1);
            });
    });
}

function drawConflictResolution(vData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Visibility Fix: Use ResizeObserver to ensure drawing happens when container has dimensions
    const checkAndDraw = () => {
        const rect = container.getBoundingClientRect();
        let w = rect.width;
        let h = rect.height;

        // FORCE FALLBACK if 0 (This is the critical fix for "not visible at all")
        if (w === 0) w = 500;
        if (h === 0) h = 500;

        console.log("CR Check (Force):", w, h);
        container.innerHTML = '';
        drawConflictResolutionContent(vData, container, w, h);
        return true;
    };

    checkAndDraw(); // Just draw it immediately with fallback.

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                console.log("CR Resize Update:", entry.contentRect.width, entry.contentRect.height);
                container.innerHTML = '';
                drawConflictResolutionContent(vData, container, entry.contentRect.width, entry.contentRect.height);
            }
        }
    });
    resizeObserver.observe(container);
}

function drawConflictResolutionContent(vData, container, w, h) {
    // Radius needs to be safe
    const radius = Math.min(w, h) / 2 - 60;

    const svg = d3.select(container).append("svg")
        .attr("width", w)
        .attr("height", h)
        // Ensure overflow is visible if needed, but usually hidden
        .style("overflow", "visible")
        .append("g")
        .attr("transform", `translate(${w / 2},${h / 2})`);

    // Draw Categories (Circle)
    const angleStep = (Math.PI * 2) / 10;
    const catCoords = [];

    for (let i = 0; i < 10; i++) {
        // -90 deg offset to start at top
        const angle = i * angleStep - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        catCoords.push({ x, y, angle, id: i });
    }

    // Draw Ties (Curved Lines)
    // We iterate PAIR_TO_CATS
    vData.conflict_resolution.forEach((val, i) => {
        if (i >= PAIR_TO_CATS.length) return;
        const [c1, c2] = PAIR_TO_CATS[i];

        const p1 = catCoords[c1];
        const p2 = catCoords[c2];

        // Beizer curve control point (0,0 center) makes lines curve towards center
        const path = d3.path();
        path.moveTo(p1.x, p1.y);
        path.quadraticCurveTo(0, 0, p2.x, p2.y);

        // Thickness based on value: thinner near 50, thicker near 0/100
        // val is 0-100. deviation from 50 is 0-50.
        const dev = Math.abs(val - 50);
        const thickness = 0.5 + (dev / 50) * 3; // 1px to 4px

        const line = svg.append("path")
            .attr("d", path.toString())
            .attr("fill", "none")
            .attr("stroke", "#94a3b8")
            .attr("stroke-width", thickness)
            .attr("opacity", 0.4)
            .attr("class", `tie tie-cat-${c1} tie-cat-${c2}`)
            .on("mouseenter", (event) => {
                d3.select(event.currentTarget).attr("stroke", "#6366f1").attr("opacity", 1);
                TooltipManager.show(`CR.${i + 1}: ${PAIR_NAMES[i]} (${val})`, event.clientX, event.clientY);
            })
            .on("mousemove", (event) => TooltipManager.move(event.clientX, event.clientY))
            .on("mouseleave", (event) => {
                d3.select(event.currentTarget).attr("stroke", "#94a3b8").attr("opacity", 0.4);
                TooltipManager.hide();
            });

        // Slider (Rectangle)
        // Position along the curve? Or logical position?
        // User said: "<50 - to the first pair part, >50 - to the second one."
        // "Moved along the tie length".

        // Approximate position on quadratic curve
        // t = val / 100 ? 
        // If val=0 -> p1. If val=100 -> p2.
        const t = val / 100;
        // Quadratic Bezier point: (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
        // P0=p1, P1=(0,0), P2=p2
        const bx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * 0 + t * t * p2.x;
        const by = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * 0 + t * t * p2.y;

        svg.append("rect")
            .attr("x", bx - 3)
            .attr("y", by - 3)
            .attr("width", 6)
            .attr("height", 6)
            .attr("fill", "#475569")
            .attr("rx", 1)
            .attr("class", "pointer-events-none");
    });

    // Draw Category Dots
    catCoords.forEach((p, i) => {
        const g = svg.append("g")
            .style("cursor", "pointer")
            .on("mouseenter", (event) => {
                // Highlight all connected ties
                svg.selectAll(`.tie-cat-${i}`).attr("stroke", "#6366f1").attr("opacity", 1);
                TooltipManager.show(`${i + 1}. ${VALUES_CATEGORIES[i]}`, event.clientX, event.clientY);
            })
            .on("mousemove", (event) => TooltipManager.move(event.clientX, event.clientY))
            .on("mouseleave", () => {
                svg.selectAll(`.tie-cat-${i}`).attr("stroke", "#94a3b8").attr("opacity", 0.4);
                TooltipManager.hide();
            });

        g.append("circle")
            .attr("cx", p.x)
            .attr("cy", p.y)
            .attr("r", 12)
            .attr("fill", "#fff")
            .attr("stroke", "#cbd5e1")
            .attr("stroke-width", 2);

        g.append("text")
            .attr("x", p.x)
            .attr("y", p.y)
            .attr("dy", "0.3em")
            .attr("text-anchor", "middle")
            .text(i + 1)
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .attr("fill", "#475569");
    });

    // Populate Conflict List below
    const list = document.getElementById('conflict-list');
    list.innerHTML = '';
    vData.conflict_resolution.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = "text-[10px] text-slate-600 truncate hover:text-indigo-600 cursor-help";
        div.title = PAIR_NAMES[i];
        div.innerText = `${i + 1}: ${PAIR_NAMES[i].substring(0, 25)}... (${val})`;
        list.appendChild(div);
    });
}
