/**
 * =================================================================================
 * main.js - Script principale del sito web
 * =================================================================================
 * ... (header commenti come prima)
 */


document.addEventListener('DOMContentLoaded', function() {
	
	const firebaseConfig = {
		apiKey: "AIzaSyBVkDmkQWWcZjLUsWOhzNpjs7AY1vAYqWI",
		authDomain: "portfolio-backend-48826.firebaseapp.com",
		projectId: "portfolio-backend-48826"
	};

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

    async function loadComponent(url, elementId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Errore nel caricamento: ${response.status}`);
            }
            const data = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        } catch (error) {
            console.error(`Impossibile caricare il componente da ${url}:`, error);
        }
    }

    /**
     * --- Gestore della Lingua ---
     * Questa è la funzione centrale che gestisce tutto ciò che riguarda la lingua.
     * È progettata per essere robusta e facile da capire.
     */
    function initializeLanguageHandler() {

        // --- 1. Determinare la Lingua Corrente ---
        const urlParams = new URLSearchParams(window.location.search);
        // La lingua viene decisa con questa priorità:
        // a) Parametro nell'URL (es. ?lang=en) -> Utile per condividere link in una lingua specifica.
        // b) Lingua salvata nel browser (localStorage) -> Per ricordare la scelta dell'utente tra le visite.
        // c) Lingua di default ('it') -> Se l'utente è nuovo o non ha preferenze.
        const currentLang = urlParams.get('lang') || localStorage.getItem('language') || 'it';

        // --- 2. Salvare la Preferenza ---
        // Salviamo la lingua scelta nel localStorage del browser. La prossima volta che
        // l'utente visiterà il sito, questa preferenza verrà letta (punto b sopra).
        localStorage.setItem('language', currentLang);

        // --- 3. Aggiornare l'HTML ---
        // Impostiamo l'attributo 'lang' sul tag <html>. È una buona pratica per l'accessibilità e i motori di ricerca.
        document.documentElement.lang = currentLang;

        // --- 4. Tradurre tutti i testi ---
        // Troviamo tutti gli elementi con l'attributo 'data-translate-key'.
        const elementsToTranslate = document.querySelectorAll('[data-translate-key]');
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-translate-key');
            const [page, string] = key.split('.');
            // Usando il file `translations.js`, troviamo la traduzione giusta e la inseriamo nell'elemento.
            if (translations[page] && translations[page][string] && translations[page][string][currentLang]) {
                el.innerHTML = translations[page][string][currentLang];
            }
        });

        // --- 5. Aggiornare tutti i link interni ---
        // Troviamo tutti i link `<a>` nella pagina.
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            // Controlliamo se il link punta a una pagina locale (non a un sito esterno).
            const rawHref = link.getAttribute('href');
            if (rawHref && (rawHref.startsWith('/') || rawHref.includes('.html'))) {
                try {
                    // Risolviamo l'URL in modo robusto partendo dalla URL corrente della pagina.
                    // Questo permette ai link relativi (es. "gallery.html") di funzionare correttamente.
                    const absoluteUrl = new URL(rawHref, window.location.href);

                    // Aggiungiamo il parametro della lingua.
                    absoluteUrl.searchParams.set('lang', currentLang);
                    link.href = absoluteUrl.href;

                } catch (e) {
                    // Ignora link non validi come href="#"
                    // console.error(`Could not process link: ${rawHref}`, e);
                }
            }
        });

        // --- 6. Gestire il nuovo selettore di lingua ---
        const langOptions = document.querySelectorAll('.lang-option');
        if (langOptions.length > 0) {
            // a) Imposta lo stato attivo sulla lingua corrente
            langOptions.forEach(option => {
                if (option.getAttribute('data-lang') === currentLang) {
                    option.classList.add('active');
                }
            });

            // b) Aggiunge un "ascoltatore di eventi" a ogni opzione
            langOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const newLang = option.getAttribute('data-lang');
                    if (newLang !== currentLang) {
                        // Ricarica la pagina con il nuovo parametro della lingua
                        window.location.search = `?lang=${newLang}`;
                    }
                });
            });
        }
    }


    /**
     * --- Funzione Principale di Inizializzazione ---
     * Questa funzione viene eseguita dopo che l'header e il footer sono stati caricati.
     */
    function initializePage() {
        // 1. PRIMA: Crea l'HTML del menu e inseriscilo nella pagina.
        const menuContainer = document.querySelector("#menu");
        let navLinksElement;
        if(menuContainer) {
            const menuHtml = `
                <ul class="nav-links">
                  ${menuItems.map(item => `<li><a href="${item.href}" data-translate-key="${item.key}"></a></li>`).join("")}
                </ul>`;
            menuContainer.innerHTML = menuHtml;
            // Ottieni un riferimento diretto all'elemento appena creato.
            navLinksElement = menuContainer.querySelector('.nav-links');
        }

        // 2. ORA: Gestisci la lingua.
        initializeLanguageHandler();

        // 3. INFINE: Attiva tutte le altre funzionalità, passando il riferimento a navLinks.
        // In questo modo, non dobbiamo fare una nuova query al DOM.
        if (navLinksElement) {
            setupMobileMenu(navLinksElement);
        }
        setupScrollAnimations();
        setupTabs();
        setupSubTabs();
        setupAdminModal();
    }

    // La funzione ora accetta l'elemento navLinks come argomento.
    function setupMobileMenu(navLinks) {
        const mobileMenu = document.querySelector('.mobile-menu');
        // Non è più necessario cercare navLinks, lo abbiamo già.
        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('is-active');
            });
        }
    }
    function setupScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            animationObserver.observe(section);
        });
    }
    function setupTabs() {
        const tabContainers = document.querySelectorAll('.tabs-container, .cv-tabs');
        tabContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.tab-btn, .cv-tab-btn');
            const tabPanes = container.parentElement.querySelectorAll('.tab-pane, .cv-tab-pane');
            if (tabButtons.length > 0 && tabPanes.length > 0) {
                tabButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const targetTab = button.getAttribute('data-tab');
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        tabPanes.forEach(pane => pane.classList.remove('active'));
                        button.classList.add('active');
                        document.getElementById(targetTab)?.classList.add('active');
                    });
                });
            }
        });
    }
    function setupSubTabs() {
        const subTabButtons = document.querySelectorAll('.sub-tab-btn');
        subTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const subTabContainer = button.closest('.sub-tabs-container');
                const targetSubTab = button.getAttribute('data-sub-tab');
                subTabContainer.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
                subTabContainer.querySelectorAll('.sub-tab-pane').forEach(pane => pane.classList.remove('active'));
                button.classList.add('active');
                subTabContainer.querySelector(`#${targetSubTab}`).classList.add('active');
            });
        });
    }

	async function loginWithGitHub() {
	  try {
		const result = await auth.signInWithPopup(provider);
        const user = result.user;
        const token = await user.getIdToken();

        //document.getElementById("tokenOutput").textContent = token;
        //console.log("Token JWT:", token);
		window.location.href = "/pages/admin.html";

	  } catch (error) {
		console.error("Errore login:", error);
		alert("Login fallito: " + error.message);
	  }
	}

	// Logout
	function logout() {
        const logoutModal = document.getElementById('admin-logout-modal');
	  auth.signOut().then(() => {
        if(logoutModal) logoutModal.style.display = 'none';
		window.location.href = "/index.html";
	  });
	}

    function setupAdminModal() {
        const adminDiv = document.querySelector('.admin-login');
        if (!adminDiv) return;
        const adminIcon = adminDiv.querySelector('i');
        const navLinks = document.querySelector('.nav-links');

        auth.onAuthStateChanged(user => {
            // Rimuovi sempre il link admin esistente per evitare duplicati
            const existingAdminLink = navLinks?.querySelector('.admin-link');
            if (existingAdminLink) {
                existingAdminLink.remove();
            }

            if (user) {
                // Utente loggato
                adminIcon.className = 'fas fa-user-check';
                adminDiv.title = 'Logout';

                const logoutModal = document.getElementById('admin-logout-modal');
                adminDiv.onclick = () => {
                    if (logoutModal) logoutModal.style.display = 'block';
                };

                // Aggiungi link "Admin" al menu
                const adminLi = document.createElement('li');
                adminLi.className = 'admin-link';
                adminLi.innerHTML = `<a href="/pages/admin.html"><i class="fas fa-cogs"></i> Admin</a>`;
                if (navLinks) navLinks.appendChild(adminLi);

            } else {
                // Utente non loggato
                adminIcon.className = 'fas fa-user-shield';
                adminDiv.title = 'Admin Login';
                const loginModal = document.getElementById('admin-login-modal');
                adminDiv.onclick = () => {
                    if (loginModal) loginModal.style.display = 'block';
                };
            }
            // Aggiorna tutti i link della pagina con il parametro della lingua
            initializeLanguageHandler();
        });

        // --- Gestione Modale Login (Spostato per essere indipendente) ---
        const loginModal = document.getElementById('admin-login-modal');
        if (loginModal) {
            const closeLoginBtn = loginModal.querySelector('.close-btn');
            const loginBtn = loginModal.querySelector('#login-github-btn');
            if (closeLoginBtn) {
                closeLoginBtn.addEventListener('click', () => { loginModal.style.display = 'none'; });
            }
            if (loginBtn) {
                loginBtn.addEventListener('click', loginWithGitHub);
            }
        }

        // --- Gestione Modale Logout (Spostato per essere indipendente) ---
        const logoutModal = document.getElementById('admin-logout-modal');
        if (logoutModal) {
            const closeLogoutBtn = logoutModal.querySelector('.close-btn');
            const confirmLogoutBtn = logoutModal.querySelector('#confirm-logout-btn');
            const cancelLogoutBtn = logoutModal.querySelector('#cancel-logout-btn');
            if (closeLogoutBtn) {
                closeLogoutBtn.addEventListener('click', () => { logoutModal.style.display = 'none'; });
            }
            if (confirmLogoutBtn) {
                confirmLogoutBtn.addEventListener('click', logout);
            }
            if (cancelLogoutBtn) {
                cancelLogoutBtn.addEventListener('click', () => { logoutModal.style.display = 'none'; });
            }
        }

        // Chiudi modali cliccando fuori
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) loginModal.style.display = 'none';
            if (event.target === logoutModal) logoutModal.style.display = 'none';
        });
    }

    function setupKonamiCode() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    alert('Easter Egg Attivato! Grande!');
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    // --- ESECUZIONE ---
    loadComponent('/assets/templates/header.html', 'header-placeholder')
        .then(() => loadComponent('/assets/templates/footer.html', 'footer-placeholder'))
        .then(initializePage);

    setupKonamiCode();
});
