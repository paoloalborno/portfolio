/**
 * =================================================================================
 * main.js - Script principale del sito web
 * =================================================================================
 *
 * Ciao! Se stai leggendo questo file, probabilmente vuoi capire come funziona il sito.
 * Questo file è il "cervello" di tutte le pagine. Si occupa di diverse cose:
 *
 * 1.  **Caricare Pezzi di Pagina Comuni:** Carica l'header (la parte in alto con il menu)
 *     e il footer (la parte in basso) in ogni pagina, così non dobbiamo riscriverli
 *     ogni volta.
 * 2.  **Gestire le Traduzioni:** Si occupa di cambiare la lingua della pagina (Italiano/Inglese)
 *     quando viene selezionata.
 * 3.  **Animazioni:** Fa apparire gli elementi con una piccola animazione quando scorri la pagina.
 * 4.  **Interattività:** Gestisce il funzionamento di elementi come il menu mobile (su telefono)
 *     e le sezioni a "schede" (tabs).
 * 5.  **Easter Egg:** Contiene un piccolo scherzo nascosto (il Konami Code!).
 *
 * Ho cercato di commentare ogni parte nel modo più semplice possibile.
 *
 * La prima riga qui sotto, `document.addEventListener(...)`, è molto importante.
 * Dice al browser: "Ehi, non eseguire nessuno di questi comandi finché la pagina HTML
 * non è stata completamente caricata e pronta". Questo previene molti errori.
 */

document.addEventListener('DOMContentLoaded', function() {

    // Questo oggetto contiene i dati per costruire il menu di navigazione.
    // Ogni elemento del menu ha un link (href) e una "chiave" (key) per la traduzione.
    const menuItems = [
      { href: "index.html", key: "nav.home" },
      { href: "about.html", key: "nav.about" },
      { href: "projects.html", key: "nav.projects" },
      { href: "blog.html", key: "nav.blog" },
      { href: "cv.html", key: "nav.cv" },
      { href: "hobbies.html", key: "nav.hobbies" },
    ];

    /**
     * --- Funzione per Caricare Componenti Esterni (Header/Footer) ---
     * Questa funzione è "asincrona" (async), il che significa che può "aspettare"
     * che qualcosa finisca (in questo caso, il download di un file) senza bloccare
     * il resto del browser.
     *
     * @param {string} url - L'indirizzo del file HTML da caricare (es. 'templates/header.html').
     * @param {string} elementId - L'ID dell'elemento nella pagina dove inserire il contenuto caricato.
     */
    async function loadComponent(url, elementId) {
        try {
            // "await fetch(url)" scarica il file dall'indirizzo specificato.
            // Aspetta che il download sia finito prima di continuare.
            const response = await fetch(url);

            // Se c'è stato un problema con il download (es. file non trovato), lancia un errore.
            if (!response.ok) {
                throw new Error(`Errore nel caricamento: ${response.status}`);
            }

            // "await response.text()" prende il contenuto del file scaricato come testo.
            const data = await response.text();

            // Trova l'elemento nella pagina usando il suo ID.
            const element = document.getElementById(elementId);

            // Se l'elemento esiste, inserisci il contenuto del file al suo interno.
            if (element) {
                element.innerHTML = data;
            }
        } catch (error) {
            // Se qualcosa va storto, stampa un messaggio di errore nella console del browser.
            console.error(`Impossibile caricare il componente da ${url}:`, error);
        }
    }

    /**
     * --- Funzione per Creare il Menu di Navigazione ---
     * Questa funzione genera l'HTML per il menu e lo inserisce nel punto specificato.
     *
     * @param {string} containerSelector - Un selettore CSS per trovare il contenitore del menu (es. '#menu').
     */
    function printMenu(containerSelector) {
        const currentLang = localStorage.getItem('language') || 'it';
        // Usa una "template literal" (delimitata da ``) per creare l'HTML in modo più leggibile.
        const html = `
        <ul class="nav-links">
          ${menuItems.map(item => {
            // Aggiunge il parametro della lingua a ogni link per mantenere la coerenza tra le pagine.
            const link = `${item.href}?lang=${currentLang}`;
            return `<li><a href="${link}" data-translate-key="${item.key}"></a></li>`;
          }).join("")}
        </ul>
      `;
        // ".join('')" unisce tutti i pezzi di HTML in una singola stringa.

        // Inserisce l'HTML generato dentro l'elemento trovato con "containerSelector".
        document.querySelector(containerSelector).innerHTML = html;
    }

    /**
     * --- Funzione Principale di Inizializzazione ---
     * Questa funzione viene eseguita dopo che l'header e il footer sono stati caricati.
     * Si occupa di tutte le altre funzionalità della pagina.
     */
    function initializePage() {
        // Crea il menu di navigazione.
        printMenu("#menu");

        // Imposta la lingua della pagina.
        setLanguage();

        // Attiva la logica per il menu mobile.
        setupMobileMenu();

        // Attiva le animazioni allo scorrimento.
        setupScrollAnimations();

        // Attiva la logica delle schede (tabs).
        setupTabs();

        // Attiva la logica delle sotto-schede (sub-tabs).
        setupSubTabs();
    }

    /**
     * --- Logica per la Gestione della Lingua ---
     */
    function setLanguage() {
        // "URLSearchParams" ci aiuta a leggere i parametri nell'URL (es. ?lang=en).
        const urlParams = new URLSearchParams(window.location.search);

        // La lingua viene decisa con questa priorità:
        // 1. Parametro nell'URL (es. ?lang=en) -> per condividere link in una lingua specifica.
        // 2. Lingua salvata nel browser -> per ricordare la scelta dell'utente tra le visite.
        // 3. Lingua di default ('it') -> se l'utente è nuovo.
        let lang = urlParams.get('lang') || localStorage.getItem('language') || 'it';

        // Salva la lingua scelta nel localStorage del browser, così la prossima volta
        // che l'utente visita il sito, la sua preferenza viene ricordata.
        localStorage.setItem('language', lang);

        // Imposta la lingua sull'elemento <html> della pagina.
        document.documentElement.lang = lang;

        // Trova tutti gli elementi che hanno l'attributo "data-translate-key".
        const elements = document.querySelectorAll('[data-translate-key]');

        // Per ogni elemento trovato...
        elements.forEach(el => {
            const key = el.getAttribute('data-translate-key'); // es. "nav.home"
            const [page, string] = key.split('.'); // es. ["nav", "home"]

            // Controlla se la traduzione esiste nel file translations.js e la applica.
            if (translations[page] && translations[page][string] && translations[page][string][lang]) {
                el.innerHTML = translations[page][string][lang];
            }
        });

        // Traduce anche elementi speciali come la meta-descrizione e il titolo della pagina.
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const page = window.location.pathname.split('/').pop().split('.').shift() || 'index';
            if (translations[page] && translations[page]['meta_description'] && translations[page]['meta_description'][lang]) {
                metaDescription.content = translations[page]['meta_description'][lang];
            }
        }
        const pageTitle = document.querySelector('title');
        if (pageTitle) {
            const page = window.location.pathname.split('/').pop().split('.').shift() || 'index';
            if (translations[page] && translations[page]['title'] && translations[page]['title'][lang]) {
                document.title = translations[page]['title'][lang];
            }
        }

        // Gestisce il nuovo toggle per la lingua
        const langToggle = document.getElementById('lang-toggle-checkbox');
        if (langToggle) {
            // Imposta lo stato iniziale del toggle in base alla lingua corrente
            langToggle.checked = (lang === 'en');

            // Aggiunge un ascoltatore per il click sul toggle
            langToggle.addEventListener('change', () => {
                const newLang = langToggle.checked ? 'en' : 'it';
                // Ricarica la pagina con il nuovo parametro della lingua
                window.location.search = `?lang=${newLang}`;
            });
        }
    }

    /**
     * --- Logica per il Menu Mobile ---
     */
    function setupMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenu && navLinks) {
            // Aggiunge un "ascoltatore di eventi": quando l'utente clicca sull'icona del menu...
            mobileMenu.addEventListener('click', () => {
                // ...aggiunge o toglie la classe 'active' per mostrare/nascondere il menu.
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('is-active');
            });
        }
    }

    /**
     * --- Logica per le Animazioni allo Scorrimento ---
     * Usa l'"IntersectionObserver", una funzione moderna del browser che ci dice
     * quando un elemento entra nell'area visibile dello schermo.
     */
    function setupScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se l'elemento è entrato nello schermo...
                if (entry.isIntersecting) {
                    // ...aggiungi la classe 'animated' per far partire l'animazione CSS.
                    entry.target.classList.add('animated');
                    // Smetti di osservare questo elemento, così l'animazione non si ripete.
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // L'animazione parte quando almeno il 10% dell'elemento è visibile.

        // Applica l'osservatore a tutti gli elementi con la classe '.animate-on-scroll'.
        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            animationObserver.observe(section);
        });
    }

    /**
     * --- Logica per le Schede (Tabs) ---
     * Gestisce i sistemi a schede, come quelli nella pagina dei progetti.
     */
    function setupTabs() {
        const tabContainers = document.querySelectorAll('.tabs-container, .cv-tabs');

        tabContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.tab-btn, .cv-tab-btn');
            const tabPanes = container.parentElement.querySelectorAll('.tab-pane, .cv-tab-pane');

            if (tabButtons.length > 0 && tabPanes.length > 0) {
                tabButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const targetTab = button.getAttribute('data-tab');

                        // Disattiva tutti i bottoni e i pannelli
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        tabPanes.forEach(pane => pane.classList.remove('active'));

                        // Attiva solo il bottone cliccato e il pannello corrispondente
                        button.classList.add('active');
                        document.getElementById(targetTab)?.classList.add('active');
                    });
                });
            }
        });
    }

    /**
     * --- Logica per le Sotto-Schede (Sub-Tabs) ---
     * Simile alle schede normali, ma per elementi annidati.
     */
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

    /**
     * --- Logica per l'Easter Egg (Konami Code) ---
     * Un piccolo scherzo per chi conosce i vecchi videogiochi.
     */
    function setupKonamiCode() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    alert('Easter Egg Attivato! Grande!');
                    konamiIndex = 0; // Resetta per la prossima volta
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    // --- ESECUZIONE ---
    // Carica header e footer, e una volta finito, inizializza tutto il resto.
    loadComponent('templates/header.html', 'header-placeholder')
        .then(() => loadComponent('templates/footer.html', 'footer-placeholder'))
        .then(initializePage);

    // Attiva l'Easter Egg.
    setupKonamiCode();
});
