function toggleContent(id) {
    var content = document.getElementById(id);
    if (content.style.display != "block") {
        content.style.display = "block";
    } else if (content.style.display != "none") {
        content.style.display = "none";
    }
}

function scrollToAndExpand(id) {
    var element = document.getElementById("content-" + id);
    var menuPopup = document.getElementById("menu");
    toggleContent("content-" + id);
    element.scrollIntoView();
    menuPopup.style.display = 'none';
}

function goHome() {
    window.location.href = '../index.html';
}

function openChat() {
    var chatWindow = document.getElementById("chat-window");
    chatWindow.style.display = "block";
}

function closeChat() {
    var chatWindow = document.getElementById("chat-window");
    chatWindow.style.display = "none";
}

function openLogin() {
    window.location.href = "index.html";
}


// Value points  
let freeValuePoints = 100;
const maxPoints = 100;

function updateValue(id) {
    const input = document.getElementById(id);
    const newValue = parseInt(input.value);
    
    // Calculate the total value excluding the current field
    const ids = [
        'serviceability', 'energy_efficiency', 'repair_quality', 
        'exterior_appearance', 'cleanliness_order', 'landscaping',
        'respect_residents','conflict_resolution','inclusivity',
        'transparent_financial','reasonable_distribution','cost_optimization',
        'waste_disposal','noise_reduction','pollution_reduction',
        'active_residents','response_speed','equalization',
        'safety_residents','living_comfort','pet_friendly'
    ];
    let totalExcludingCurrent = 0;
    ids.forEach(fieldId => {
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
    const ids = [
        'serviceability', 'energy_efficiency', 'repair_quality', 
        'exterior_appearance', 'cleanliness_order', 'landscaping',
        'respect_residents','conflict_resolution','inclusivity',
        'transparent_financial','reasonable_distribution','cost_optimization',
        'waste_disposal','noise_reduction','pollution_reduction',
        'active_residents','response_speed','equalization',
        'safety_residents','living_comfort','pet_friendly'
    ];
    
    let total = 0;
    ids.forEach(id => {
        total += parseInt(document.getElementById(id).value);
    });
    
    freeValuePoints = maxPoints - total;
    document.getElementById("freeValuePoints").innerText = `Free Value Points: ${freeValuePoints}`;
    document.getElementById("total-value").innerText = total;
}



// popupmenu
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-button');
  const menuPopup = document.getElementById('menu');

  if (!menuButton || !menuPopup) {
    // index.html: handle preset profile selection
    const profileInput = document.getElementById('testProfiles');
    if (profileInput) {
      const validProfiles = [...document.querySelectorAll('#testProfiless option')].map(o => o.value);
      profileInput.addEventListener('input', function() {
        if (validProfiles.includes(this.value)) {
          sessionStorage.setItem('userName', this.value);
          window.location.href = 'main.html';
        }
      });
    }

    // Enable Login / Register only when username is not empty
    const usernameInput = document.getElementById('login-username');
    const loginBtn  = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    if (usernameInput && loginBtn && registerBtn) {
      usernameInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        loginBtn.disabled    = !hasValue;
        registerBtn.disabled = !hasValue;
      });
      // Navigate to main.html when enabled
      loginBtn.addEventListener('click', function() {
        if (!this.disabled) {
          sessionStorage.setItem('userName', usernameInput.value.trim());
          window.location.href = 'main.html';
        }
      });
      registerBtn.addEventListener('click', function() {
        if (!this.disabled) {
          sessionStorage.setItem('userName', usernameInput.value.trim());
          window.location.href = 'main.html';
        }
      });
    }

    return;
  }

  // Display stored user name in navbar
  const storedName = sessionStorage.getItem('userName');
  if (storedName) {
    menuButton.textContent = '🤵 ' + storedName;
  }

  // Toggle menu visibility
  menuButton.addEventListener('click', function() {
    menuPopup.style.display = menuPopup.style.display === 'block' ? 'none' : 'block';
    menuPopup.style.right = menuButton.style.right;
  });

  // Hide menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!menuButton.contains(event.target) && !menuPopup.contains(event.target)) {
      menuPopup.style.display = 'none';
    }
  });

  // Hide menu when an option is clicked
  menuPopup.addEventListener('click', function(event) {
    if (event.target.classList.contains('menu-option')) {
      menuPopup.style.display = 'none';
    }
  });
});

// Search toggle: mode 1 (buttons) ↔ mode 2 (input + search)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-search-toggle]').forEach(function(container) {
    var buttons = container.querySelector('.search-buttons');
    var input   = container.querySelector('.search-input');
    var toggleBtn = container.querySelector('.search-toggle-btn');

    if (!buttons || !input || !toggleBtn) return;

    // Enter search mode
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      buttons.style.display = 'none';
      input.style.display   = '';
      input.querySelector('input').focus();
    });

    // Prevent clicks on search input / search button from bubbling (avoid toggling the parent paragraph)
    input.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Exit search mode when clicking anywhere outside
    document.addEventListener('click', function(e) {
      if (!input.contains(e.target)) {
        buttons.style.display = '';
        input.style.display   = 'none';
      }
    });
  });
});
