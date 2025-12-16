function toggleContent(id) {
    var content = document.getElementById(id);
    var header = document.getElementById(id.substring(8)); // remove "content-" prefix and get header id
    if (content.style.display != "block") {
        header.textContent  = "▼" + header.textContent.substring(1);
        // header.innerText = header.innerText.replace("►", "▼");
        content.style.display = "block";
    } else if (content.style.display != "none") {
        header.textContent  = "►" + header.textContent.substring(1);
        // header.innerText = header.innerText.replace("▼", "►");
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
    alert("Logging in...");
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

// Remove the duplicate auto-expand code at the bottom and replace with:

// Function to find and open all parent sections
function expandAllParents(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    // Find all parent content divs
    let currentElement = targetElement.parentElement;
    while (currentElement) {
        // Check if we're inside a collapsible section
        if (currentElement.classList && 
            (currentElement.classList.contains('content') || 
             currentElement.classList.contains('paragraph'))) {
            
            // Try to find the header for this section
            const parentId = currentElement.id;
            if (parentId && parentId.startsWith('content-')) {
                const sectionId = parentId.substring(8); // Remove "content-" prefix
                const sectionHeader = document.getElementById(sectionId);
                const sectionContent = document.getElementById(parentId);
                
                if (sectionHeader && sectionContent && sectionContent.style.display === "none") {
                    // Expand this parent section
                    toggleContent(parentId);
                }
            }
        }
        
        // Move up to parent container
        currentElement = currentElement.parentElement;
    }
}

// Main function to handle hash navigation
function checkAndExpandFromHash() {
    const hash = window.location.hash.substring(1);
    
    if (hash) {
        console.log("Auto-expanding for hash:", hash);
        
        // First expand all parent sections
        expandAllParents(hash);
        
        // Then expand the target section itself
        const contentElement = document.getElementById("content-" + hash);
        const headerElement = document.getElementById(hash);
        
        if (contentElement && headerElement && contentElement.style.display === "none") {
            toggleContent("content-" + hash);
        }
        
        // Finally scroll to the target
        setTimeout(() => {
            const target = document.getElementById(hash);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 500); // Give time for all sections to expand
    }
}

// Initialize - use only one event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing menu code here...
    const menuButton = document.getElementById('menu-button');
    const menuPopup = document.getElementById('menu');

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
    
    // Check hash on initial load
    setTimeout(checkAndExpandFromHash, 100); // Small delay to ensure DOM is ready
});

// Also check hash when hash changes
window.addEventListener('hashchange', checkAndExpandFromHash);