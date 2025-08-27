/**
 * =================================================================================
 * main.js - Script principale del sito web
 * =================================================================================
 * ... (header commenti come prima)
 */
document.addEventListener('DOMContentLoaded', function() {

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
    function setupAdminModal() {
        const adminIcon = document.querySelector('.admin-login');
        const modal = document.getElementById('admin-login-modal');
        const closeBtn = modal.querySelector('.close-btn');

        if (adminIcon && modal && closeBtn) {
            // Apri modale
            adminIcon.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            // Chiudi modale con il bottone 'x'
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Chiudi modale cliccando fuori dal contenuto
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
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
