document.addEventListener('DOMContentLoaded', function() {
  // Build/insert header if not already present
  if (!document.querySelector('.site-header')) {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="container">
        <a class="site-logo" id="home-btn" href="/index.html"><img src="/images/logo-t.png" alt="ISR" style="height:32px;display:inline-block;vertical-align:middle"></a>
        <nav class="site-nav" id="site-nav">
          <a href="/wiki/ISR-Arendt-article.html">Article</a>
          <a href="/wiki/society2050/index.html">Society2050</a>
          <a href="/wiki/pitchdeck/index.html">Pitch Deck</a>
          <span style="position:relative">
            <a href="#" class="nav-arch" id="nav-arch">Architecture</a>
            <div id="arch-list" class="arch-dropdown" style="display:none"></div>
          </span>
          <a href="/prototype/index.html">Prototype</a>
          <a href="#" id="game-btn">Game</a>
        </nav>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
  }

  // Architecture list population (hard-coded files list)
  const archFiles = [
    {name: 'Microservices', href: '/architecture/microservices.html'},
    {name: 'GCP Microservices', href: '/architecture/gcp-ms.html'},
    {name: 'MS (overview)', href: '/architecture/ms.html'},
    {name: 'GCP Monolith', href: '/architecture/gpc-mono.html'}
  ];

  const navArch = document.getElementById('nav-arch');
  const archList = document.getElementById('arch-list');
  if (navArch && archList) {
    // Create list markup
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '8px 0';
    ul.style.margin = '0';
    ul.style.minWidth = '160px';

    archFiles.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.name;
      a.style.display = 'block';
      a.style.padding = '8px 16px';
      a.style.color = '#2d3956';
      a.style.textDecoration = 'none';
      a.style.hover = 'background:#f0f4f8';
      li.appendChild(a);
      ul.appendChild(li);
    });

    archList.appendChild(ul);

    // Toggle on click
    navArch.addEventListener('click', function(e) {
      e.preventDefault();
      archList.style.display = archList.style.display === 'block' ? 'none' : 'block';
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!navArch.contains(e.target) && !archList.contains(e.target)) {
        archList.style.display = 'none';
      }
    });
  }

  // Games button starts snake3d
  const gameBtn = document.getElementById('game-btn');
  if (gameBtn) {
    gameBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // navigate to snake3d
      window.location.href = '/snake3d/index.html';
    });
  }

  // Make logo clickable to root
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', function(e) {
      // if already on the home page, just scroll up
      if (location.pathname === '/' || location.pathname.endsWith('/index.html')) return;
      // otherwise navigate
      // allow default anchor behavior
    });
  }
});
