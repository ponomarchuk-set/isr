document.addEventListener('DOMContentLoaded', function() {
  // Build/insert header if not already present
  if (!document.querySelector('.site-header')) {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="container">
        <a class="site-logo" id="home-btn" href="/index.html"><img src="/images/logo-t.png" alt="ISR" style="height:32px;display:inline-block;vertical-align:middle"></a>
        <nav class="site-nav" id="site-nav">
          <span class="dropdown-container">
            <a href="#" class="nav-dropdown" id="nav-about">About ISR</a>
            <div id="about-list" class="dropdown-menu"></div>
          </span>
          <span class="dropdown-container">
            <a href="#" class="nav-dropdown" id="nav-arch">Architecture</a>
            <div id="arch-list" class="dropdown-menu"></div>
          </span>
          <a href="/prototype/index.html">Prototype</a>
          <a href="#" id="game-btn">Game</a>
        </nav>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
  }

  // Add CSS for dropdowns
  const style = document.createElement('style');
  style.textContent = `
    .dropdown-container {
      position: relative;
      display: inline-block;
    }
    
    .dropdown-menu {
      display: none;
      position: absolute;
      background-color: white;
      min-width: 180px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1000;
      border-radius: 4px;
      border: 1px solid #ddd;
      top: 100%;
      left: 0;
    }
    
    .dropdown-menu ul {
      list-style: none;
      padding: 8px 0;
      margin: 0;
    }
    
    .dropdown-menu li {
      padding: 0;
      margin: 0;
    }
    
    .dropdown-menu a {
      display: block;
      padding: 8px 16px;
      color: #2d3956;
      text-decoration: none;
      white-space: nowrap;
    }
    
    .dropdown-menu a:hover {
      background-color: #f0f4f8;
    }
    
    /* Ensure site-nav has proper positioning */
    .site-nav {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .site-nav > a, .dropdown-container {
      margin-right: 20px;
    }
  `;
  document.head.appendChild(style);

  // About list items
  const aboutItems = [
    {name: 'What is ISR', href: '/wiki/index.html'},
    {name: 'MVP User Guide', href: '/wiki/mvp.html'},
    {name: 'Adaptable Authorization', href: '/wiki/adaptable_authorization.html'},
    {name: 'Society2050', href: '/wiki/society2050/index.html'},
    {name: 'Pitch Deck', href: '/wiki/pitchdeck/index.html'},
    {name: 'FAQ', href: '/wiki/faq.html'}
  ];

  // Architecture list items
  const archItems = [
    {name: 'Microservices', href: '/architecture/microservices.html'},
    {name: 'GCP Microservices', href: '/architecture/gcp-ms.html'},
    {name: 'MS (overview)', href: '/architecture/ms.html'},
    {name: 'GCP Monolith', href: '/architecture/gpc-mono.html'}
  ];

  // Universal function to create dropdown
  function createDropdown(dropdownId, menuId, items) {
    const dropdown = document.getElementById(dropdownId);
    const menu = document.getElementById(menuId);
    
    if (!dropdown || !menu) return;
    
    // Create list
    const ul = document.createElement('ul');
    
    items.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.name;
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    menu.appendChild(ul);
    
    // Toggle dropdown
    dropdown.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Close all other dropdowns first
      document.querySelectorAll('.dropdown-menu').forEach(dm => {
        if (dm !== menu) dm.style.display = 'none';
      });
      
      // Toggle current dropdown
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Create both dropdowns
  createDropdown('nav-about', 'about-list', aboutItems);
  createDropdown('nav-arch', 'arch-list', archItems);

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    const dropdownButtons = document.querySelectorAll('.nav-dropdown');
    
    let clickedInsideDropdown = false;
    
    // Check if click is inside any dropdown or its button
    dropdowns.forEach(menu => {
      if (menu.contains(e.target)) clickedInsideDropdown = true;
    });
    
    dropdownButtons.forEach(button => {
      if (button.contains(e.target)) clickedInsideDropdown = true;
    });
    
    // Close all dropdowns if clicking outside
    if (!clickedInsideDropdown) {
      dropdowns.forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // Close dropdowns when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // Games button starts snake3d
  const gameBtn = document.getElementById('game-btn');
  if (gameBtn) {
    gameBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/snake3d/index.html';
    });
  }

  // Make logo clickable to root
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', function(e) {
      if (location.pathname === '/' || location.pathname.endsWith('/index.html')) return;
      // allow default anchor behavior
    });
  }
});