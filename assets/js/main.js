/**
 * =================================================================================
 * main.js - Script principale del sito web
 * =================================================================================
 */

import { firebaseConfig, getEndpoint } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
	
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GithubAuthProvider();

    const menuItems = [
        { href: "/index.html", key: "nav.home" },
        { href: "/pages/about.html", key: "nav.about" },
        { href: "/pages/projects.html", key: "nav.projects" },
        { href: "/pages/backlog.html", key: "nav.backlog" },
        { href: "/pages/cv.html", key: "nav.cv" },
        { href: "/pages/hobbies.html", key: "nav.hobbies" },
    ];

    async function checkAdminAccess() {
        try {
            const endpoint = getEndpoint() + "/api/auth/check";
            const response = await fetch(endpoint, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Admin access check failed. Status: ${response.status}. Response: ${errorText}`);
                return false;
            }

            console.log("Admin access check successful: User is authorized.");
            return true;

        } catch (error) {
            console.error("Network or fetch error during admin access check:", error);
            return false;
        }
    }

    async function setupAdminModal() {
        const adminDiv = document.querySelector('.admin-login');
        if (!adminDiv) return;
        const hasAccess = await checkAdminAccess();
        const adminIcon = adminDiv.querySelector('i');
        const navLinks = document.querySelector('.nav-links');

        navLinks?.querySelector('.admin-link')?.remove();
        
        if (hasAccess) {
            adminIcon.className = 'fas fa-user-check';
            adminDiv.title = 'Logout';
            adminDiv.onclick = () => {
                const logoutModal = document.getElementById('admin-logout-modal');
                logoutModal && (logoutModal.style.display = 'block');
            };

            const li = document.createElement('li');
            li.className = 'admin-link';
            li.innerHTML = `<a href="/pages/admin.html"><i class="fas fa-cogs"></i> Admin</a>`;
            navLinks && navLinks.appendChild(li);

        } else {
            adminIcon.className = 'fas fa-user-shield';
            adminDiv.title = 'Admin Login';
            const loginModal = document.getElementById('admin-login-modal');
            adminDiv.onclick = () => loginModal && (loginModal.style.display = 'block');
        }

        initializeLanguageHandler();
        

        // Modali Login/Logout
        const loginModal = document.getElementById('admin-login-modal');
        const logoutModal = document.getElementById('admin-logout-modal');
        loginModal?.querySelector('.close-btn')?.addEventListener('click', () => loginModal.style.display = 'none');
        loginModal?.querySelector('#login-github-btn')?.addEventListener('click', loginWithGitHub);
        logoutModal?.querySelector('.close-btn')?.addEventListener('click', () => logoutModal.style.display = 'none');
        logoutModal?.querySelector('#confirm-logout-btn')?.addEventListener('click', logout);
        logoutModal?.querySelector('#cancel-logout-btn')?.addEventListener('click', () => logoutModal.style.display = 'none');

        window.addEventListener('click', e => {
            if (e.target === loginModal) loginModal.style.display = 'none';
            if (e.target === logoutModal) logoutModal.style.display = 'none';
        });
    }

    async function loginWithGitHub() {
        try {
            const result = await auth.signInWithPopup(provider);
            
            const endpoint = getEndpoint() + "/api/auth/verify";
            console.log("Access token GitHub:", result.credential.accessToken);
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // 🔑 salva i cookie HttpOnly
                body: JSON.stringify({ oauthAccessToken: result.credential.accessToken })
            });
            console.log("Backend response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error(`Backend login failed with status ${response.status}:`, errorData);
                throw new Error(errorData.message || `Backend returned status ${response.status}`);
            }

            const backendData = await response.json();
            if (!backendData.jwt) {
                console.error("Backend response is valid but missing JWT token.");
                throw new Error("Token JWT non ricevuto dal backend.");
            }

            console.log("Login with GitHub and backend verification successful. Redirecting to admin page...");
            setTimeout(() => {
                window.location.href = "/pages/admin.html";
            }, 100);

        } catch (error) {
            console.error("An error occurred during the full login process:", error);
            alert("Login fallito: " + error.message);
        }
    }

    async function logout() {
        try {
            const logoutModal = document.getElementById('admin-logout-modal');
            const endpoint = getEndpoint() + "/api/auth/logout";
            const response = await fetch(endpoint, {
                method: "POST",
                credentials: "include" // 🔑 include il cookie JWT
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error(`Backend logout failed with status ${response.status}:`, errorData);
                throw new Error(errorData.message || `Backend returned status ${response.status}`);
            }

            await auth.signOut();
            console.log("Firebase and backend logout successful. Redirecting to home page...");

            if (logoutModal) logoutModal.style.display = 'none';
            window.location.href = "/index.html";
        } catch (error) {
            console.error("An error occurred during the logout process:", error);
            alert("Logout fallito: " + error.message);
        }
    }

    // ======================================================
    // --- Caricamento componenti HTML ---
    // ======================================================
    async function loadComponent(url, elementId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Errore nel caricamento: ${response.status}`);
            const data = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;

                // Esegui tutti gli script presenti
                element.querySelectorAll("script").forEach(oldScript => {
                    const newScript = document.createElement("script");
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                        newScript.async = false; // Mantieni ordine
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.head.appendChild(newScript);
                    oldScript.remove();
                });
            }
        } catch (error) {
            console.error(`Impossibile caricare il componente da ${url}:`, error);
        }
    }
    // ======================================================
    // --- Gestione Lingua ---
    // ======================================================
    function initializeLanguageHandler() {
        const urlParams = new URLSearchParams(window.location.search);
        const currentLang = urlParams.get('lang') || localStorage.getItem('language') || 'it';
        localStorage.setItem('language', currentLang);
        document.documentElement.lang = currentLang;

        // Traduzione testi
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const [page, string] = el.getAttribute('data-translate-key').split('.');
            if (translations[page]?.[string]?.[currentLang]) {
                el.innerHTML = translations[page][string][currentLang];
            }
        });

        // Aggiorna link interni
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.startsWith('/') || href.includes('.html'))) {
                try {
                    const absUrl = new URL(href, window.location.href);
                    absUrl.searchParams.set('lang', currentLang);
                    link.href = absUrl.href;
                } catch { }
            }
        });

        // Gestione selettore lingua
        document.querySelectorAll('.lang-option').forEach(option => {
            if (option.getAttribute('data-lang') === currentLang) option.classList.add('active');
            option.addEventListener('click', () => {
                const newLang = option.getAttribute('data-lang');
                if (newLang !== currentLang) window.location.search = `?lang=${newLang}`;
            });
        });
    }

    // ======================================================
    // --- Funzioni UI ---
    // ======================================================
    function initializePage() {
        const menuContainer = document.querySelector("#menu");
        let navLinksElement;

        if (menuContainer) {
            menuContainer.innerHTML = `
                <ul class="nav-links">
                  ${menuItems.map(i => `<li><a href="${i.href}" data-translate-key="${i.key}"></a></li>`).join("")}
                </ul>`;
            navLinksElement = menuContainer.querySelector('.nav-links');
        }

        initializeLanguageHandler();

        if (navLinksElement) setupMobileMenu(navLinksElement);
        setupScrollAnimations();
        setupTabs();
        setupSubTabs();
        setupAdminModal();
        setupBacklogExpand();
    }

    function setupMobileMenu(navLinks) {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu || !navLinks) return;
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }

    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('animated');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(s => observer.observe(s));
    }

    function setupTabs() {
        document.querySelectorAll('.tabs-container, .cv-tabs').forEach(container => {
            const tabBtns = container.querySelectorAll('.tab-btn, .cv-tab-btn');
            const tabPanes = container.parentElement.querySelectorAll('.tab-pane, .cv-tab-pane');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const target = btn.getAttribute('data-tab');
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                    document.getElementById(target)?.classList.add('active');
                });
            });
        });
    }

    function setupSubTabs() {
        document.querySelectorAll('.sub-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const container = btn.closest('.sub-tabs-container');
                const target = btn.getAttribute('data-sub-tab');
                container.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
                container.querySelectorAll('.sub-tab-pane').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                container.querySelector(`#${target}`).classList.add('active');
            });
        });
    }

    function setupBacklogExpand() {
        document.querySelectorAll('.expand-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const item = icon.closest('.backlog-item');
                const content = item.querySelector('.item-expandable-content');
                icon.classList.toggle('expanded');
                content.style.display = (content.style.display === 'block') ? 'none' : 'block';
            });
        });
    }

    

    // ======================================================
    // --- Easter Egg ---
    // ======================================================
    function setupKonamiCode() {
        const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
        let idx = 0;
        document.addEventListener('keydown', e => {
            if (e.key === code[idx]) {
                idx++;
                if (idx === code.length) {
                    alert('Easter Egg Attivato! Grande!');
                    idx = 0;
                }
            } else idx = 0;
        });
    }

    // ======================================================
    // --- Esecuzione ---
    // ======================================================
    (async () => {
        await loadComponent('/assets/templates/header.html', 'header-placeholder');
        await loadComponent('/assets/templates/footer.html', 'footer-placeholder');

        // Rimosso il caricamento di js-header.html

        function waitForFirebase() {
            return new Promise(resolve => {
                const check = () => {
                    if (window.firebase && window.firebase.auth) resolve();
                    else setTimeout(check, 50);
                };
                check();
            });
        }
        await waitForFirebase();

        // La funzione initializeFirebase() non è definita, la rimuovo
        // initializeFirebase();

        initializePage();
        setupKonamiCode();
    })();

});
