document.addEventListener('DOMContentLoaded', function() {

    const menuItems = [
      { href: "index.html", key: "nav.home" },
      { href: "about.html", key: "nav.about" },
      { href: "projects.html", key: "nav.projects" },
      { href: "blog.html", key: "nav.blog" },
      { href: "cv.html", key: "nav.cv" },
      { href: "hobbies.html", key: "nav.hobbies" },
    ];

    async function loadComponent(url, elementId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        } catch (error) {
            console.error(`Could not load component from ${url}:`, error);
        }
    }

    function printMenu(containerSelector) {
      const html = `
        <ul class="nav-links">
          ${menuItems.map(item => 
            `<li><a href="${item.href}" data-translate-key="${item.key}"></a></li>`
          ).join("")}
        </ul>
      `;
      document.querySelector(containerSelector).innerHTML = html;
    }

    async function loadHeaderAndFooter() {
        await loadComponent('templates/header.html', 'header-placeholder');
        await loadComponent('templates/footer.html', 'footer-placeholder');
    }

    loadHeaderAndFooter().then(() => {
        printMenu("#menu");

        function setLanguage() {
            const urlParams = new URLSearchParams(window.location.search);
            let lang = urlParams.get('lang') || 'it'; // Default to Italian

            // Set the lang attribute on the html tag
            document.documentElement.lang = lang;

            // Translate the page
            const elements = document.querySelectorAll('[data-translate-key]');
            elements.forEach(el => {
                const key = el.getAttribute('data-translate-key');
                const [page, string] = key.split('.');
                if (translations[page] && translations[page][string] && translations[page][string][lang]) {
                    el.innerHTML = translations[page][string][lang];
                }
            });

            // Translate meta description
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                const page = window.location.pathname.split('/').pop().split('.').shift() || 'index';
                if (translations[page] && translations[page]['meta_description'] && translations[page]['meta_description'][lang]) {
                    metaDescription.content = translations[page]['meta_description'][lang];
                }
            }

            // Translate title
            const page = window.location.pathname.split('/').pop().split('.').shift() || 'index';
            if (translations[page] && translations[page]['title'] && translations[page]['title'][lang]) {
                document.title = translations[page]['title'][lang];
            }

            // Update language switcher
            const langSwitcher = document.querySelector('.lang-switcher-desktop');
            if (langSwitcher) {
                const currentPath = window.location.pathname;
                langSwitcher.innerHTML = `
                    <a href="${currentPath}?lang=it" class="lang-option ${lang === 'it' ? 'active' : ''}">IT</a>
                    <span class="lang-separator">|</span>
                    <a href="${currentPath}?lang=en" class="lang-option ${lang === 'en' ? 'active' : ''}">EN</a>
                `;
            }
        }

        setLanguage();

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('is-active');
            });
        }

        // Intersection observer for animations
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            animationObserver.observe(section);
        });

        // Tabs functionality
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        if (tabButtons.length > 0 && tabPanes.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    const targetPane = document.getElementById(targetTab);

                    if (targetPane) {
                        // Deactivate all buttons and panes
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        tabPanes.forEach(pane => pane.classList.remove('active'));

                        // Activate the clicked button and corresponding pane
                        button.classList.add('active');
                        targetPane.classList.add('active');
                    }
                });
            });
        }
    });

    // Easter Egg: Konami Code
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                alert('Easter Egg Activated!');
                konamiIndex = 0; // Reset for next time
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Sub-tabs functionality for Python Projects
    const subTabButtons = document.querySelectorAll('.sub-tab-btn');
    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const subTabContainer = button.closest('.sub-tabs-container');
            const targetSubTab = button.getAttribute('data-sub-tab');

            // Deactivate all sub-tab buttons and panes within this container
            subTabContainer.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
            subTabContainer.querySelectorAll('.sub-tab-pane').forEach(pane => pane.classList.remove('active'));

            // Activate the clicked button and corresponding pane
            button.classList.add('active');
            subTabContainer.querySelector(`#${targetSubTab}`).classList.add('active');
        });
    });
});
