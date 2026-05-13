const sectionTitles = {
  chat: 'Chat',
  voting: 'Voting',
  tasks: 'Tasks',
  values: 'Values',
  profile: 'Profile',
  settings: 'Settings'
};

let currentSectionId = null;

function toggleContent(id) {
  const content = document.getElementById(id);
  if (!content) return;
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

function safeGetStorage(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetStorage(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {}
}

function openSectionModal(sectionId) {
  const overlay = document.getElementById('section-modal-overlay');
  const titleEl = document.getElementById('section-modal-title');
  const bodyEl = document.getElementById('section-modal-body');
  const source = document.getElementById('section-' + sectionId);
  const menu = document.getElementById('menu');

  if (!overlay || !titleEl || !bodyEl || !source) return;

  if (menu) menu.classList.remove('menu-open');

  titleEl.textContent = sectionTitles[sectionId] || sectionId;
  bodyEl.innerHTML = '';

  while (source.firstChild) {
    bodyEl.appendChild(source.firstChild);
  }

  currentSectionId = sectionId;
  overlay.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeSectionModal() {
  const overlay = document.getElementById('section-modal-overlay');
  const bodyEl = document.getElementById('section-modal-body');
  const titleEl = document.getElementById('section-modal-title');

  if (!overlay || !bodyEl) return;

  // NEW BEHAVIOR: If a topic detail is open, restore the list view and STOP.
  if (bodyEl.hasAttribute('data-topic-detail-open') && typeof bodyEl.__restoreView === 'function') {
    bodyEl.__restoreView();
    
    // Restore the modal title (e.g., from the topic back to "Voting" or "Chat")
    if (titleEl && bodyEl.hasAttribute('data-topic-source-title')) {
      titleEl.textContent = bodyEl.getAttribute('data-topic-source-title');
    }
    
    // Exit the function early so the modal itself does not close
    return; 
  }

  // ORIGINAL BEHAVIOR: If we are already looking at the list, close the modal entirely.
  if (currentSectionId) {
    const source = document.getElementById('section-' + currentSectionId);
    if (source) {
      while (bodyEl.firstChild) {
        source.appendChild(bodyEl.firstChild);
      }
    }
  }

  currentSectionId = null;
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function initLoginPage() {
  const usernameInput = document.getElementById('login-username');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const profileInput = document.getElementById('testProfiles');
  const profileOptions = document.querySelectorAll('#testProfiless option');

  if (usernameInput && loginBtn && registerBtn) {
    const syncButtons = () => {
      const hasValue = usernameInput.value.trim().length > 0;
      loginBtn.disabled = !hasValue;
      registerBtn.disabled = !hasValue;
    };

    syncButtons();
    usernameInput.addEventListener('input', syncButtons);

    loginBtn.addEventListener('click', function () {
      const value = usernameInput.value.trim();
      if (!value) return;
      safeSetStorage('userName', value);
      window.location.href = 'main.html';
    });

    registerBtn.addEventListener('click', function () {
      const value = usernameInput.value.trim();
      if (!value) return;
      safeSetStorage('userName', value);
      window.location.href = 'main.html';
    });
  }

  if (profileInput) {
    const validProfiles = Array.from(profileOptions).map(option => option.value);

    profileInput.addEventListener('change', function () {
      const value = this.value.trim();
      if (!value) return;

      if (validProfiles.length === 0 || validProfiles.includes(value)) {
        safeSetStorage('userName', value);
        window.location.href = 'main.html';
      }
    });

    profileInput.addEventListener('input', function () {
      const value = this.value.trim();
      if (validProfiles.includes(value)) {
        safeSetStorage('userName', value);
        window.location.href = 'main.html';
      }
    });
  }
}

function initValuesVectorModal() {
  var openBtn = document.getElementById('values-vector-btn');
  var modal = document.getElementById('values-vector-modal');
  var closeBtn = document.getElementById('values-vector-close');
  var backdrop = document.getElementById('values-vector-backdrop');

  var domainsChart = document.getElementById('vector-domains-chart');
  var contextGrid = document.getElementById('context-shifts-grid');
  var domainsAccordion = document.getElementById('vector-domains-accordion');
  var conflictWeights = document.getElementById('vector-conflict-weights');
  var contextDetails = document.getElementById('vector-context-details');

  if (!openBtn || !modal || !closeBtn || !backdrop) return;

  var vectorData = {
    domains: [
      { id: 1, name: 'Agency & Freedom', score: 72 },
      { id: 2, name: 'Relationality & Care', score: 60 },
      { id: 3, name: 'Security & Stable Order', score: 68 },
      { id: 4, name: 'Justice & Fairness', score: 40 },
      { id: 5, name: 'Redemption & Restoration', score: 90, muted: true },
      { id: 6, name: 'Authentic Expression', score: 65 },
      { id: 7, name: 'Protective Care & Stewardship', score: 75 },
      { id: 8, name: 'Cooperation & Shared Governance', score: 58 },
      { id: 9, name: 'Spiritual & Religious Practice', score: 80 },
      { id: 10, name: 'Digital Rights & Tech Democracy', score: 90, muted: true }
    ],
    contextShifts: {
      work:    [10, 0, 0, 0, 0, 8, 7, 0, 0, 0],
      family:  [0, 12, 7, 0, 0, 6, 8, 0, 9, 0],
      private: [0, 0, 0, 0, 0, 6, 0, 0, 10, 0],
      crisis:  [-10, 0, 8, 0, 0, 0, 6, 7, 9, 0]
    },
    conflictResolution: [
      { name: 'Freedom vs Security', weight: 78 },
      { name: 'Fairness vs Loyalty', weight: 64 },
      { name: 'Mercy vs Accountability', weight: 82 },
      { name: 'Autonomy vs Collective Good', weight: 59 },
      { name: 'Tradition vs Innovation', weight: 68 },
      { name: 'Privacy vs Transparency', weight: 74 }
    ]
  };

  var taxonomyDomains = [
    {
      id: 1,
      name: 'Agency & Freedom',
      definition: 'Degree to which community enables and protects individual capacity to make autonomous choices, resist coercion, and shape own life.',
      actionFocus: 'Does community create conditions where people can choose freely?',
      value: 72,
      facets: [
        {
          id: '1.1',
          name: 'Moral Freedom & Choice',
          clusters: [
            {
              id: '1.1.1',
              name: 'Freedom to Choose',
              items: [
                { id: '1.1.1.a', text: 'Community respects choices even when disagreeable', value: 78 },
                { id: '1.1.1.b', text: 'People have exit rights (can leave without penalty)', value: 75 }
              ]
            },
            {
              id: '1.1.2',
              name: 'Autonomy Conditions',
              items: [
                { id: '1.1.2.a', text: 'Community provides information for informed choice', value: 70 },
                { id: '1.1.2.b', text: 'People own their time and labor (not coerced)', value: 73 },
                { id: '1.1.2.c', text: "Norms don't force conformity; diversity of paths allowed", value: 68 }
              ]
            }
          ]
        },
        {
          id: '1.2',
          name: 'Anti-Coercion & Power-Limitation',
          clusters: [
            {
              id: '1.2.1',
              name: 'Preventing Abuse',
              items: [
                { id: '1.2.1.a', text: 'Community opposes unjust hierarchy', value: 77 },
                { id: '1.2.1.b', text: 'Community prevents manipulation and deception by authorities', value: 79 },
                { id: '1.2.1.c', text: 'Community protects exit rights (can refuse unjust situations)', value: 74 }
              ]
            },
            {
              id: '1.2.2',
              name: 'Distributed Power',
              items: [
                { id: '1.2.2.a', text: 'Power is distributed, not concentrated', value: 69 },
                { id: '1.2.2.b', text: 'Community resists institutional overreach', value: 71 }
              ]
            }
          ]
        },
        {
          id: '1.3',
          name: 'Self-Determination Spaces',
          clusters: [
            {
              id: '1.3.1',
              name: 'Goal Pursuit Support',
              items: [
                { id: '1.3.1.a', text: 'Community enables people to choose own path', value: 76 },
                { id: '1.3.1.b', text: 'Resources and time accessible for own goals', value: 64 }
              ]
            },
            {
              id: '1.3.2',
              name: 'Responsibility-Taking',
              items: [
                { id: '1.3.2.a', text: 'Community supports people taking responsibility for own welfare', value: 72 }
              ]
            }
          ]
        },
        {
          id: '1.4',
          name: 'Bodily & Medical Autonomy',
          clusters: [
            {
              id: '1.4.1',
              name: 'Medical Self-Determination',
              items: [
                { id: '1.4.1.a', text: 'Community respects medical decisions even if disagree', value: 70 },
                { id: '1.4.1.b', text: 'Reproductive autonomy protected', value: 66 },
                { id: '1.4.1.c', text: "Community doesn't force treatment", value: 72 }
              ]
            },
            {
              id: '1.4.2',
              name: 'Inclusive Physical Autonomy',
              items: [
                { id: '1.4.2.a', text: 'Community accommodates disabled people (not forces assimilation)', value: 61 },
                { id: '1.4.2.b', text: 'Accessibility is standard, not exception', value: 60 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Relationality & Care',
      definition: 'Degree to which community actively cares for relationships, honors bonds, and creates conditions for connection.',
      actionFocus: 'Does community prioritize relationships and care?',
      value: 60,
      facets: [
        {
          id: '2.1',
          name: 'Active Care for Particular People',
          clusters: [
            {
              id: '2.1.1',
              name: 'Knowing People Deeply',
              items: [
                { id: '2.1.1.a', text: 'Community learns and knows individuals', value: 66 },
                { id: '2.1.1.b', text: 'Community accepts people as they are, not as "should be"', value: 62 },
                { id: '2.1.1.c', text: 'Relationships are prioritized (not transactional)', value: 68 }
              ]
            },
            {
              id: '2.1.2',
              name: 'Unconditional Presence',
              items: [
                { id: '2.1.2.a', text: 'Community includes strangers and those unlike us', value: 52 },
                { id: '2.1.2.b', text: 'Care is not conditional on likability or usefulness', value: 57 },
                { id: '2.1.2.c', text: 'Community seeks humanity in the "other"', value: 59 }
              ]
            }
          ]
        },
        {
          id: '2.2',
          name: 'Family Bonds & Community Bonds',
          clusters: [
            {
              id: '2.2.1',
              name: 'Relational Loyalty',
              items: [
                { id: '2.2.1.a', text: 'Community prioritizes members (family-like responsibility)', value: 71 },
                { id: '2.2.1.b', text: 'Community maintains continuity and remembers history', value: 63 }
              ]
            },
            {
              id: '2.2.2',
              name: 'Diverse Forms of Belonging',
              items: [
                { id: '2.2.2.a', text: 'Community recognizes all family forms (LGBTQ+, chosen, etc.)', value: null },
                { id: '2.2.2.b', text: 'Mutual aid is shared responsibility within community', value: 74 },
                { id: '2.2.2.c', text: 'Belonging is not conditional on conformity', value: 58 }
              ]
            }
          ]
        },
        {
          id: '2.3',
          name: 'Responsibility to Others',
          clusters: [
            {
              id: '2.3.1',
              name: 'Expanding Circle of Responsibility',
              items: [
                { id: '2.3.1.a', text: "Community takes responsibility for actions' ripple effects", value: 64 },
                { id: '2.3.1.b', text: 'Community feels obligation to distant/unknown people', value: 49 },
                { id: '2.3.1.c', text: 'Global impact is considered in decisions', value: 51 }
              ]
            },
            {
              id: '2.3.2',
              name: 'Intergenerational Duty',
              items: [
                { id: '2.3.2.a', text: 'Community prioritizes future generations', value: 61 },
                { id: '2.3.2.b', text: 'Community protects children first', value: 76 },
                { id: '2.3.2.c', text: 'Stewardship of world for those not yet born', value: 62 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Security & Stable Order',
      definition: 'Degree to which community provides safety, basic needs, and predictable structure.',
      actionFocus: 'Does community ensure basic safety and order?',
      value: 68,
      facets: [
        {
          id: '3.1',
          name: 'Physical Safety & Needs',
          clusters: [
            {
              id: '3.1.1',
              name: 'Protecting from Harm',
              items: [
                { id: '3.1.1.a', text: 'Community prevents violence and bodily harm', value: 81 },
                { id: '3.1.1.b', text: 'Community ensures shelter, food, health access', value: 72 }
              ]
            },
            {
              id: '3.1.2',
              name: 'Stability for Living',
              items: [
                { id: '3.1.2.a', text: 'Community maintains predictable conditions for planning', value: 67 },
                { id: '3.1.2.b', text: 'Chaos and emergency are prevented when possible', value: 71 }
              ]
            }
          ]
        },
        {
          id: '3.2',
          name: 'Clear Order & Structure',
          clusters: [
            {
              id: '3.2.1',
              name: 'Transparent Norms',
              items: [
                { id: '3.2.1.a', text: 'Community rules are clear and knowable', value: 73 },
                { id: '3.2.1.b', text: 'Roles and responsibilities are defined', value: 70 }
              ]
            },
            {
              id: '3.2.2',
              name: 'Evolution of Norms',
              items: [
                { id: '3.2.2.a', text: 'Rules change when needed; not rigid', value: 55 },
                { id: '3.2.2.b', text: 'Balance between stability and adaptation', value: 56 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Justice & Fairness',
      definition: 'Degree to which community treats people fairly, allocates resources equitably, and addresses injustice.',
      actionFocus: 'Does community make fair decisions and distributions?',
      value: 40,
      facets: [
        {
          id: '4.1',
          name: 'Equal Worth & Dignity',
          clusters: [
            {
              id: '4.1.1',
              name: 'Baseline Equality',
              items: [
                { id: '4.1.1.a', text: 'Community grants equal rights to all members', value: 42 },
                { id: '4.1.1.b', text: 'No person is treated as "worth less"', value: 48 },
                { id: '4.1.1.c', text: 'Community rejects hierarchy based on identity', value: 36 }
              ]
            },
            {
              id: '4.1.2',
              name: 'Equality of Opportunity',
              items: [
                { id: '4.1.2.a', text: 'Community removes barriers to equal starting position', value: 41 },
                { id: '4.1.2.b', text: 'Community redistributes to level playing field', value: null },
                { id: '4.1.2.c', text: 'Access is not determined by birth circumstances', value: 39 }
              ]
            }
          ]
        },
        {
          id: '4.2',
          name: 'Fair Proportionality',
          clusters: [
            {
              id: '4.2.1',
              name: 'Rewarding Contribution',
              items: [
                { id: '4.2.1.a', text: 'Community rewards effort and good behavior', value: 58 },
                { id: '4.2.1.b', text: 'Consequences are proportional to actions', value: 61 },
                { id: '4.2.1.c', text: 'Contribution affects allocation when relevant', value: 64 }
              ]
            },
            {
              id: '4.2.2',
              name: 'Reciprocal Exchange',
              items: [
                { id: '4.2.2.a', text: 'Community maintains fair give-and-take', value: 57 },
                { id: '4.2.2.b', text: 'No free-riding or exploitation allowed', value: 59 },
                { id: '4.2.2.c', text: 'Mutual obligation is expected and enforced', value: 62 }
              ]
            }
          ]
        },
        {
          id: '4.3',
          name: 'Meeting Actual Needs',
          clusters: [
            {
              id: '4.3.1',
              name: 'Sufficiency for All',
              items: [
                { id: '4.3.1.a', text: 'Community ensures baseline (food, shelter, dignity)', value: 46 },
                { id: '4.3.1.b', text: 'Community provides extra support for vulnerable', value: 44 },
                { id: '4.3.1.c', text: 'Community adjusts to actual differences (equity)', value: null }
              ]
            },
            {
              id: '4.3.2',
              name: 'Correcting Past Wrongs',
              items: [
                { id: '4.3.2.a', text: 'Community addresses historical injustices', value: null },
                { id: '4.3.2.b', text: 'Community repairs harm done', value: 43 },
                { id: '4.3.2.c', text: 'Community restores those wronged to fullness', value: 45 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Redemption & Restoration',
      definition: 'Degree to which community believes in transformation, second chances, and redemption of wrongdoers.',
      actionFocus: 'Does community allow people to change and be restored?',
      value: null,
      facets: [
        {
          id: '5.1',
          name: 'Forgiveness & Letting Go',
          clusters: [
            {
              id: '5.1.1',
              name: 'Releasing Resentment',
              items: [
                { id: '5.1.1.a', text: 'Community lets go of grudges', value: null },
                { id: '5.1.1.b', text: "Past actions don't permanently define person", value: null },
                { id: '5.1.1.c', text: 'Possibility of change is honored (not just punishment)', value: null }
              ]
            }
          ]
        },
        {
          id: '5.2',
          name: 'Restoration & Reintegration',
          clusters: [
            {
              id: '5.2.1',
              name: 'Return to Community',
              items: [
                { id: '5.2.1.a', text: 'Community reintegrates wrongdoers (exile is last resort)', value: null },
                { id: '5.2.1.b', text: 'Community demonstrates people can change', value: null },
                { id: '5.2.1.c', text: 'Healing relationships is prioritized over resentment', value: null }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 6,
      name: 'Authentic Expression & Value-Living',
      definition: 'Degree to which community allows genuine self-expression and living according to stated values.',
      actionFocus: 'Does community allow authentic expression and value coherence?',
      value: 65,
      facets: [
        {
          id: '6.1',
          name: 'Living with Integrity',
          clusters: [
            {
              id: '6.1.1',
              name: 'Value-Behavior Coherence',
              items: [
                { id: '6.1.1.a', text: 'Community makes living by values possible (not hypocritical)', value: 67 },
                { id: '6.1.1.b', text: 'Walking the talk is possible (values match actions)', value: 69 },
                { id: '6.1.1.c', text: 'Transparency: people can be known as they are', value: 62 }
              ]
            }
          ]
        },
        {
          id: '6.2',
          name: 'Authentic Self-Expression',
          clusters: [
            {
              id: '6.2.1',
              name: 'Expression Allowed',
              items: [
                { id: '6.2.1.a', text: 'Community allows people to express true beliefs', value: 71 },
                { id: '6.2.1.b', text: 'Genuine perspectives are valued (not silenced)', value: 63 },
                { id: '6.2.1.c', text: 'People are not forced to hide or mask', value: 58 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 7,
      name: 'Protective Care & Stewardship',
      definition: 'Degree to which community protects vulnerable, stewards nature, preserves heritage, and acts for future generations.',
      actionFocus: 'Does community protect those who need protection and care for the world?',
      value: 75,
      facets: [
        {
          id: '7.1',
          name: 'Protection of Vulnerable',
          clusters: [
            {
              id: '7.1.1',
              name: 'Child Protection',
              items: [
                { id: '7.1.1.a', text: 'Community makes children safety central (all policy measured by this)', value: 84 },
                { id: '7.1.1.b', text: 'Child welfare is yardstick for good community', value: 82 },
                { id: '7.1.1.c', text: 'Community willingly sacrifices for child welfare', value: 79 }
              ]
            },
            {
              id: '7.1.2',
              name: 'Advocacy for Powerless',
              items: [
                { id: '7.1.2.a', text: 'Community speaks for those without voice', value: 72 },
                { id: '7.1.2.b', text: 'Community has special responsibility to vulnerable', value: 76 },
                { id: '7.1.2.c', text: 'Community uses power to protect, not exploit', value: 73 }
              ]
            }
          ]
        },
        {
          id: '7.2',
          name: 'Environmental Stewardship',
          clusters: [
            {
              id: '7.2.1',
              name: 'Ecological Commitment',
              items: [
                { id: '7.2.1.a', text: 'Community acts on environmental concern (pollution, climate, biodiversity)', value: 66 },
                { id: '7.2.1.b', text: 'Community values non-human life intrinsically (not just instrumental)', value: null },
                { id: '7.2.1.c', text: 'Long-term ecosystem health > short-term gain', value: 69 }
              ]
            },
            {
              id: '7.2.2',
              name: 'Personal Responsibility & Action',
              items: [
                { id: '7.2.2.a', text: 'Community members reduce consumption footprint', value: null },
                { id: '7.2.2.b', text: 'Community members acknowledge personal impact', value: 54 },
                { id: '7.2.2.c', text: 'Community holds itself accountable', value: 61 }
              ]
            },
            {
              id: '7.2.3',
              name: 'Systemic Change Commitment',
              items: [
                { id: '7.2.3.a', text: 'Community supports environmental policy', value: 63 },
                { id: '7.2.3.b', text: 'Community recognizes systems need change (not just individuals)', value: 67 },
                { id: '7.2.3.c', text: 'Community advocates at policy level', value: 60 }
              ]
            }
          ]
        },
        {
          id: '7.3',
          name: 'Intergenerational Stewardship',
          clusters: [
            {
              id: '7.3.1',
              name: 'Future as Priority',
              items: [
                { id: '7.3.1.a', text: 'Community gives future people equal moral standing', value: 72 },
                { id: '7.3.1.b', text: 'Community commits to livable, healthy world for them', value: 74 },
                { id: '7.3.1.c', text: "Present comfort doesn't override future opportunity", value: 68 }
              ]
            },
            {
              id: '7.3.2',
              name: 'Preserving Meaning & Heritage',
              items: [
                { id: '7.3.2.a', text: 'Community honors ancestral wisdom', value: 57 },
                { id: '7.3.2.b', text: 'Community maintains meaningful practices', value: 63 },
                { id: '7.3.2.c', text: "Community doesn't discard heritage for novelty alone", value: 59 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 8,
      name: 'Cooperation & Shared Governance',
      definition: 'Degree to which community makes decisions collectively, shares resources fairly, and governs transparently.',
      actionFocus: 'Does community govern collectively and share equitably?',
      value: 58,
      facets: [
        {
          id: '8.1',
          name: 'Collective Decision-Making',
          clusters: [
            {
              id: '8.1.1',
              name: 'Group Deliberation',
              items: [
                { id: '8.1.1.a', text: 'Community avoids conflict through dialogue', value: 60 },
                { id: '8.1.1.b', text: 'Community seeks consensus (not just majority)', value: 56 },
                { id: '8.1.1.c', text: 'Collective good is prioritized (not just individual interest)', value: 61 }
              ]
            },
            {
              id: '8.1.2',
              name: 'Shared Purpose & Mission',
              items: [
                { id: '8.1.2.a', text: 'Community has common mission uniting members', value: 64 },
                { id: '8.1.2.b', text: 'Collective goal takes priority over individual achievement', value: 55 },
                { id: '8.1.2.c', text: 'Community takes pride in collective accomplishment', value: 62 }
              ]
            }
          ]
        },
        {
          id: '8.2',
          name: 'Transparent Governance',
          clusters: [
            {
              id: '8.2.1',
              name: 'Open Information',
              items: [
                { id: '8.2.1.a', text: 'Community decisions are transparent (not hidden)', value: 70 },
                { id: '8.2.1.b', text: 'Community explains how power is used', value: 67 },
                { id: '8.2.1.c', text: 'Secrecy is known corruption risk (prevented)', value: 71 }
              ]
            },
            {
              id: '8.2.2',
              name: 'Accountability',
              items: [
                { id: '8.2.2.a', text: 'Community leaders must justify decisions', value: 68 },
                { id: '8.2.2.b', text: 'Accountability prevents power abuse', value: 72 },
                { id: '8.2.2.c', text: 'No one is above question', value: 73 }
              ]
            }
          ]
        },
        {
          id: '8.3',
          name: 'Shared Resources & Distribution',
          clusters: [
            {
              id: '8.3.1',
              name: 'Commons Care',
              items: [
                { id: '8.3.1.a', text: 'Community treats shared resources as belonging to all', value: 65 },
                { id: '8.3.1.b', text: 'Community prevents tragedy of commons (sustainable use)', value: 62 },
                { id: '8.3.1.c', text: 'Community opposes hoarding and extraction', value: 59 }
              ]
            },
            {
              id: '8.3.2',
              name: 'Fair Economic Allocation',
              items: [
                { id: '8.3.2.a', text: "Community prioritizes meeting everyone's basic needs first", value: 66 },
                { id: '8.3.2.b', text: 'Community opposes extreme wealth concentration', value: null },
                { id: '8.3.2.c', text: 'Community considers effort/contribution in distribution', value: 63 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 9,
      name: 'Spiritual & Religious Practice',
      definition: 'Degree to which community honors spiritual traditions, creates spaces for spiritual community, and integrates spiritual practice.',
      actionFocus: 'Does community support and respect spiritual practice?',
      value: 80,
      facets: [
        {
          id: '9.1',
          name: 'Religious Community & Belonging',
          clusters: [
            {
              id: '9.1.1',
              name: 'Community Participation',
              items: [
                { id: '9.1.1.a', text: 'Community honors religious community membership', value: 82 },
                { id: '9.1.1.b', text: 'Community recognizes shared spiritual practice as creating belonging', value: 79 },
                { id: '9.1.1.c', text: 'Community honors connection between spirituality and ancestors/future', value: 76 }
              ]
            }
          ]
        },
        {
          id: '9.2',
          name: 'Spiritual Practice & Integration',
          clusters: [
            {
              id: '9.2.1',
              name: 'Sacred Practice Support',
              items: [
                { id: '9.2.1.a', text: 'Community honors religious practice/ritual (intrinsic value)', value: 84 },
                { id: '9.2.1.b', text: 'Community supports maintaining religious tradition', value: 81 },
                { id: '9.2.1.c', text: 'Community recognizes spiritual practice as transformative', value: 78 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 10,
      name: 'Digital Rights & Tech Democracy',
      definition: 'Degree to which community protects digital autonomy, ensures technology serves human flourishing, and governs tech democratically.',
      actionFocus: 'Does community protect rights in digital realm and govern technology for human flourishing?',
      value: null,
      facets: [
        {
          id: '10.1',
          name: 'Digital Autonomy & Privacy',
          clusters: [
            {
              id: '10.1.1',
              name: 'Privacy & Data Protection',
              items: [
                { id: '10.1.1.a', text: 'Community protects privacy in digital spaces', value: null },
                { id: '10.1.1.b', text: 'Community treats personal data as belonging to person (not extractable)', value: null },
                { id: '10.1.1.c', text: 'Community prevents surveillance (corporate/government)', value: null }
              ]
            },
            {
              id: '10.1.2',
              name: 'Algorithmic Autonomy',
              items: [
                { id: '10.1.2.a', text: 'Community prevents invisible algorithmic manipulation', value: null },
                { id: '10.1.2.b', text: 'Community ensures people understand how algorithms affect them', value: null },
                { id: '10.1.2.c', text: 'Community makes algorithmic systems explainable and contestable', value: null }
              ]
            },
            {
              id: '10.1.3',
              name: 'Digital Self-Determination',
              items: [
                { id: '10.1.3.a', text: 'Community protects control over digital identity/presence', value: null },
                { id: '10.1.3.b', text: 'Community allows digital anonymity when chosen', value: null },
                { id: '10.1.3.c', text: 'Community prevents digital profiling/categorization without consent', value: null }
              ]
            }
          ]
        },
        {
          id: '10.2',
          name: 'Human Flourishing Over Efficiency',
          clusters: [
            {
              id: '10.2.1',
              name: 'Preserving Human Judgment & Work',
              items: [
                { id: '10.2.1.a', text: "Community keeps technology in service role (doesn't replace humans)", value: null },
                { id: '10.2.1.b', text: 'Community preserves human decision-making in important choices', value: null },
                { id: '10.2.1.c', text: 'Community prevents dehumanizing efficiency gains', value: null }
              ]
            },
            {
              id: '10.2.2',
              name: 'Embodied Connection',
              items: [
                { id: '10.2.2.a', text: 'Community prioritizes face-to-face human connection', value: null },
                { id: '10.2.2.b', text: 'Community uses digital tools to enable (not replace) human interaction', value: null },
                { id: '10.2.2.c', text: 'Community preserves human labor and meaning', value: null }
              ]
            },
            {
              id: '10.2.3',
              name: 'Protection from Digital Harm',
              items: [
                { id: '10.2.3.a', text: 'Community prevents tools from dehumanizing relationships', value: null },
                { id: '10.2.3.b', text: 'Community addresses tech addiction and psychological manipulation', value: null },
                { id: '10.2.3.c', text: 'Community protects children from digital exploitation', value: null }
              ]
            }
          ]
        },
        {
          id: '10.3',
          name: 'Democratic Technology Governance',
          clusters: [
            {
              id: '10.3.1',
              name: 'Democratic Control',
              items: [
                { id: '10.3.1.a', text: 'Community prevents tech companies from unilateral power over communication', value: null },
                { id: '10.3.1.b', text: 'Community ensures algorithms are governed democratically (not corporately)', value: null },
                { id: '10.3.1.c', text: 'Technology governance includes affected communities', value: null }
              ]
            },
            {
              id: '10.3.2',
              name: 'Universal Access & Inclusion',
              items: [
                { id: '10.3.2.a', text: 'Community treats digital access as right (not luxury); addresses digital divides', value: null },
                { id: '10.3.2.b', text: 'Community ensures technology accessible to all (including disabled)', value: null },
                { id: '10.3.2.c', text: 'Community prioritizes infrastructure for inclusion', value: null }
              ]
            },
            {
              id: '10.3.3',
              name: 'Power Limitation',
              items: [
                { id: '10.3.3.a', text: 'Community opposes tech monopolies and power concentration', value: null },
                { id: '10.3.3.b', text: 'Community promotes open standards and interoperability', value: null },
                { id: '10.3.3.c', text: 'Community ensures public technology infrastructure is democratically governed', value: null }
              ]
            }
          ]
        }
      ]
    }
  ];

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    renderVectorModal();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function renderDomainsChart() {
    if (!domainsChart) return;
    domainsChart.innerHTML = '';

    vectorData.domains.forEach(function(domain) {
      var group = document.createElement('div');
      group.className = 'bar-group';

      var bar = document.createElement('div');
      bar.className = 'bar' + (domain.muted ? ' bar-muted' : '');
      bar.style.height = domain.score + '%';

      var label = document.createElement('span');
      label.className = 'bar-label';
      label.textContent = domain.id;

      group.appendChild(bar);
      group.appendChild(label);
      domainsChart.appendChild(group);
    });
  }

  function renderContextShiftsGrid() {
    if (!contextGrid) return;
    contextGrid.innerHTML = '';

    var labels = [
      { key: 'work', short: 'W' },
      { key: 'family', short: 'F' },
      { key: 'private', short: 'P' },
      { key: 'crisis', short: 'C' }
    ];

    labels.forEach(function(row) {
      var wrap = document.createElement('div');
      wrap.className = 'shift-row';

      var left = document.createElement('div');
      left.className = 'shift-label';
      left.textContent = row.short;

      var trackWrap = document.createElement('div');
      trackWrap.className = 'shift-track-grid';

      vectorData.contextShifts[row.key].forEach(function(value) {
        var cell = document.createElement('div');
        cell.className = 'shift-cell';

        if (value !== 0) {
          var mark = document.createElement('div');
          mark.className = 'shift-mark' + (value < 0 ? ' shift-mark-blue' : '');
          mark.style.width = Math.min(Math.abs(value) * 3, 100) + '%';
          cell.appendChild(mark);
        }

        trackWrap.appendChild(cell);
      });

      wrap.appendChild(left);
      wrap.appendChild(trackWrap);
      contextGrid.appendChild(wrap);
    });
  }

  function renderAccordion() {
    if (!domainsAccordion) return;
    domainsAccordion.innerHTML = '';

    taxonomyDomains.forEach(function(domain) {
      var item = document.createElement('div');
      item.className = 'vector-accordion-item';

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'vector-accordion-trigger';
      button.textContent = domain.id + '. ' + domain.name + ' [' + (domain.value === null ? 'null' : domain.value) + ']';

      var content = document.createElement('div');
      content.className = 'vector-accordion-content';
      content.hidden = true;

      var definition = document.createElement('p');
      definition.className = 'vector-domain-definition';
      definition.textContent = domain.definition;

      var focus = document.createElement('p');
      focus.className = 'vector-domain-definition';
      focus.innerHTML = '<strong>Action focus:</strong> ' + domain.actionFocus;

      content.appendChild(definition);
      content.appendChild(focus);

      domain.facets.forEach(function(facet) {
        var facetEl = document.createElement('div');
        facetEl.className = 'vector-facet';

        var facetTitle = document.createElement('div');
        facetTitle.className = 'vector-facet-title';
        facetTitle.textContent = facet.id + ' ' + facet.name;

        facetEl.appendChild(facetTitle);

        facet.clusters.forEach(function(cluster) {
          var clusterEl = document.createElement('div');
          clusterEl.className = 'vector-cluster';

          var clusterTitle = document.createElement('div');
          clusterTitle.className = 'vector-cluster-title';
          clusterTitle.textContent = cluster.id + ' ' + cluster.name;

          var list = document.createElement('ul');
          list.className = 'vector-domain-items';

          cluster.items.forEach(function(entry) {
            var li = document.createElement('li');
            li.innerHTML = '<span class="vector-item-id">' + entry.id + '</span> ' +
                          entry.text +
                          ' <span class="vector-item-value">[' + (entry.value === null ? 'null' : entry.value) + ']</span>';
            list.appendChild(li);
          });

          clusterEl.appendChild(clusterTitle);
          clusterEl.appendChild(list);
          facetEl.appendChild(clusterEl);
        });

        content.appendChild(facetEl);
      });

      button.addEventListener('click', function() {
        content.hidden = !content.hidden;
        item.classList.toggle('open');
      });

      item.appendChild(button);
      item.appendChild(content);
      domainsAccordion.appendChild(item);
    });
  }

  function renderConflictWeights() {
    if (!conflictWeights) return;
    conflictWeights.innerHTML = '';

    vectorData.conflictResolution.forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'vector-weight-row';

      row.innerHTML =
        '<div class="vector-weight-name">' + item.name + '</div>' +
        '<div class="vector-weight-bar"><div class="vector-weight-fill" style="width:' + item.weight + '%"></div></div>' +
        '<div class="vector-weight-value">' + item.weight + '</div>';

      conflictWeights.appendChild(row);
    });
  }

  function renderVectorModal() {
    renderDomainsChart();
    renderContextShiftsGrid();
    renderAccordion();
    renderConflictWeights();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function(e) {
    if (!modal.hidden && e.key === 'Escape') {
      closeModal();
    }
  });
}

function initTopicDetailViews() {
  var modalTitle = document.getElementById('section-modal-title');
  var modalBody = document.getElementById('section-modal-body');

  if (!modalBody) return;

var topicStore = {
    voting: {
      'vote-1': {
        name: 'Repair sidewalk near school',
        description: 'Residents ask to repair broken sidewalk slabs and improve safe access to the school entrance.',
        counter: '15/43',
        deadline: '26.05.12',
        relevance: 84,
        isrScore: 71,
        status: 'in_process',
        statusText: 'Voting is currently active and members can still vote.',
        options: [
          { label: 'Repair full sidewalk line', score: null },
          { label: 'Repair only dangerous segments', score: null },
          { label: 'Delay until next budget cycle', score: null }
        ]
      },
      'vote-2': {
        name: 'Street light maintenance request',
        description: 'The issue was already solved by municipality service, so community voting is no longer needed.',
        counter: '0/71',
        deadline: '26.07.01',
        relevance: 65,
        isrScore: 54,
        status: 'canceled',
        statusText: 'Canceled: the issue was already solved by municipality service.',
        options: [
          { label: 'Replace all damaged lamps', score: null },
          { label: 'Replace only on the main street', score: null },
          { label: 'Escalate to municipality', score: null }
        ]
      },
      'vote-3': {
        name: 'Summer courtyard redesign',
        description: 'The implementation has started after the community decision was approved.',
        counter: '7/8',
        deadline: '26.05.20',
        relevance: 91,
        isrScore: 88,
        status: 'approved',
        statusText: 'Approved: implementation process has started.',
        options: [
          { label: 'Add benches and shade', score: 143 },
          { label: 'Add playground zone', score: 121 },
          { label: 'Keep minimal intervention', score: 47 }
        ]
      },
      'vote-4': {
        name: 'After-school program funding',
        description: 'Discussion regarding budget allocation...',
        counter: '0/340',
        deadline: '26.04.10',
        relevance: 88,
        isrScore: 93,
        status: 'discussion',
        statusText: 'Currently under community discussion.',
        options: []
      },
      'vote-5': {
        name: 'Switch CI/CD to GitHub Actions',
        description: 'Proposal to migrate our current Jenkins pipelines to GitHub Actions to reduce maintenance overhead.',
        counter: '15/117',
        deadline: '26.05.20',
        relevance: 0.91,
        isrScore: 1.15,
        status: 'in_process',
        statusText: 'Voting is currently active. Migration timeline depends on this vote.',
        options: [
          { label: 'Full migration to GitHub Actions', score: null },
          { label: 'Hybrid approach (keep Jenkins for legacy)', score: null },
          { label: 'Reject migration', score: null }
        ]
      },
      'vote-6': {
        name: 'Fence door renew',
        description: 'Replacing the old rusted fence door at the main courtyard entrance with a secure electronic gate.',
        counter: '167/188',
        deadline: '26.03.15',
        relevance: 0.95,
        isrScore: 1.07,
        status: 'approved',
        statusText: 'Approved: The community chose the heavy-duty metal option.',
        options: [
          { label: 'Heavy-duty metal gate', score: 145 },
          { label: 'Standard iron gate', score: 22 },
          { label: 'Keep current door', score: 0 }
        ]
      },
      'vote-7': {
        name: 'Bike lane on Central Avenue',
        description: 'City district initiative to repurpose the rightmost car lane on Central Ave into a protected bike lane.',
        counter: '14020/15775',
        deadline: '26.05.01',
        relevance: 0.54,
        isrScore: 1.88,
        status: 'approved',
        statusText: 'Approved: The district council has approved the protected lane.',
        options: [
          { label: 'Fully protected lane with barriers', score: 9800 },
          { label: 'Painted shared lane only', score: 4000 },
          { label: 'Do not add bike lanes', score: 220 }
        ]
      }
    },
    chat: {
      'chat-1': {
        name: 'Festival second act scheduling',
        description: 'Coordination around act order, performers, and transition timing before Thursday evening.',
        counter: '19 members',
        deadline: '26.05.15',
        relevance: 76,
        isrScore: 63,
        options: ['Keep current order', 'Switch second act to contemporary'],
        messages: [
          { author: 'Iryna V.', text: 'I think we should coordinate with the company before Thursday.', reactions: '5👍 1😁' },
          { author: 'Audrey T.', text: 'I suggest we switch the second act to contemporary.', reactions: '8👍 2🥴' },
          { author: 'Maksym P.', text: 'The current setup is fine if we shorten the first transition.', reactions: '3👍' }
        ]
      },
      'chat-2': {
        name: 'Choreography for the spring showcase',
        description: 'Discussion regarding the creative direction for the second act of our annual performance.',
        counter: '15 members',
        deadline: '26.04.20',
        relevance: 0.60,
        isrScore: 0.85,
        options: ['Keep classical', 'Switch to contemporary', 'Mix both styles'],
        messages: [
          { author: 'Audrey T.', text: 'I suggest we switch the second act to contemporary — the dancers have been asking for it.', reactions: '6👍 1😁' },
          { author: 'Iryna V.', text: 'That sounds great, but do we have enough time to learn a whole new routine?', reactions: '4👍 2🥴' }
        ]
      },
      'chat-3': {
        name: 'School trip safety concerns',
        description: 'Parent committee discussion about medical prep for the upcoming 6th-grade hiking trip.',
        counter: '24 members',
        deadline: '26.05.05',
        relevance: 0.88,
        isrScore: 1.20,
        options: ['Require first-aid certs', 'Hire medical staff', 'Standard prep'],
        messages: [
          { author: 'Sergey B.', text: 'Can we get confirmation that all chaperones have first aid kits?', reactions: '12👍' },
          { author: 'Andrii D.', text: 'Yes, the school provides three kits, but we should bring extra supplies.', reactions: '15👍 1💊' }
        ]
      },
      'chat-4': {
        name: 'Parking lot lighting upgrade',
        description: 'Reviewing vendor quotes for installing LED floodlights in the north parking lot.',
        counter: '8 members',
        deadline: '26.06.10',
        relevance: 0.75,
        isrScore: 0.90,
        options: ['Vendor A (Cheaper)', 'Vendor B (Better warranty)'],
        messages: [
          { author: 'Andrii D.', text: 'Has anyone checked the quotes from the second vendor?', reactions: '2👍' },
          { author: 'Elon M.', text: 'I looked at them. Vendor B is 15% more expensive but covers labor in the warranty.', reactions: '4👍' }
        ]
      },
      'chat-5': {
        name: 'Sprint 14 blockers — API migration',
        description: 'Dev team thread to unblock the frontend team during the v2 authentication rollout.',
        counter: '6 members',
        deadline: '26.05.14',
        relevance: 0.95,
        isrScore: 1.10,
        options: ['Rollback to v1', 'Patch endpoints today', 'Delay sprint review'],
        messages: [
          { author: 'Elon M.', text: 'The auth service is still returning 401s after the endpoint change.', reactions: '2😡 1🥴' },
          { author: 'Audrey T.', text: 'I am pushing a fix to staging right now. Give me 10 minutes.', reactions: '5👍 1😁' }
        ]
      },
      'chat-6': {
        name: 'Public transport route changes — district 7',
        description: 'City planning discussion about the proposed removal of the 6 AM early bus route.',
        counter: '43 members',
        deadline: '26.08.01',
        relevance: 0.65,
        isrScore: 1.45,
        options: ['Keep 6 AM bus', 'Shift to 6:30 AM', 'Replace with minivans'],
        messages: [
          { author: 'Iryna V.', text: 'Removing the 6AM bus would leave the entire east side without early commuter access.', reactions: '28👍 5😡' },
          { author: 'Sergey B.', text: 'Agreed. We need to petition the transit authority to keep at least one early run.', reactions: '19👍' }
        ]
      },
      'chat-7': {
        name: 'Budget allocation for park renovation',
        description: 'Deciding which zones of the district park get prioritized for the Q3 budget.',
        counter: '31 members',
        deadline: '26.07.15',
        relevance: 0.70,
        isrScore: 1.30,
        options: ['Playground', 'Dog park fences', 'Walking paths'],
        messages: [
          { author: 'Andrii D.', text: "I'd prioritize the playground area — it hasn't been updated in 10 years.", reactions: '14👍 2😁' },
          { author: 'Audrey T.', text: 'The walking paths are actually a trip hazard right now. Safety first.', reactions: '11👍 1🥴' }
        ]
      }
    },
    tasks: {
      'task-1': {
        name: 'Neighborhood cleanup coordination',
        description: 'A working thread for assigning roles, tracking subtasks, and posting updates for cleanup day.',
        counter: '12 members',
        deadline: '26.05.18',
        relevance: 82,
        isrScore: 69,
        tasks: [
          { text: 'Confirm volunteers', reactions: '3👍' },
          { text: 'Prepare trash bags and gloves', reactions: '2👍' },
          { text: 'Coordinate with district utility office', reactions: '4👍 1😁' },
          'Assign photo documentation' // No reactions (fallback test)
        ],
        comments: [
          { text: 'Need two more volunteers for the north side.', reactions: '2🥴' },
          { text: 'Utility office can provide bags after 10:00.', reactions: '4👍' },
          'Please confirm if children zone is included.' // No reactions (fallback test)
        ]
      },
      'task-2': {
        name: 'Ladders to 1st entrance',
        description: 'Repair and safety inspection of the primary entrance stairs.',
        counter: '2 tasks',
        deadline: '26.05.25',
        relevance: 0.65,
        isrScore: 0.77,
        tasks: [
          { text: '🔄 Safety inspection (26.05.15)', reactions: '8👍' },
          '⬜ Order replacement parts (26.05.25)' // No reactions
        ],
        comments: [
          { text: 'Inspection is scheduled for this Thursday morning.', reactions: '5👍 1😁' }
        ]
      },
      'task-3': {
        name: 'Studio rental contract extension',
        description: 'Processing the paperwork and negotiations for the cultural studio lease.',
        counter: '3 tasks',
        deadline: '26.07.01',
        relevance: 0.48,
        isrScore: 1.42,
        tasks: [
          { text: '✅ Review current lease terms (26.04.10)', reactions: '4👍' },
          { text: '🔄 Negotiate new rate (26.05.01)', reactions: '2👍 1🥴' },
          '⬜ Sign updated contract (26.07.01)'
        ],
        comments: [
          { text: 'Landlord agreed to a meeting next week to discuss the rate.', reactions: '6👍' }
        ]
      },
      'task-4': {
        name: 'After-school program funding',
        description: 'Securing grants and coordinating staff for the new after-school educational program.',
        counter: '4 tasks',
        deadline: '26.05.10',
        relevance: 0.88,
        isrScore: 0.93,
        tasks: [
          { text: '✅ Draft budget proposal (26.03.20)', reactions: '12👍' },
          { text: '✅ Present to parent committee (26.04.02)', reactions: '18👍 3😁' },
          { text: '🔄 Apply for district grant (26.04.15)', reactions: '10👍' },
          { text: '⬜ Hire program coordinator (26.05.10)', reactions: '1👍' }
        ],
        comments: [
          { text: 'Grant application was submitted yesterday. Waiting for a reply.', reactions: '22👍' }
        ]
      },
      'task-5': {
        name: 'Switch CI/CD to GitHub Actions',
        description: 'Technical migration to modernize the build and deployment pipelines.',
        counter: '3 tasks',
        deadline: '26.06.01',
        relevance: 0.91,
        isrScore: 1.15,
        tasks: [
          { text: '✅ Audit existing Jenkins pipelines (26.05.05)', reactions: '3👍' },
          { text: '🔄 Write GitHub Actions workflows (26.05.20)', reactions: '4👍 1😁' },
          { text: '⬜ Decommission Jenkins server (26.06.01)', reactions: '5👍 2😁' }
        ],
        comments: [
          { text: 'Workflow tests are passing on the staging branch.', reactions: '6👍' }
        ]
      },
      'task-6': {
        name: 'Bike lane on Central Avenue',
        description: 'City district infrastructure project tracking for the new protected bike lane.',
        counter: '3 tasks',
        deadline: '26.05.15',
        relevance: 0.54,
        isrScore: 1.88,
        tasks: [
          { text: '✅ Conduct traffic impact study (26.02.15)', reactions: '45👍' },
          { text: '✅ Approve final route design (26.03.30)', reactions: '120👍 15😡' },
          { text: '🔄 Begin road marking and signage (26.05.15)', reactions: '88👍 5😁' }
        ],
        comments: [
          { text: 'Paint crew is booked for next Tuesday, weather permitting.', reactions: '54👍 3🥴' }
        ]
      }
    }
  };

  var reactionChoices = [
    { value: 'good', label: '👍 Good' },
    { value: 'funny', label: '😁 Funny' },
    { value: 'flood', label: '🥴 Flood' },
    { value: 'rude', label: '😡 Rude' },
    { value: 'fool', label: '💊 Fool' }
  ];

  function getStatusBadge(status) {
    if (status === 'approved') return '<span class="status-pill status-pill-done">Approved</span>';
    if (status === 'discussion') return '<span class="status-pill status-pill-pending">Discussion</span>';
    if (status === 'canceled') return '<span class="status-pill status-pill-pending">Canceled</span>';
    return '<span class="status-pill status-pill-active">Voting</span>';
  }

  function renderMetaRow(items) {
    return '<div class="topic-detail-meta">' +
      items.map(function(item) {
        return '<div class="topic-detail-meta-item"><span class="topic-detail-meta-label">' +
          item.label + '</span><span class="topic-detail-meta-value">' + item.value + '</span></div>';
      }).join('') +
      '</div>';
  }

  function renderVotingTopic(topic) {
    var inactive = topic.status !== 'in_process';

    return '' +
      '<div class="topic-detail-card">' +
        '<div class="topic-detail-top">' +
          '<div>' +
            '<div class="topic-detail-eyebrow">Voting topic</div>' +
            '<h3 class="topic-detail-title">' + topic.name + '</h3>' +
          '</div>' +
          '<div class="topic-detail-status-wrap">' + getStatusBadge(topic.status) + '</div>' +
        '</div>' +

        '<p class="topic-detail-description">' + topic.description + '</p>' +

        renderMetaRow([
          { label: 'Counter', value: topic.counter },
          { label: 'Deadline', value: topic.deadline },
          { label: 'Relevance', value: topic.relevance },
          { label: 'ISR-score', value: topic.isrScore }
        ]) +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">Status explanation</div>' +
          '<div class="topic-detail-note">' + topic.statusText + '</div>' +
        '</div>' +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">Decision options</div>' +
          '<div class="topic-options-list">' +
            topic.options.map(function(option) {
              return '<label class="topic-option-row ' + (inactive ? 'topic-option-disabled' : '') + '">' +
                '<input type="radio" name="voting-option" ' + (inactive ? 'disabled' : '') + ' />' +
                '<span class="topic-option-text">' + option.label + '</span>' +
                (topic.status === 'approved'
                  ? '<span class="topic-option-score">ISR total: ' + option.score + '</span>'
                  : '') +
              '</label>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-actions">' +
          (topic.status === 'canceled' || topic.status === 'discussion' || topic.status === 'approved'
            ? '<button type="button" class="danger-link-btn" data-remove-topic="1">Remove topic from the Voting list</button>'
            : '') +
          '<div class="topic-detail-actions-right">' +
            '<button type="button" class="topic-back-btn">Cancel</button>' +
            '<button type="button" ' + (inactive ? 'disabled' : '') + '>Vote</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderReactionMenu() {
    return '<div class="reaction-menu" hidden>' +
      reactionChoices.map(function(choice) {
        return '<button type="button" class="reaction-choice-btn" data-reaction="' + choice.value + '">' + choice.label + '</button>';
      }).join('') +
    '</div>';
  }

  function renderChatTopic(topic) {
    return '' +
      '<div class="topic-detail-card">' +
        '<div class="topic-detail-top">' +
          '<div>' +
            '<div class="topic-detail-eyebrow">Chat topic</div>' +
            '<h3 class="topic-detail-title">' + topic.name + '</h3>' +
          '</div>' +
        '</div>' +

        '<p class="topic-detail-description">' + topic.description + '</p>' +

        renderMetaRow([
          { label: 'Counter', value: topic.counter },
          { label: 'Deadline', value: topic.deadline },
          { label: 'Relevance', value: topic.relevance },
          { label: 'ISR-score', value: topic.isrScore }
        ]) +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">Decision options</div>' +
          '<div class="topic-options-inline">' +
            topic.options.map(function(option) {
              return '<span class="dash-badge">' + option + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">Messages</div>' +
          '<div class="topic-message-list">' +
            topic.messages.map(function(msg, index) {
              // ADDED: Check for existing reactions
              var existingReactions = msg.reactions ? '<span style="display:inline-flex; gap:6px; padding:2px 8px; margin:0 4px; background:var(--surface-muted); border-radius:12px; font-size:0.85rem; cursor:pointer;">' + msg.reactions + '</span>' : '';
              
              return '' +
              '<div class="topic-message-card">' +
                '<div class="topic-message-author">' + msg.author + '</div>' +
                '<div class="topic-message-text">' + msg.text + '</div>' +
                '<div class="topic-message-actions">' +
                  '<button type="button" class="topic-inline-btn">Reply</button>' +
                  existingReactions + // Injected here
                  '<div class="reaction-wrap">' +
                    '<button type="button" class="topic-inline-btn react-toggle-btn" data-reaction-menu="' + index + '">React</button>' +
                    renderReactionMenu() +
                  '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-block">' +
          '<div class="topic-input-row">' +
            '<input type="text" placeholder="Write a message..." />' +
          '</div>' +
          '<div class="topic-detail-actions">' +
            '<div class="topic-detail-actions-left">' +
              '<button type="button">Attach</button>' +
              '<button type="button">Propose option</button>' +
            '</div>' +
            '<div class="topic-detail-actions-right">' +
              '<button type="button" class="topic-back-btn">Cancel</button>' +
              '<button type="button">Send</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderChatCreate() {
    return '' +
      '<div class="topic-detail-card">' +
        '<div class="topic-detail-top">' +
          '<div>' +
            '<div class="topic-detail-eyebrow">New issue topic</div>' +
            '<h3 class="topic-detail-title">Register a new issue</h3>' +
          '</div>' +
        '</div>' +

        '<div class="topic-form-grid">' +
          '<div class="topic-form-field">' +
            '<label>Issue Topic Name</label>' +
            '<input type="text" placeholder="Enter issue topic name" />' +
          '</div>' +
          '<div class="topic-form-field">' +
            '<label>Issue Description</label>' +
            '<textarea class="topic-form-textarea" placeholder="Describe the issue"></textarea>' +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-actions">' +
          '<div class="topic-detail-actions-left">' +
            '<button type="button">Attach</button>' +
            '<button type="button">Check</button>' +
          '</div>' +
          '<div class="topic-detail-actions-right">' +
            '<button type="button" class="topic-back-btn">Cancel</button>' +
            '<button type="button">Create</button>' +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">AI assistant</div>' +
          '<div class="topic-ai-panel">' +
            '<div class="ai-msg ai-msg-assistant">Specify issue scale, location, context and other details. Don’t forget to check if this issue already exists.</div>' +
            '<div class="topic-input-row">' +
              '<input type="text" placeholder="Type details for AI assistant..." />' +
              '<button type="button">Send</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderTasksTopic(topic) {
    return '' +
      '<div class="topic-detail-card">' +
        '<div class="topic-detail-top">' +
          '<div>' +
            '<div class="topic-detail-eyebrow">Task topic</div>' +
            '<h3 class="topic-detail-title">' + topic.name + '</h3>' +
          '</div>' +
        '</div>' +

        '<p class="topic-detail-description">' + topic.description + '</p>' +

        renderMetaRow([
          { label: 'Counter', value: topic.counter },
          { label: 'Deadline', value: topic.deadline },
          { label: 'Relevance', value: topic.relevance },
          { label: 'ISR-score', value: topic.isrScore }
        ]) +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">Tasks</div>' +
          '<div class="task-button-list">' +
            topic.tasks.map(function(task) {
              var taskText = typeof task === 'string' ? task : task.text;
              var existingReactions = task.reactions ? '<span style="display:inline-flex; gap:6px; padding:2px 8px; margin:0 4px; background:var(--surface-muted); border-radius:12px; font-size:0.85rem; cursor:pointer;">' + task.reactions + '</span>' : '';
              
              return '<div style="display:flex; align-items:center; gap: 8px;">' +
                       '<button type="button" class="task-chip-btn">' + taskText + '</button>' +
                       existingReactions + // Injected here
                       '<div class="reaction-wrap">' +
                         '<button type="button" class="topic-inline-btn react-toggle-btn">React</button>' +
                         renderReactionMenu() +
                       '</div>' +
                     '</div>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-block">' +
          '<div class="topic-detail-block-title">Comments</div>' +
          '<div class="topic-message-list">' +
            topic.comments.map(function(comment) {
              var commentText = typeof comment === 'string' ? comment : comment.text;
              var existingReactions = comment.reactions ? '<span style="display:inline-flex; gap:6px; padding:2px 8px; margin:0 4px; background:var(--surface-muted); border-radius:12px; font-size:0.85rem; cursor:pointer;">' + comment.reactions + '</span>' : '';

              return '<div class="topic-message-card">' +
                       '<div class="topic-message-text">' + commentText + '</div>' +
                       '<div class="topic-message-actions">' +
                         '<button type="button" class="topic-inline-btn">Reply</button>' +
                         existingReactions + // Injected here
                         '<div class="reaction-wrap">' +
                           '<button type="button" class="topic-inline-btn react-toggle-btn">React</button>' +
                           renderReactionMenu() +
                         '</div>' +
                       '</div>' +
                     '</div>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="topic-detail-actions">' +
          '<div class="topic-detail-actions-left">' +
            '<button type="button">Add Task</button>' +
            '<button type="button">Add comment</button>' +
            '<button type="button">Break down</button>' +
          '</div>' +
          '<div class="topic-detail-actions-right">' +
            '<button type="button" class="topic-back-btn">Cancel</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderTopicDetail(kind, topicId, sourceViewHtml, titleText) {
    var topic = topicStore[kind] && topicStore[kind][topicId];
    if (!topic) return;

    modalBody.setAttribute('data-topic-detail-open', '1');
    modalBody.setAttribute('data-topic-source-kind', kind);
    modalBody.setAttribute('data-topic-source-title', titleText || '');
    modalBody.__sourceViewHtml = sourceViewHtml || modalBody.innerHTML;

    if (kind === 'voting') {
      modalBody.innerHTML = renderVotingTopic(topic);
    } else if (kind === 'chat') {
      modalBody.innerHTML = renderChatTopic(topic);
    } else if (kind === 'tasks') {
      modalBody.innerHTML = renderTasksTopic(topic);
    }

    bindDetailViewButtons(titleText);
  }

  function renderChatCreateView(sourceViewHtml, titleText) {
    modalBody.setAttribute('data-topic-detail-open', '1');
    modalBody.setAttribute('data-topic-source-kind', 'chat-create');
    modalBody.setAttribute('data-topic-source-title', titleText || '');
    modalBody.__sourceViewHtml = sourceViewHtml || modalBody.innerHTML;
    modalBody.innerHTML = renderChatCreate();
    bindDetailViewButtons(titleText);
  }

  function restoreTopicListView() {
    if (typeof modalBody.__sourceViewHtml === 'string') {
      modalBody.innerHTML = modalBody.__sourceViewHtml;
      modalBody.removeAttribute('data-topic-detail-open');
      bindTopicListInteractions();
    }
  }
  
  modalBody.__restoreView = restoreTopicListView;

  function bindReactionMenus() {
    modalBody.querySelectorAll('.react-toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var wrap = btn.closest('.reaction-wrap');
        if (!wrap) return;
        var menu = wrap.querySelector('.reaction-menu');
        if (!menu) return;
        menu.hidden = !menu.hidden;
      });
    });

    modalBody.querySelectorAll('.reaction-choice-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var menu = btn.closest('.reaction-menu');
        if (menu) menu.hidden = true;
      });
    });
  }

  function bindDetailViewButtons(titleText) {
    modalBody.querySelectorAll('.topic-back-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        restoreTopicListView();
        if (modalTitle && titleText) modalTitle.textContent = titleText;
      });
    });

    bindReactionMenus();
  }

function bindTopicListInteractions() {
    var sourceTitle = modalTitle ? modalTitle.textContent : '';

    modalBody.querySelectorAll('[data-topic-id][data-topic-type]').forEach(function(el) {
      // ADDED: Prevent multiple click listeners from stacking on the same element
      if (el.__eventsBound) return;
      el.__eventsBound = true;

      el.addEventListener('click', function(e) {
        e.preventDefault();
        var kind = this.getAttribute('data-topic-type');
        var topicId = this.getAttribute('data-topic-id');
        renderTopicDetail(kind, topicId, modalBody.innerHTML, sourceTitle);
      });
    });

    var newTopicBtn = modalBody.querySelector('#chat-new-topic-btn');
    if (newTopicBtn) {
      // ADDED: Prevent multiple click listeners for the new chat button too
      if (!newTopicBtn.__eventsBound) {
        newTopicBtn.__eventsBound = true;
        newTopicBtn.addEventListener('click', function(e) {
          e.preventDefault();
          renderChatCreateView(modalBody.innerHTML, sourceTitle);
        });
      }
    }
  }

  document.addEventListener('click', function(e) {
    var sectionTrigger = e.target.closest('[data-section]');
    if (!sectionTrigger) return;

    setTimeout(function() {
      bindTopicListInteractions();
    }, 0);
  });
}

function initMainPage() {
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');
  const logo = document.getElementById('logo');
  const overlay = document.getElementById('section-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!menuButton || !menu) return;

  const storedName = safeGetStorage('userName');
  const nameEl = menuButton.querySelector('.menu-user-name');
  const avatarEl = menuButton.querySelector('.initials-avatar');

  if (storedName && nameEl) {
    nameEl.textContent = storedName;
  }

  if (storedName && avatarEl) {
    const initials = storedName
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);

    avatarEl.textContent = initials || 'U';
  }

  menuButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    menu.classList.toggle('menu-open');
  });

  document.addEventListener('click', function (e) {
    if (!menuButton.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('menu-open');
    }
  });

  if (logo) {
    logo.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  document.querySelectorAll('[data-section]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openSectionModal(this.getAttribute('data-section'));
    });
  });

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSectionModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeSectionModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSectionModal();
      menu.classList.remove('menu-open');
    }
  });

  initValuesSection();
  initValuesVectorModal();
  initTopicDetailViews();
}

function initValuesSection() {
  var editBtn = document.getElementById('values-edit-btn');
  var explainBtn = document.getElementById('values-explain-btn');
  var saveBtn = document.getElementById('values-save-btn');
  var cancelBtn = document.getElementById('values-cancel-btn');

  var viewMode = document.getElementById('values-view-mode');
  var editMode = document.getElementById('values-edit-mode');

  var textDisplay = document.getElementById('values-text-display');
  var textarea = document.getElementById('values-textarea');

  var aiCard = document.getElementById('values-ai-card');
  var aiInput = document.getElementById('values-ai-input');
  var aiSendBtn = document.getElementById('values-ai-send-btn');
  var aiMessages = document.getElementById('values-ai-messages');

  if (!editBtn || !saveBtn || !cancelBtn || !viewMode || !editMode || !textDisplay || !textarea) {
    return;
  }

  var originalValue = textarea.value;

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderDisplayFromTextarea(value) {
    var paragraphs = value
      .split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(function (p) { return p.length > 0; });

    textDisplay.innerHTML = paragraphs.map(function (p) {
      return '<p>' + escapeHtml(p) + '</p>';
    }).join('');
  }

  function enterEditMode() {
    originalValue = textarea.value;
    viewMode.hidden = true;
    editMode.hidden = false;
    textarea.focus();
  }

  function exitEditMode() {
    editMode.hidden = true;
    viewMode.hidden = false;
  }

  function appendMessage(text, role) {
    if (!aiMessages) return;

    var msg = document.createElement('div');
    msg.className = 'ai-msg ' + (role === 'user' ? 'ai-msg-user' : 'ai-msg-assistant');
    msg.textContent = text;
    aiMessages.appendChild(msg);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function handleAiSend() {
    if (!aiInput) return;

    var value = aiInput.value.trim();
    if (!value) return;

    appendMessage(value, 'user');
    aiInput.value = '';

    if (/survey/i.test(value)) {
      appendMessage(
        'Great. We can run a short follow-up survey to better ground the values that still look vague across social-process domains.',
        'assistant'
      );
    } else if (/person|reflect|use |havel|mandela|arendt|frankl/i.test(value)) {
      appendMessage(
        'Understood. Name a public figure, philosopher, or community leader, and I will use that person only as a reflection point to test proximity to your stated values.',
        'assistant'
      );
    } else {
      appendMessage(
        'Let’s clarify the weakest areas first. You can describe where you stand on freedom versus safety, justice versus mercy, or individual choice versus community responsibility.',
        'assistant'
      );
    }
  }

  editBtn.addEventListener('click', function () {
    enterEditMode();
  });

  saveBtn.addEventListener('click', function () {
    renderDisplayFromTextarea(textarea.value);
    exitEditMode();
    appendMessage(
      'Saved. I can now help identify weakly grounded values or suggest a short follow-up survey.',
      'assistant'
    );
  });

  cancelBtn.addEventListener('click', function () {
    textarea.value = originalValue;
    exitEditMode();
  });

  if (explainBtn && aiCard && aiInput) {
    explainBtn.addEventListener('click', function () {
      aiCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      aiInput.focus();
    });
  }

  if (aiSendBtn) {
    aiSendBtn.addEventListener('click', handleAiSend);
  }

  if (aiInput) {
    aiInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAiSend();
      }
    });
  }
}

function initApp() {
  if (document.getElementById('menu-button') && document.getElementById('menu')) {
    initMainPage();
    return;
  }

  if (document.getElementById('login-username') || document.getElementById('testProfiles')) {
    initLoginPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}