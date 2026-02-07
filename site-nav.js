document.addEventListener('DOMContentLoaded', function () {
    // Check if header already exists
    if (!document.querySelector('.site-header')) {
        const config = window.siteNavConfig || {};
        const header = document.createElement('header');
        header.className = 'site-header';

        let navItemsHtml = '';

        // Use configured items or default if not provided
        if (config.items && config.items.length > 0) {
            navItemsHtml = config.items.map(item => {
                if (item.type === 'dropdown') {
                    return `
                        <span class="dropdown-container">
                            <a href="#" class="nav-dropdown" id="${item.id}">${item.label}</a>
                            <div id="${item.menuId}" class="dropdown-menu"></div>
                        </span>
                    `;
                } else {
                    const activeClass = item.active ? 'tab-active' : '';
                    const href = item.href || '#';
                    const onclick = item.onClick ? `onclick="${item.onClick}"` : '';
                    return `<a href="${href}" id="${item.id}" class="${activeClass}" ${onclick}>${item.label}</a>`;
                }
            }).join('');
        } else {
            // Default Navigation
            navItemsHtml = `
                <span class="dropdown-container">
                    <a href="#" class="nav-dropdown" id="nav-about">About ISR</a>
                    <div id="about-list" class="dropdown-menu"></div>
                </span>
                <a href="/wiki/explorer.html">Explorer</a>
                <span class="dropdown-container">
                    <a href="#" class="nav-dropdown" id="nav-arch">Architecture</a>
                    <div id="arch-list" class="dropdown-menu"></div>
                </span>
                <a href="/prototype/index.html">Prototype</a>
                <a href="#" id="game-btn">Game</a>
            `;
        }

        const logoUrl = config.logoUrl || '/index.html';
        const logoImg = config.logoImg || '/images/isr-logo.png';

        header.innerHTML = `
            <div class="container">
                <a class="site-logo" id="home-btn" href="${logoUrl}">
                    <img src="${logoImg}" alt="ISR" style="height:32px;display:inline-block;vertical-align:middle">
                </a>
                
                <!-- Hamburger menu for mobile -->
                <button class="hamburger-menu" id="hamburger-btn" aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <nav class="site-nav" id="site-nav">
                    ${navItemsHtml}
                </nav>
            </div>
        `;
        document.body.insertBefore(header, document.body.firstChild);
    }

    // Add viewport meta tag if not present (CRITICAL FOR MOBILE)
    /*if (!document.querySelector('meta[name="viewport"]')) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5';
        document.head.appendChild(viewportMeta);
    }*/

    // Default About list items (only execute if we are in default mode or if specific IDs exist)
    const aboutItems = [
        { name: 'What is ISR', href: '/wiki/index.html' },
        { name: 'MVP User Guide', href: '/wiki/mvp.html' },
        { name: 'Adaptable Auth', href: '/wiki/adaptable_authorization.html' },
        { name: 'Philosophy', href: '/wiki/ISR-Arendt-article.html' },
        { name: 'Society2050', href: '/wiki/society2050/index.html' },
        { name: 'Pitch Deck', href: '/wiki/pitchdeck/index.html' },
        { name: 'FAQ', href: '/wiki/faq.html' }
    ];

    // Default Architecture list items
    const archItems = [
        { name: 'Microservices', href: '/architecture/microservices.html' },
        { name: 'GCP Microservices', href: '/architecture/gcp-ms.html' },
        { name: 'MS (overview)', href: '/architecture/ms.html' },
        { name: 'GCP Monolith', href: '/architecture/gpc-mono.html' }
    ];

    // Create dropdown function
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

        // Toggle dropdown on click
        dropdown.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Check if we're on mobile
            const isMobile = window.innerWidth <= 768;

            // Toggle active class on parent container
            const parentContainer = dropdown.closest('.dropdown-container');
            parentContainer.classList.toggle('active');

            // Toggle menu visibility
            menu.classList.toggle('active');

            // On mobile, don't close other dropdowns automatically
            if (!isMobile) {
                // Close all other dropdowns on desktop
                document.querySelectorAll('.dropdown-container').forEach(container => {
                    if (container !== parentContainer) {
                        container.classList.remove('active');
                        const otherMenu = container.querySelector('.dropdown-menu');
                        if (otherMenu) otherMenu.classList.remove('active');
                    }
                });
            }
        });
    }

    // Create default dropdowns if they exist
    createDropdown('nav-about', 'about-list', aboutItems);
    createDropdown('nav-arch', 'arch-list', archItems);

    // Initialize configured dropdowns
    if (window.siteNavConfig && window.siteNavConfig.items) {
        window.siteNavConfig.items.forEach(item => {
            if (item.type === 'dropdown' && item.items) {
                createDropdown(item.id, item.menuId, item.items);
            }
        });
    }

    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const siteNav = document.getElementById('site-nav');

    if (hamburgerBtn && siteNav) {
        hamburgerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle active classes
            hamburgerBtn.classList.toggle('active');
            siteNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        const dropdownContainers = document.querySelectorAll('.dropdown-container');
        const isMobile = window.innerWidth <= 768;

        let clickedInsideNav = false;

        // Check if click is inside navigation
        if (siteNav && siteNav.contains(e.target)) clickedInsideNav = true;
        if (hamburgerBtn && hamburgerBtn.contains(e.target)) clickedInsideNav = true;

        // On desktop, close dropdowns when clicking outside
        if (!isMobile && !clickedInsideNav) {
            dropdownContainers.forEach(container => {
                container.classList.remove('active');
            });

            dropdowns.forEach(menu => {
                menu.classList.remove('active');
            });
        }

        // On mobile, close entire menu when clicking outside
        if (isMobile && hamburgerBtn && hamburgerBtn.classList.contains('active')) {
            if (!clickedInsideNav) {
                hamburgerBtn.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Also close any open dropdowns
                dropdownContainers.forEach(container => {
                    container.classList.remove('active');
                });

                dropdowns.forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        }
    });

    // Close dropdowns when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const dropdownContainers = document.querySelectorAll('.dropdown-container');
            const dropdowns = document.querySelectorAll('.dropdown-menu');

            dropdownContainers.forEach(container => {
                container.classList.remove('active');
            });

            dropdowns.forEach(menu => {
                menu.classList.remove('active');
            });

            // Also close mobile menu if open
            if (hamburgerBtn && hamburgerBtn.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Close mobile menu when switching to desktop
            if (window.innerWidth > 768) {
                if (hamburgerBtn && hamburgerBtn.classList.contains('active')) {
                    hamburgerBtn.classList.remove('active');
                    siteNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }

                // Close all dropdowns on desktop resize (clean state)
                document.querySelectorAll('.dropdown-container').forEach(container => {
                    container.classList.remove('active');
                });

                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        }, 250);
    });

    // Game button functionality
    const gameBtn = document.getElementById('game-btn');
    if (gameBtn) {
        gameBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = '/snake3d/index.html';
        });
    }

    // Make logo clickable to root
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function (e) {
            // Close mobile menu if open
            if (hamburgerBtn && hamburgerBtn.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            // Allow default navigation
        });
    }

    // Close mobile dropdowns when clicking a link (except dropdown toggles)
    siteNav.addEventListener('click', function (e) {

        // Handle Tab Switching specifically for the Explorer page
        if (e.target.tagName === 'A' && e.target.parentElement.classList.contains('site-nav')) {
            // It's a top level link/button
        }

        if (window.innerWidth <= 768) {
            // If clicking a direct link (not a dropdown toggle), close menu
            if (e.target.tagName === 'A' && !e.target.classList.contains('nav-dropdown')) {
                hamburgerBtn.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});