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

  if (!overlay || !bodyEl) return;

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