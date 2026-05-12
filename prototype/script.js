function toggleContent(id) {
    var content = document.getElementById(id);
    if (content.style.display != "block") {
        content.style.display = "block";
    } else if (content.style.display != "none") {
        content.style.display = "none";
    }
}

function scrollToAndExpand(id) {
    openSectionModal(id);
}

// Section titles mapping
var sectionTitles = {
    chat: '💬 Chat',
    voting: '🤚 Voting',
    tasks: '🛠️ Tasks',
    values: '⚖️ Values',
    profile: '🤵 Profile',
    settings: '🎨 Settings'
};

var currentSectionId = null;

function openSectionModal(sectionId) {
    var overlay = document.getElementById('section-modal-overlay');
    var titleEl = document.getElementById('section-modal-title');
    var bodyEl = document.getElementById('section-modal-body');
    var source = document.getElementById('section-' + sectionId);
    var menuPopup = document.getElementById('menu');

    if (!source || !overlay) return;

    // Close menu if open
    if (menuPopup) menuPopup.style.display = 'none';

    // Move content into modal
    titleEl.textContent = sectionTitles[sectionId] || sectionId;
    bodyEl.innerHTML = '';
    while (source.firstChild) {
        bodyEl.appendChild(source.firstChild);
    }
    currentSectionId = sectionId;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSectionModal(event) {
    if (event && event.target !== document.getElementById('section-modal-overlay')) return;

    var overlay = document.getElementById('section-modal-overlay');
    var bodyEl = document.getElementById('section-modal-body');

    if (currentSectionId) {
        var source = document.getElementById('section-' + currentSectionId);
        while (bodyEl.firstChild) {
            source.appendChild(bodyEl.firstChild);
        }
        currentSectionId = null;
    }

    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSectionModal();
});

function goHome() {
    window.location.href = '../index.html';
}

function openChat() {
    var chatWindow = document.getElementById("chat-window");
    if (chatWindow) chatWindow.style.display = "block";
}

function closeChat() {
    var chatWindow = document.getElementById("chat-window");
    if (chatWindow) chatWindow.style.display = "none";
}

function openLogin() {
    window.location.href = "index.html";
}

// Safe sessionStorage helpers (Brave strict mode can block storage)
function safeGetStorage(key) {
    try { return sessionStorage.getItem(key); } catch(e) { return null; }
}
function safeSetStorage(key, val) {
    try { sessionStorage.setItem(key, val); } catch(e) {}
}

// Value points  
var freeValuePoints = 100;
var maxPoints = 100;

function updateValue(id) {
    var input = document.getElementById(id);
    var newValue = parseInt(input.value);
    
    var ids = [
        'serviceability', 'energy_efficiency', 'repair_quality', 
        'exterior_appearance', 'cleanliness_order', 'landscaping',
        'respect_residents','conflict_resolution','inclusivity',
        'transparent_financial','reasonable_distribution','cost_optimization',
        'waste_disposal','noise_reduction','pollution_reduction',
        'active_residents','response_speed','equalization',
        'safety_residents','living_comfort','pet_friendly'
    ];
    var totalExcludingCurrent = 0;
    ids.forEach(function(fieldId) {
        if (fieldId !== id) {
            totalExcludingCurrent += parseInt(document.getElementById(fieldId).value);
        }
    });

    if (newValue < 0) {
        input.value = 0;
    } else if (totalExcludingCurrent + newValue <= maxPoints) {
        input.value = newValue;
    } else {
        input.value = maxPoints - totalExcludingCurrent;
    }

    updateTotalValue();
}

function updateTotalValue() {
    var ids = [
        'serviceability', 'energy_efficiency', 'repair_quality', 
        'exterior_appearance', 'cleanliness_order', 'landscaping',
        'respect_residents','conflict_resolution','inclusivity',
        'transparent_financial','reasonable_distribution','cost_optimization',
        'waste_disposal','noise_reduction','pollution_reduction',
        'active_residents','response_speed','equalization',
        'safety_residents','living_comfort','pet_friendly'
    ];
    
    var total = 0;
    ids.forEach(function(id) {
        total += parseInt(document.getElementById(id).value);
    });
    
    freeValuePoints = maxPoints - total;
    document.getElementById("freeValuePoints").innerText = "Free Value Points: " + freeValuePoints;
    document.getElementById("total-value").innerText = total;
}

// === Single consolidated init ===
function initApp() {
  try {
    var menuButton = document.getElementById('menu-button');
    var menuPopup = document.getElementById('menu');

    if (!menuButton || !menuPopup) {
      // --- index.html page ---
      var profileInput = document.getElementById('testProfiles');
      if (profileInput) {
        var validProfiles = [];
        document.querySelectorAll('#testProfiless option').forEach(function(o) {
          validProfiles.push(o.value);
        });
        profileInput.addEventListener('input', function() {
          if (validProfiles.indexOf(this.value) !== -1) {
            safeSetStorage('userName', this.value);
            window.location.href = 'main.html';
          }
        });
      }

      var usernameInput = document.getElementById('login-username');
      var loginBtn  = document.getElementById('login-btn');
      var registerBtn = document.getElementById('register-btn');
      if (usernameInput && loginBtn && registerBtn) {
        usernameInput.addEventListener('input', function() {
          var hasValue = this.value.trim().length > 0;
          loginBtn.disabled    = !hasValue;
          registerBtn.disabled = !hasValue;
        });
        loginBtn.addEventListener('click', function() {
          if (!this.disabled) {
            safeSetStorage('userName', usernameInput.value.trim());
            window.location.href = 'main.html';
          }
        });
        registerBtn.addEventListener('click', function() {
          if (!this.disabled) {
            safeSetStorage('userName', usernameInput.value.trim());
            window.location.href = 'main.html';
          }
        });
      }
      return;
    }

    // --- main.html page ---

    // Display stored user name
    var storedName = safeGetStorage('userName');
    if (storedName) {
      menuButton.textContent = '🤵 ' + storedName;
    }

    // Toggle menu
    menuButton.addEventListener('click', function() {
      menuPopup.style.display = menuPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Hide menu on outside click
    document.addEventListener('click', function(event) {
      if (!menuButton.contains(event.target) && !menuPopup.contains(event.target)) {
        menuPopup.style.display = 'none';
      }
    });

    // Logo
    var logo = document.getElementById('logo');
    if (logo) logo.addEventListener('click', goHome);

    // Assistant button
    var assistantBtn = document.getElementById('assistant-btn');
    if (assistantBtn) assistantBtn.addEventListener('click', openChat);

    // Chat close button
    var chatCloseBtn = document.getElementById('chat-close-btn');
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);

    // Dashboard cards and menu links with data-section
    document.querySelectorAll('[data-section]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        openSectionModal(this.getAttribute('data-section'));
      });
    });

    // Modal overlay — close on background click
    var overlay = document.getElementById('section-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeSectionModal();
      });
    }

    // Modal close button
    var modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function() {
        closeSectionModal();
      });
    }

  } catch(err) {
    console.error('initApp error:', err);
  }
}

// Run init — handles both early and late script loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
