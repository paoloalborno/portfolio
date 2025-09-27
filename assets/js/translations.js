/**
 * =================================================================================
 * translations.js - Contenitore delle Traduzioni del Sito
 * =================================================================================
 *
 * Ciao! Questo file è molto semplice e non contiene logica di programmazione complessa.
 * È un grande "dizionario" (in programmazione si chiama "oggetto") che contiene
 * tutte le frasi del sito web in diverse lingue.
 *
 * COME FUNZIONA?
 *
 * La struttura è a livelli:
 *
 * 1.  Il primo livello è la **pagina** o la **sezione** del sito (es. "nav", "footer", "index").
 * 2.  Il secondo livello è una **chiave** che identifica una frase specifica (es. "home", "rights", "title").
 * 3.  Il terzo livello contiene le **traduzioni** vere e proprie, con un codice per ogni lingua
 *     (es. "en" per l'inglese, "it" per l'italiano).
 *
 * ESEMPIO:
 * Per trovare il testo del link "Home" del menu in italiano, lo script `main.js`
 * cercherà `translations.nav.home.it`, che corrisponde a "Home".
 *
 * Se devi aggiungere o modificare un testo, basta seguire questa struttura.
 *
 */
const translations = {
    "nav": {
        "home": { "en": "Home", "it": "Home", "fr": "Accueil" },
        "about": { "en": "About Me", "it": "Chi Sono", "fr": "À propos de moi" },
        "projects": { "en": "Projects", "it": "Progetti", "fr": "Projets" },
        "backlog": { "en": "Backlog", "it": "Backlog", "fr": "Backlog" },
        "cv": { "en": "CV", "it": "CV", "fr": "CV" },
        "hobbies": { "en": "Hobbies", "it": "Hobby", "fr": "Loisirs" },
        "contact": { "en": "Contact Me", "it": "Contattami", "fr": "Contactez-moi" }
    },
    "footer": {
        "rights": { "en": "&copy; 2025 Paolo Alborno. All rights reserved.", "it": "&copy; 2025 Paolo Alborno. Tutti i diritti riservati.", "fr": "&copy; 2025 Paolo Alborno. Tous droits réservés." },
        "skills_h3": { "en": "Core Technologies", "it": "Tecnologie Chiave", "fr": "Technologies Clés" }
    },
    "index": {
        "title": { "en": "Paolo Alborno - Software Engineer", "it": "Paolo Alborno - Software Engineer", "fr": "Paolo Alborno - Ingénieur Logiciel" },
        "meta_description": { "en": "Portfolio of Paolo Alborno, Software Engineer with AWS, Scrum, and PM certifications.", "it": "Portfolio di Paolo Alborno, Software Engineer con certificazione AWS, Scrum, e PM.", "fr": "Portfolio de Paolo Alborno, Ingénieur Logiciel avec certifications AWS, Scrum, et PM." },
        "h1": { "en": "Hi, I'm <span class=\"highlight\">Paolo</span>", "it": "Ciao, sono <span class=\"highlight\">Paolo</span>", "fr": "Salut, je suis <span class=\"highlight\">Paolo</span>" },
        "subtitle": { "en": "Software Engineer | AWS Certified | Scrum & PM", "it": "Software Engineer | AWS Certified | Scrum & PM", "fr": "Ingénieur Logiciel | Certifié AWS | Scrum & PM" },
        "p_hero": { "en": "Software engineer with experience in developing AWS cloud infrastructure, backend APIs, and NLP projects with BERT. I transform complex business needs into robust and scalable technology solutions.", "it": "Ingegnere del software con esperienza nello sviluppo di infrastrutture cloud AWS, API backend e progetti di NLP con BERT. Trasformo complesse esigenze di business in soluzioni tecnologiche robuste e scalabili.", "fr": "Ingénieur logiciel avec une expérience dans le développement d'infrastructures cloud AWS, d'API backend et de projets NLP avec BERT. Je transforme des besoins métiers complexes en solutions technologiques robustes et évolutives." },
        "btn_projects": { "en": "<i class=\"fas fa-code\"></i> View Projects", "it": "<i class=\"fas fa-code\"></i> Vedi i Progetti", "fr": "<i class=\"fas fa-code\"></i> Voir les Projets" },
        "btn_contact": { "en": "<i class=\"fas fa-envelope\"></i> Contact Me", "it": "<i class=\"fas fa-envelope\"></i> Contattami", "fr": "<i class=\"fas fa-envelope\"></i> Contactez-moi" },
        "wip_message": { "en": "Site under continuous development", "it": "Sito in continuo aggiornamento", "fr": "Site en développement continu" }
    },
    "about": {
        "title": { "en": "About Me - Paolo Alborno", "it": "Chi Sono - Paolo Alborno", "fr": "À propos de moi - Paolo Alborно" },
        "meta_description": { "en": "Learn more about Paolo Alborno, a Software Engineer specializing in cloud, backend, and NLP.", "it": "Scopri di più su Paolo Alborno, Software Engineer specializzato in cloud, backend e NLP.", "fr": "Apprenez-en plus sur Paolo Alborno, un ingénieur logiciel spécialisé dans le cloud, le backend et le NLP." },
        "h2": { "en": "About Me", "it": "Chi Sono", "fr": "À propos de moi" },
        "section_subtitle": { "en": "A software engineer with a passion for building complex solutions.", "it": "Un ingegnere del software con la passione per la creazione di soluzioni complesse.", "fr": "Un ingénieur logiciel passionné par la création de solutions complexes." },
        "mission_h3": { "en": "My Mission", "it": "La Mia Missione", "fr": "Ma Mission" },
        "mission_p1": { "en": "I'm Paolo Alborno, a <strong>Software Engineer</strong> with solid experience in the world of <strong>cloud computing</strong>, particularly with <strong>AWS</strong>, and in <strong>backend development</strong>. My mission is to design and build the architecture behind the scenes, ensuring that applications are <strong>high-performing, scalable, and secure</strong>.", "it": "Sono Paolo, un <strong>Software Engineer</strong> con una solida esperienza nel mondo del <strong>cloud computing</strong>, in particolare con <strong>AWS</strong>, e nello <strong>sviluppo di backend</strong>. La mia missione è progettare e costruire l'architettura che sta dietro le quinte, garantendo che le applicazioni siano <strong>performanti, scalabili e sicure</strong>.", "fr": "Je suis Paolo Alborno, un <strong>Ingénieur Logiciel</strong> avec une solide expérience dans le monde du <strong>cloud computing</strong>, en particulier avec <strong>AWS</strong>, et dans le <strong>développement backend</strong>. Ma mission est de concevoir et de construire l'architecture en coulisses, en veillant à ce que les applications soient <strong>performantes, évolutives et sécurisées</strong>." },
        "mission_p2": { "en": "I hold <strong>AWS, Scrum, and Project Management certifications</strong>, which allow me to approach projects with a holistic view, combining technical expertise with effective management of the development process. I have worked on projects ranging from analyzing e-commerce infrastructures to developing <strong>Natural Language Processing (NLP) models with BERT</strong>, demonstrating versatility and strong problem-solving skills.", "it": "Possiedo <strong>certificazioni AWS, Scrum e di Project Management</strong>, che mi permettono di affrontare i progetti con una visione olistica, combinando competenza tecnica con una gestione efficace del processo di sviluppo. Ho lavorato su progetti che spaziano dall'analisi di infrastrutture per e-commerce allo sviluppo di modelli di <strong>Natural Language Processing (NLP) con BERT</strong>, dimostrando versatilità e una forte capacità di problem-solving.", "fr": "Je détiens les certifications <strong>AWS, Scrum et Project Management</strong>, ce qui me permet d'aborder les projets avec une vision globale, en combinant l'expertise technique avec une gestion efficace du processus de développement. J'ai travaillé sur des projets allant de l'analyse d'infrastructures e-commerce au développement de modèles de <strong>Traitement du Langage Naturel (NLP) avec BERT</strong>, démontrant polyvalence et de solides compétences en résolution de problèmes." },
        "mission_p3": { "en": "I firmly believe in the power of technology to <strong>solve real-world problems</strong> and I am always looking for new challenges to refine my skills and <strong>contribute to innovative projects</strong>.", "it": "Credo fermamente nel potere della tecnologia per <strong>risolvere problemi reali</strong> e sono sempre alla ricerca di nuove sfide per affinare le mie competenze e <strong>contribuire a progetti innovativi</strong>.", "fr": "Je crois fermement au pouvoir de la technologie pour <strong>résoudre des problèmes du monde réel</strong> et je suis toujours à la recherche de nouveaux défis pour affiner mes compétences et <strong>contribuer à des projets innovants</strong>." },
        "skills_h3": { "en": "My Key Skills", "it": "Le Mie Competenze Chiave", "fr": "Mes Compétences Clés" },
        "skill1": { "en": "AWS Cloud Infrastructure", "it": "Infrastruttura Cloud AWS", "fr": "Infrastructure Cloud AWS" },
        "skill2": { "en": "Backend & API Development", "it": "Backend & API Development", "fr": "Développement Backend & API" },
        "skill3": { "en": "NLP (BERT)", "it": "NLP (BERT)", "fr": "NLP (BERT)" },
        "skill4": { "en": "E-commerce Analysis", "it": "Analisi E-commerce", "fr": "Analyse E-commerce" },
        "skill5": { "en": "Java", "it": "Java", "fr": "Java" },
        "skill6": { "en": "Project Management", "it": "Project Management", "fr": "Gestion de Projet" },
        "skill7": { "en": "Python", "it": "Python", "fr": "Python" },
        "skill8": { "en": "CI/CD", "it": "CI/CD", "fr": "CI/CD" },
        "skill9": { "en": "Orchestration (NiFi)", "it": "Orchestrazione (NiFi)", "fr": "Orchestration (NiFi)" }
    },
    "projects": {
        "title": { "en": "Projects - Paolo Alborno", "it": "Progetti - Paolo Alborno", "fr": "Projets - Paolo Alborno" },
        "meta_description": { "en": "Explore my projects", "it": "Esplora i miei progetti", "fr": "Découvrez mes projets" },    
        "h2": { "en": "My Projects", "it": "I Miei Progetti", "fr": "Mes Projets" },
        "section_subtitle": { "en": "A selection of projects that demonstrate my technical and management skills.", "it": "Una selezione di progetti che dimostrano le mie competenze tecniche e di gestione.", "fr": "Une sélection de projets qui démontrent mes compétences techniques et de gestion." },
        
        "portfolio_backend_h3": { "en": "Portfolio Backend Development", "it": "Sviluppo Backend del Portfolio", "fr": "Développement Backend du Portfolio" },
        "portfolio_backend_p": { "en": "Development of a secure and scalable backend for this portfolio, using Java Spring Boot, with a focus on authentication and authorization.", "it": "Sviluppo di un backend sicuro e scalabile per questo portfolio, utilizzando Java Spring Boot, con focus su autenticazione e autorizzazione.", "fr": "Développement d'un backend sécurisé et évolutif pour ce portfolio, en utilisant Java Spring Boot, avec un focus sur l'authentification et l'autorisation." },
        "portfolio_backend_btn": { "en": "Project Details", "it": "Dettagli del Progetto", "fr": "Détails du Projet" },
        "tag_spring": { "en": "Spring Boot", "it": "Spring Boot", "fr": "Spring Boot" },
        "tag_postgresql": { "en": "PostgreSQL", "it": "PostgreSQL", "fr": "PostgreSQL" },
        "tag_microservices": { "en": "Microservices", "it": "Microservizi", "fr": "Microservices" },
        "tag_docker": { "en": "Docker", "it": "Docker", "fr": "Docker" },

        "sql_toolkit_h3": { "en": "SQL Reverse Engineering Toolkit", "it": "Toolkit di Reverse Engineering SQL", "fr": "Boîte à Outils d'Ingénierie Inverse SQL" },
        "sql_toolkit_p": { "en": "A command-line tool to analyze and visualize data lineage in a MySQL database.", "it": "Un tool a riga di comando per analizzare e visualizzare la data lineage in un database MySQL.", "fr": "Un outil en ligne de commande pour analyser et visualiser la lignée des données dans une base de données MySQL." },
        "sql_toolkit_btn": { "en": "Project Details", "it": "Dettagli del Progetto", "fr": "Détails du Projet" },
        "tag_python": { "en": "Python", "it": "Python", "fr": "Python" },
        "tag_mysql": { "en": "MySQL", "it": "MySQL", "fr": "MySQL" },
        "tag_networkx": { "en": "NetworkX", "it": "NetworkX", "fr": "NetworkX" },
        "tag_graphviz": { "en": "Graphviz", "it": "Graphviz", "fr": "Graphviz" },
        /*
        "tab_ecommerce": { "en": "E-commerce Infrastructure Analysis", "it": "Analisi Infrastruttura E-commerce", "fr": "Analyse d'Infrastructure E-commerce" },
        "tab_portfolio_backend": { "en": "Portfolio Backend Development", "it": "Sviluppo Backend del Portfolio", "fr": "Développement Backend du Portfolio" },
        "tab_nlp": { "en": "NLP with BERT", "it": "NLP con BERT", "fr": "NLP avec BERT" },
        "tab_python": { "en": "Python Projects", "it": "Progetti Python", "fr": "Projets Python" },
        "tab_game": { "en": "Snake Game", "it": "Gioco Snake", "fr": "Jeu du Serpent" },

        "ecommerce_h3": { "en": "E-commerce Cloud Infrastructure Analysis and Optimization", "it": "Analisi e Ottimizzazione di Infrastruttura Cloud per E-commerce", "fr": "Analyse et Optimisation d'Infrastructure Cloud pour E-commerce" },
        "ecommerce_p": { "en": "An in-depth analysis of an e-commerce infrastructure on AWS, aimed at improving performance, scalability, and costs. The project included reviewing the architecture, identifying bottlenecks, and proposing optimized solutions.", "it": "Un'analisi approfondita di un'infrastruttura e-commerce su AWS, finalizzata a migliorare performance, scalabilità e costi. Il progetto ha incluso la revisione dell'architettura, l'identificazione di colli di bottiglia e la proposta di soluzioni ottimizzate.", "fr": "Une analyse approfondie d'une infrastructure e-commerce sur AWS, visant à améliorer les performances, la scalabilité et les coûts. Le projet comprenait la revue de l'architecture, l'identification des goulots d'étranglement et la proposition de solutions optimisées." },
        "ecommerce_btn": { "en": "Project Details", "it": "Dettagli del Progetto", "fr": "Détails du Projet" },
        
        "nlp_h3": { "en": "Sentiment Analysis System with BERT", "it": "Sistema di Analisi del Sentimento con BERT", "fr": "Système d'Analyse de Sentiments avec BERT" },
        "nlp_p": { "en": "Development of a Natural Language Processing system for sentiment analysis of product reviews. The model, based on BERT, was trained and fine-tuned to classify text with high accuracy, supporting strategic business decisions.", "it": "Sviluppo di un sistema di Natural Language Processing per l'analisi del sentimento di recensioni di prodotti. Il modello, basato su BERT, è stato addestrato e fine-tuned per classificare il testo con alta precisione, supportando decisioni di business strategiche.", "fr": "Développement d'un système de Traitement du Langage Naturel pour l'analyse des sentiments des avis sur les produits. Le modèle, basé sur BERT, a été entraîné et affiné pour classer le texte avec une grande précision, soutenant les décisions commerciales stratégiques." },
        "nlp_btn": { "en": "Project Details", "it": "Dettagli del Progetto", "fr": "Détails du Projet" },

        "py_subtab_tasklist": { "en": "Task List", "it": "Task List", "fr": "Liste de Tâches" },
        "py_subtab_ai_agent": { "en": "AI Agent", "it": "AI Agent", "fr": "Agent IA" },
        "py_tasklist_h3": { "en": "Task List Application", "it": "Applicazione Task List", "fr": "Application de Liste de Tâches" },
        "py_tasklist_p": { "en": "A simple Python application for managing tasks. This project is currently under development.", "it": "Una semplice applicazione in Python per la gestione delle attività. Questo progetto è attualmente in fase di sviluppo.", "fr": "Une simple application Python pour gérer les tâches. Ce projet est actuellement en cours de développement." },
        "py_ai_agent_h3": { "en": "AI Agent with OLLAMA and Langchain", "it": "AI Agent con OLLAMA e Langchain", "fr": "Agent IA avec OLLAMA et Langchain" },
        "py_ai_agent_p": { "en": "An AI agent scaffolding project using OLLAMA and Langchain for local model interaction. This project is currently under development.", "it": "Un progetto di scaffolding per un agente AI che utilizza OLLAMA e Langchain per l'interazione con modelli locali. Questo progetto è attualmente in fase di sviluppo.", "fr": "Un projet de base pour un agent IA utilisant OLLAMA et Langchain pour interagir avec des modèles locaux. Ce projet est en cours de développement." },
        
        "game_h3": { "en": "Snake Game", "it": "Gioco Snake", "fr": "Jeu du Serpent" },
        "game_p": { "en": "A simple implementation of the classic Snake game, created with HTML5 Canvas and JavaScript. A small project for fun and to refresh the basics of game logic.", "it": "Una semplice implementazione del classico gioco Snake, realizzato con HTML5 Canvas e JavaScript. Un piccolo progetto per divertimento e per rinfrescare le basi della logica di gioco.", "fr": "Une implémentation simple du jeu classique Snake, créée avec HTML5 Canvas et JavaScript. Un petit projet pour s'amuser et rafraîchir les bases de la logique de jeu." },
        "game_btn": { "en": "Play Game", "it": "Gioca", "fr": "Jouer" }
        */
    },
    "project_portfolio_backend": {
        "title": { "en": "Project: Portfolio Backend - Paolo Alborno", "it": "Progetto: Backend del Portfolio - Paolo Alborno", "fr": "Projet: Backend du Portfolio - Paolo Alborno" },
        "meta_description": { "en": "Details of the portfolio's backend development project with Java Spring Boot, JWT, and Firebase.", "it": "Dettagli del progetto di sviluppo del backend del portfolio con Java Spring Boot, JWT e Firebase.", "fr": "Détails du projet de développement du backend du portfolio avec Java Spring Boot, JWT et Firebase." },
        "h2": { "en": "Portfolio Backend Development", "it": "Sviluppo Backend del Portfolio", "fr": "Développement Backend du Portfolio" },
        "section_subtitle": { "en": "Authentication, authorization, and security with Java Spring Boot.", "it": "Autenticazione, autorizzazione e sicurezza con Java Spring Boot.", "fr": "Authentification, autorisation et sécurité avec Java Spring Boot." },
        "goal_h3": { "en": "Project Goal", "it": "Obiettivo del Progetto", "fr": "Objectif du Projet" },
        "goal_p": { "en": "This project demonstrates my mastery in developing a backend based on Java Spring Boot, with a focus on role-based user authentication and authorization, for example for advanced or administrative content.", "it": "Il progetto dimostra la mia padronanza nello sviluppo di un backend basato su Java Spring Boot, con particolare attenzione a autenticazione e autorizzazione di utenti in base al ruolo, ad esempio per contenuti avanzati o di amministrazione.", "fr": "Ce projet démontre ma maîtrise dans le développement d'un backend basé sur Java Spring Boot, avec un accent particulier sur l'authentification et l'autorisation des utilisateurs basées sur les rôles, par exemple pour du contenu avancé ou administratif." },
        "solution_h3": { "en": "My Solution", "it": "La Mia Soluzione", "fr": "Ma Solution" },
        "solution_p1": { "en": "I chose to implement a system based on multiple JWTs, following the OAuth 2.0 standard, and using Google's Firebase as an Identity Provider, by registering the project and enabling login via GitHub accounts.", "it": "Ho scelto di implementare un sistema basato su JWT multipli, seguendo lo standard OAuth 2.0, e utilizzando Firebase di Google come Identity Provider, registrando il progetto e abilitando il login tramite account GitHub.", "fr": "J'ai choisi de mettre en œuvre un système basé sur plusieurs JWT, suivant la norme OAuth 2.0, et utilisant Firebase de Google comme fournisseur d'identité, en enregistrant le projet et en activant la connexion via les comptes GitHub." },
        "solution_p2": { "en": "On the frontend, the user logs in via Firebase Authentication. At the end of the OAuth flow, Firebase returns a signed JWT, which represents the user's verified identity. This token is sent to the backend (hosted on Render), which is responsible for verifying its validity: it checks the digital signature, the expiration, and that the token actually comes from Firebase. In this way, the backend can securely confirm that the user is correctly authenticated and that the associated GitHub account matches the one registered in the system.", "it": "Sul frontend, l’utente effettua il login tramite Firebase Authentication. Al termine del flusso OAuth, Firebase restituisce un JWT firmato, che rappresenta l’identità verificata dell’utente. Questo token viene inviato al backend (hostato su Render), che si occupa di verificarne la validità: controlla la firma digitale, la scadenza e che il token provenga effettivamente da Firebase. In questo modo il backend può confermare in modo sicuro che l’utente sia autenticato correttamente e che l’account GitHub associato corrisponda a quello registrato nel sistema.", "fr": "Côté frontend, l'utilisateur se connecte via l'authentification Firebase. À la fin du flux OAuth, Firebase renvoie un JWT signé, qui représente l'identité vérifiée de l'utilisateur. Ce jeton est envoyé au backend (hébergé sur Render), qui se charge de vérifier sa validité : il contrôle la signature numérique, la date d'expiration et que le jeton provient bien de Firebase. De cette manière, le backend peut confirmer en toute sécurité que l'utilisateur est correctement authentifié et que le compte GitHub associé correspond à celui enregistré dans le système." },
        "solution_p3": { "en": "The backend, after validating the Firebase token, queries a PostgreSQL database (also on Render) to retrieve user information and verify the role. If the role is appropriate (ADMIN), the backend generates a lightweight custom JWT, containing only the necessary information to authorize subsequent API calls, and returns it to the frontend via an HTTPS cookie.", "it": "Il backend, dopo aver validato il token Firebase, interroga un database PostgreSQL (anche esso su Render) per recuperare le informazioni relative all’utente e verificare il ruolo. Se il ruolo è appropriato (ADMIN), il backend genera un JWT-custom leggero, contenente solo le informazioni necessarie per autorizzare le chiamate successive alle API, e lo restituisce al frontend tramite HTTPS cookie.", "fr": "Le backend, après avoir validé le jeton Firebase, interroge une base de données PostgreSQL (également sur Render) pour récupérer les informations relatives à l'utilisateur et vérifier le rôle. Si le rôle est approprié (ADMIN), le backend génère un JWT personnalisé léger, ne contenant que les informations nécessaires pour autoriser les appels API ultérieurs, et le renvoie au frontend via un cookie HTTPS." },
        "solution_p4": { "en": "From that moment on, the user remains authenticated and authorized until logout or token expiration, and the custom JWT is verified with every call to protected APIs. This approach keeps the system stateless (which does not break REST), secure, and easily extensible, clearly separating authentication (identity provider) and authorization (roles and resource access).", "it": "Da quel momento, l’utente rimane autenticato e autorizzato fino al logout o alla scadenza del token, e il JWT-custom viene verificato ad ogni chiamata alle API protette. Questo approccio mantiene il sistema stateless (che non rompe REST), sicuro e facilmente estendibile, separando chiaramente autenticazione (identity provider) e autorizzazione (ruoli e accesso alle risorse).", "fr": "À partir de ce moment, l'utilisateur reste authentifié et autorisé jusqu'à la déconnexion ou l'expiration du jeton, et le JWT personnalisé est vérifié à chaque appel aux API protégées. Cette approche maintient le système sans état (ce qui ne rompt pas REST), sécurisé et facilement extensible, en séparant clairement l'authentification (fournisseur d'identité) et l'autorisation (rôles et accès aux ressources)." }
    },
    "project_sql_toolkit": {
        "title": { "en": "Project: SQL Reverse Engineering Toolkit - Paolo Alborno", "it": "Progetto: SQL Reverse Engineering Toolkit - Paolo Alborno", "fr": "Projet: SQL Reverse Engineering Toolkit - Paolo Alborno" },
        "meta_description": { "en": "Details of the SQL Reverse Engineering Toolkit project for analyzing and visualizing data lineage in MySQL.", "it": "Dettagli del progetto SQL Reverse Engineering Toolkit per l'analisi e la visualizzazione della data lineage in MySQL.", "fr": "Détails du projet SQL Reverse Engineering Toolkit pour l'analyse et la visualisation de la lignée des données dans MySQL." },
        "h2": { "en": "SQL Reverse Engineering Toolkit", "it": "SQL Reverse Engineering Toolkit", "fr": "SQL Reverse Engineering Toolkit" },
        "section_subtitle": { "en": "Analyze and visualize data lineage in a MySQL database.", "it": "Analizza e visualizza la data lineage in un database MySQL.", "fr": "Analysez et visualisez la lignée des données dans une base de données MySQL." },
        "goal_h3": { "en": "Project Goal", "it": "Obiettivo del Progetto", "fr": "Objectif du Projet" },
        "goal_p": { "en": "This SQL Reverse Engineering Toolkit is a command-line application designed to analyze and visualize data lineage in a MySQL database. It extracts stored procedures and table schemas, parses them to identify dependencies (which procedures read from or write to which tables), and generates an interactive dependency graph. This tool is ideal for understanding complex database logic, refactoring legacy code, and documenting data workflows.", "it": "Questo SQL Reverse Engineering Toolkit è un'applicazione a riga di comando progettata per analizzare e visualizzare la data lineage in un database MySQL. Estrae stored procedure e schemi di tabelle, li analizza per identificare le dipendenze (quali procedure leggono o scrivono su quali tabelle) e genera un grafo di dipendenza interattivo. Questo strumento è ideale per comprendere logiche di database complesse, effettuare il refactoring di codice legacy e documentare i flussi di dati.", "fr": "Cet Outil de Rétro-ingénierie SQL est une application en ligne de commande conçue pour analyser et visualiser la lignée des données dans une base de données MySQL. Il extrait les procédures stockées et les schémas de table, les analyse pour identifier les dépendances (quelles procédures lisent ou écrivent dans quelles tables) et génère un graphe de dépendances interactif. Cet outil est idéal pour comprendre la logique complexe des bases de données, remanier du code hérité et documenter les flux de données." },
        "features_h3": { "en": "Features", "it": "Caratteristiche", "fr": "Fonctionnalités" },
        "features_li1": { "en": "<strong>Database Extraction:</strong> Extracts CREATE TABLE statements and stored procedure definitions from a MySQL database.", "it": "<strong>Estrazione dal Database:</strong> Estrae le istruzioni CREATE TABLE e le definizioni delle stored procedure da un database MySQL.", "fr": "<strong>Extraction de base de données :</strong> Extrait les instructions CREATE TABLE et les définitions de procédures stockées d'une base de données MySQL." },
        "features_li2": { "en": "<strong>SQL Parsing:</strong> Parses SQL code to identify read and write operations, establishing lineage between tables and procedures.", "it": "<strong>Parsing SQL:</strong> Analizza il codice SQL per identificare le operazioni di lettura e scrittura, stabilendo la lineage tra tabelle e procedure.", "fr": "<strong>Analyse SQL :</strong> Analyse le code SQL pour identifier les opérations de lecture et d'écriture, établissant la lignée entre les tables et les procédures." },
        "features_li3": { "en": "<strong>Graph Visualization:</strong> Generates a graphviz diagram to visualize the data flow and dependencies.", "it": "<strong>Visualizzazione a Grafo:</strong> Genera un diagramma graphviz per visualizzare il flusso di dati e le dipendenze.", "fr": "<strong>Visualisation de graphe :</strong> Génère un diagramma graphviz pour visualiser le flux de données et les dépendances." },
        "features_li4": { "en": "<strong>Materialized Views:</strong> Includes functionality to create and manage materialized views for data summarization.", "it": "<strong>Viste Materializzate:</strong> Include funzionalità per creare e gestire viste materializzate per la riepilogazione dei dati.", "fr": "<strong>Vues matérialisées :</strong> Comprend des fonctionnalités pour créer et gérer des vues matérialisées pour la synthèse des données." },
        "features_li5": { "en": "<strong>Command-Line Interface:</strong> Provides a simple CLI to run the extraction, parsing, and visualization steps individually or as a complete pipeline.", "it": "<strong>Interfaccia a Riga di Comando:</strong> Fornisce una semplice CLI per eseguire i passaggi di estrazione, parsing e visualizzazione singolarmente o come pipeline completa.", "fr": "<strong>Interface en ligne de commande :</strong> Fournit une CLI simple pour exécuter les étapes d'extraction, d'analyse et de visualisation individuellement ou en tant que pipeline complet." },
        "tech_h3": { "en": "Technologies Used", "it": "Tecnologie Utilizzate", "fr": "Technologies Utilisées" },
        "tech_li_python": { "en": "<strong>Python:</strong> The core language for the application.", "it": "<strong>Python:</strong> Il linguaggio principale dell'applicazione.", "fr": "<strong>Python :</strong> Le langage principal de l'application." },
        "tech_li_mysql": { "en": "<strong>MySQL:</strong> The target database for extraction and analysis.", "it": "<strong>MySQL:</strong> Il database di destinazione per l'estrazione e l'analisi.", "fr": "<strong>MySQL :</strong> La base de données cible pour l'extraction et l'analyse." },
        "tech_li_mysql_conn": { "en": "<strong>mysql-connector-python:</strong> For connecting to the MySQL database.", "it": "<strong>mysql-connector-python:</strong> Per la connessione al database MySQL.", "fr": "<strong>mysql-connector-python :</strong> Pour se connecter à la base de données MySQL." },
        "tech_li_networkx": { "en": "<strong>networkx:</strong> For building the dependency graph.", "it": "<strong>networkx:</strong> Per la costruzione del grafo di dipendenze.", "fr": "<strong>networkx :</strong> Pour construire le graphe de dépendances." },
        "tech_li_graphviz": { "en": "<strong>graphviz:</strong> For rendering the dependency graph.", "it": "<strong>graphviz:</strong> Per il rendering del grafo di dipendenze.", "fr": "<strong>graphviz :</strong> Pour le rendu du graphe de dépendances." },
        "tech_li_dotenv": { "en": "<strong>python-dotenv:</strong> For managing environment variables.", "it": "<strong>python-dotenv:</strong> Per la gestione delle variabili d'ambiente.", "fr": "<strong>python-dotenv :</strong> Pour gérer les variables d'environnement." },
        "bpractices_h3": { "en": "Software Engineering Principles", "it": "Principi di Ingegneria del Software", "fr": "Principes de Génie Logiciel" },
        "bpractices_li1": { "en": "<strong>Modularity and Separation of Concerns:</strong> The application is divided into distinct modules (extractor, parser, graph_utils, materializer), each with a specific responsibility. This makes the code easier to understand, maintain, and extend.", "it": "<strong>Modularità e Separazione delle Competenze:</strong> L'applicazione è suddivisa in moduli distinti (extractor, parser, graph_utils, materializer), ognuno con una responsabilità specifica. Questo rende il codice più facile da capire, mantenere ed estendere.", "fr": "<strong>Modularité et séparation des préoccupations :</strong> L'application est divisée en modules distincts (extracteur, analyseur, graph_utils, matérialiseur), chacun ayant une responsabilité spécifique. Cela rend le code plus facile à comprendre, à maintenir et à étendre." },
        "bpractices_li2": { "en": "<strong>Clear and Well-Documented Code:</strong> The code is written with clear, descriptive names and includes docstrings to explain the purpose of each module and function.", "it": "<strong>Codice Chiaro e Ben Documentato:</strong> Il codice è scritto con nomi chiari e descrittivi e include docstring per spiegare lo scopo di ogni modulo e funzione.", "fr": "<strong>Code clair et bien documenté :</strong> Le code est écrit avec des noms clairs et descriptifs et comprend des docstrings pour expliquer le but de chaque module et fonction." },
        "bpractices_li3": { "en": "<strong>Configuration Management:</strong> Database credentials and other settings are managed through environment variables (.env file), separating configuration from code and enhancing security.", "it": "<strong>Gestione della Configurazione:</strong> Le credenziali del database e altre impostazioni sono gestite tramite variabili d'ambiente (file .env), separando la configurazione dal codice e migliorando la sicurezza.", "fr": "<strong>Gestion de la configuration :</strong> Les informations d'identification de la base de données et d'autres paramètres sont gérés via des variables d'environnement (fichier .env), séparant la configuration du code et améliorant la sécurité." },
        "bpractices_li4": { "en": "<strong>Error Handling:</strong> The code includes error handling to gracefully manage potential issues, such as database connection failures.", "it": "<strong>Gestione degli Errori:</strong> Il codice include la gestione degli errori per gestire con eleganza potenziali problemi, come i fallimenti della connessione al database.", "fr": "<strong>Gestion des erreurs :</strong> Le code inclut une gestion des erreurs pour gérer avec élégance les problèmes potentiels, tels que les échecs de connexion à la base de données." },
        "bpractices_li5": { "en": "<strong>Command-Line Interface:</strong> The use of argparse provides a user-friendly CLI, making the tool accessible and scriptable.", "it": "<strong>Interfaccia a Riga di Comando:</strong> L'uso di argparse fornisce una CLI user-friendly, rendendo lo strumento accessibile e scriptabile.", "fr": "<strong>Interface en ligne de commande :</strong> L'utilisation d'argparse fournit une CLI conviviale, rendant l'outil accessible et scriptable." }
    },
    "contact": {
        "title": { "en": "Contact Me - Paolo Alborno", "it": "Contattami - Paolo Alborno", "fr": "Contactez-moi - Paolo Alborno" },
        "meta_description": { "en": "Contact Paolo Alborno for collaborations, projects, or job opportunities.", "it": "Contatta Paolo Alborno per collaborazioni, progetti o opportunità di lavoro.", "fr": "Contactez Paolo Alborno pour des collaborations, des projets ou des opportunités d'emploi." },
        "h2": { "en": "Contact Me", "it": "Contattami", "fr": "Contactez-moi" },
        "section_subtitle": { "en": "I am available for new opportunities and collaborations. Write me to discuss a project or just to say hello.", "it": "Sono disponibile per nuove opportunità e collaborazioni. Scrivimi per discutere di un progetto o semplicemente per un saluto.", "fr": "Je suis disponible pour de nouvelles opportunités et collaborations. Écrivez-moi pour discuter d'un projet ou simplement pour dire bonjour." },
        "label_name": { "en": "Name", "it": "Nome", "fr": "Nom" },
        "label_email": { "en": "Email", "it": "Email", "fr": "Email" },
        "label_subject": { "en": "Subject", "it": "Oggetto", "fr": "Sujet" },
        "label_message": { "en": "Message", "it": "Messaggio", "fr": "Message" },
        "btn_send": { "en": "Send Message", "it": "Invia Messaggio", "fr": "Envoyer le Message" }
    },
    "hobbies": {
        "title": { "en": "Paolo - Hobbies", "it": "Paolo - Hobby", "fr": "Paolo - Loisirs" },
        "h1": { "en": "My Hobbies", "it": "I Miei Hobby", "fr": "Mes Loisirs" },
        "section_subtitle": { "en": "A collection of my passions and interests outside of the technology world.", "it": "Una collezione delle mie passioni e interessi al di fuori del mondo della tecnologia.", "fr": "Une collection de mes passions et intérêts en dehors du monde de la technologie." },
        "gallery_h3": { "en": "Photo Gallery", "it": "Galleria Fotografica", "fr": "Galerie de Photos" },
        "gallery_p": { "en": "A small collection of moments and places that have inspired me. Click below to explore the gallery.", "it": "Una piccola collezione di momenti e luoghi che mi hanno ispirato. Clicca qui sotto per esplorare la galleria.", "fr": "Une petite collection de moments et de lieux qui m'ont inspiré. Cliquez ci-dessous pour explorer la galerie." },
        "gallery_btn": { "en": "Go to Gallery", "it": "Vai alla Galleria", "fr": "Aller à la Galerie" },
        "passions_h3": { "en": "My Passions", "it": "Le Mie Passioni", "fr": "Mes Passions" },
        "passions_p": { "en": "I am passionate about travel, photography, and trekking. These interests help me maintain a balance between my professional and personal life, and find inspiration in unexpected places.", "it": "Sono un appassionato di viaggi, fotografia e trekking. Questi interessi mi aiutano a mantenere un equilibrio tra vita professionale e personale, e a trovare ispirazione in luoghi inaspettati.", "fr": "Je suis passionné de voyages, de photographie et de trekking. Ces intérêts m'aident à maintenir un équilibre entre ma vie professionnelle et personnelle, et à trouver l'inspiration dans des endroits inattendus." },
        "trekking_h3": { "en": "Trekking", "it": "Trekking", "fr": "Randonnée" },
        "trekking_p": { "en": "Exploring nature and mountains is one of my greatest passions. Every trail is an adventure.", "it": "Esplorare la natura e le montagne è una delle mie più grandi passioni. Ogni sentiero è un'avventura.", "fr": "Explorer la nature et les montagnes est une de mes plus grandes passions. Chaque sentier est une aventure." }
    },
    "gallery": {
        "title": { "en": "Gallery - Paolo Alborno", "it": "Galleria - Paolo Alborno", "fr": "Galerie - Paolo Alborno" },
        "h2": { "en": "Photo Gallery", "it": "Galleria Fotografica", "fr": "Galerie de Photos" },
        "section_subtitle": { "en": "A small collection of moments and places that have inspired me.", "it": "Una piccola collezione di momenti e luoghi che mi hanno ispirato.", "fr": "Une petite collection de moments et de lieux qui m'ont inspiré." }
    },
    "game": {
        "title": { "en": "Paolo - Game", "it": "Paolo - Gioco", "fr": "Paolo - Jeu" },
        "h1": { "en": "Snake", "it": "Snake", "fr": "Serpent" },
        "section_subtitle": { "en": "A little game to pass the time. Use the arrow keys to move.", "it": "Un piccolo gioco per passare il tempo. Usa i tasti freccia per muoverti.", "fr": "Un petit jeu pour passer le temps. Utilisez les touches fléchées pour vous déplacer." }
    },
    "python_projects": {
        "title": { "en": "Python Snippets - Paolo Alborno", "it": "Python Snippets - Paolo Alborno", "fr": "Extraits Python - Paolo Alborno" },
        "h2": { "en": "Python Code Snippets", "it": "Python Code Snippets", "fr": "Extraits de Code Python" },
        "section_subtitle": { "en": "A collection of code examples and small scripts I have written.", "it": "Una raccolta di esempi di codice e piccoli script che ho scritto.", "fr": "Une collection d'exemples de code et de petits scripts que j'ai écrits." },
        "example1_h3": { "en": "Example 1: Data Cleaning with Pandas", "it": "Esempio 1: Data Cleaning con Pandas", "fr": "Exemple 1: Nettoyage de Données avec Pandas" },
        "example2_h3": { "en": "Example 2: Simple API Call", "it": "Esempio 2: Chiamata API Semplice", "fr": "Exemple 2: Appel API Simple" }
    },
    "backlog": {
        "title": { "en": "My Backlog", "it": "Il Mio Backlog", "fr": "Mon Backlog" },
        "status_learning": { "en": "Learning", "it": "Learning", "fr": "En Apprentissage" },
        "status_in_progress": { "en": "In Progress", "it": "In Corso", "fr": "En Cours" },
        "status_completed": { "en": "Completed", "it": "Completato", "fr": "Terminé" },
        "type_tech": { "en": "Tech", "it": "Tech", "fr": "Tech" },
        "type_project": { "en": "Project", "it": "Project", "fr": "Projet" },
        "type_course": { "en": "Course", "it": "Corso", "fr": "Cours" },
        "project_link": { "en": "View Project", "it": "Vedi Progetto", "fr": "Voir le Projet" },

        "devops_essentials_title": { "en": "DevOps Essentials for Data Engineering", "it": "DevOps Essentials for Data Engineering", "fr": "DevOps Essentials for Data Engineering" },
        "devops_essentials_desc": { "en": "A course by Databricks Academy.", "it": "Un corso di Databricks Academy.", "fr": "Un cours de Databricks Academy." },
        "dates_sep_oct_2025": { "en": "Sep 2025 - Oct 2025", "it": "Set 2025 - Ott 2025", "fr": "Sep 2025 - Oct 2025" },

        "langchain_title": { "en": "LangChain, Ollama & LLMs", "it": "LangChain, Ollama & LLMs", "fr": "LangChain, Ollama & LLMs" },
        "dates_aug_oct": { "en": "Aug 2025 - Oct 2025", "it": "Ago 2025 - Ott 2025", "fr": "Aoû 2025 - Oct 2025" },

        "sql_toolkit_title": { "en": "SQL Reverse Engineering Toolkit", "it": "SQL Reverse Engineering Toolkit", "fr": "SQL Reverse Engineering Toolkit" },
        "sql_toolkit_description": { "en": "A command-line tool to analyze and visualize data lineage in a MySQL database.", "it": "Un tool a riga di comando per analizzare e visualizzare la data lineage in un database MySQL.", "fr": "Un outil en ligne de commande pour analyser et visualiser la lignée des données dans une base de données MySQL." },
        "dates_sep_13_27": { "en": "Sep 2025", "it": "Set 2025", "fr": "Sep 2025" },

        "portfolio_title": { "en": "Portfolio Website", "it": "Portfolio Website", "fr": "Site Portfolio" },
        "portfolio_description": { "en": "My personal portfolio website, the one you are currently browsing, built with vanilla JavaScript, HTML, and CSS.", "it": "Il mio sito portfolio personale, quello che stai attualmente navigando, costruito con JavaScript vanilla, HTML e CSS.", "fr": "Mon site portfolio personnel, celui que vous consultez actuellement, construit avec JavaScript vanilla, HTML et CSS." },
        "dates_jul_sep": { "en": "Jul 2025 - Sep 2025", "it": "Lug 2025 - Set 2025", "fr": "Jui 2025 - Sep 2025" },

        "portfolio_backend_title": { "en": "Portfolio Backend with OAuth", "it": "Portfolio Backend con OAuth", "fr": "Portfolio Backend avec OAuth" },
        "portfolio_backend_description": { "en": "A robust backend built with Spring Boot and Docker, featuring Firebase OAuth for authentication and PostgreSQL for data storage, deployed on Render.", "it": "Un backend robusto realizzato con Spring Boot e Docker, dotato di autenticazione OAuth tramite Firebase e archiviazione dati su PostgreSQL, deployato su Render.", "fr": "Un backend robuste construit avec Spring Boot et Docker, avec authentification Firebase OAuth et stockage de données PostgreSQL, déployé sur Render." }
    },
    "project_ecommerce": {
        "title": { "en": "Project: E-commerce Infrastructure Analysis - Paolo Alborno", "it": "Progetto: Analisi Infrastruttura E-commerce - Paolo Alborno", "fr": "Projet: Analyse d'Infrastructure E-commerce - Paolo Alborno" },
        "meta_description": { "en": "Details of the project for analyzing and optimizing an e-commerce cloud infrastructure on AWS.", "it": "Dettagli del progetto di analisi e ottimizzazione di un'infrastruttura cloud per e-commerce su AWS.", "fr": "Détails du projet d'analyse et d'optimisation d'une infrastructure cloud e-commerce sur AWS." },
        "h2": { "en": "E-commerce Infrastructure Analysis", "it": "Analisi Infrastruttura E-commerce", "fr": "Analyse d'Infrastructure E-commerce" },
        "section_subtitle": { "en": "Optimizing performance, scalability, and costs on AWS.", "it": "Ottimizzazione di performance, scalabilità e costi su AWS.", "fr": "Optimisation des performances, de la scalabilité et des coûts sur AWS." },
        "goal_h3": { "en": "Project Goal", "it": "Obiettivo del Progetto", "fr": "Objectif du Projet" },
        "goal_p": { "en": "The main objective was to analyze the cloud infrastructure of a medium-sized e-commerce platform to identify areas for improvement. The key metrics were page load time, the ability to handle traffic spikes during promotional campaigns, and the optimization of operational costs on AWS.", "it": "L'obiettivo principale era analizzare l'infrastruttura cloud di una piattaforma e-commerce di medie dimensioni per identificare aree di miglioramento. Le metriche chiave erano il tempo di caricamento delle pagine, la capacità di gestire picchi di traffico durante le campagne promozionali e l'ottimizzazione dei costi operativi su AWS.", "fr": "L'objectif principal était d'analyser l'infrastructure cloud d'une plateforme e-commerce de taille moyenne pour identifier les domaines d'amélioration. Les indicateurs clés étaient le temps de chargement des pages, la capacité à gérer les pics de trafic lors des campagnes promotionnelles et l'optimisation des coûts opérationnels sur AWS." },
        "solution_h3": { "en": "My Solution", "it": "La Mia Soluzione", "fr": "Ma Solution" },
        "solution_p": { "en": "I conducted a complete architectural analysis, using tools like AWS Cost Explorer, CloudWatch, and X-Ray. I identified that the database was a bottleneck and that the use of EC2 instances was not optimized. My proposal included:", "it": "Ho condotto un'analisi architetturale completa, utilizzando strumenti come AWS Cost Explorer, CloudWatch e X-Ray. Ho identificato che il database era un collo di bottiglia e che l'uso delle istanze EC2 non era ottimizzato. La mia proposta ha incluso:", "fr": "J'ai effectué une analyse architecturale complète, en utilisant des outils comme AWS Cost Explorer, CloudWatch et X-Ray. J'ai identifié que la base de données était un goulot d'étranglement et que l'utilisation des instances EC2 n'était pas optimisée. Ma proposition incluait :" },
        "solution_li1": { "en": "Migration of the database to an Amazon Aurora instance with read replicas to improve read scalability.", "it": "Migrazione del database a un'istanza Amazon Aurora con read replicas per migliorare la scalabilità in lettura.", "fr": "Migration de la base de données vers une instance Amazon Aurora avec des réplicas en lecture pour améliorer la scalabilité en lecture." },
        "solution_li2": { "en": "Implementation of an Auto Scaling strategy for EC2 instances to dynamically adapt to the load.", "it": "Implementazione di una strategia di Auto Scaling per le istanze EC2, per adattarsi dinamicamente al carico.", "fr": "Mise en œuvre d'une stratégie d'Auto Scaling pour les instances EC2 afin de s'adapter dynamiquement à la charge." },
        "solution_li3": { "en": "Use of a CDN (Amazon CloudFront) to serve static content and reduce latency for end users.", "it": "Utilizzo di una CDN (Amazon CloudFront) per servire i contenuti statici e ridurre la latenza per gli utenti finali.", "fr": "Utilisation d'un CDN (Amazon CloudFront) pour servir le contenu statique et réduire la latence pour les utilisateurs finaux." },
        "solution_li4": { "en": "Introduction of a caching system with ElastiCache (Redis) for the most frequent queries.", "it": "Introduzione di un sistema di caching con ElastiCache (Redis) per le query più frequenti.", "fr": "Introduction d'un système de mise en cache avec ElastiCache (Redis) pour les requêtes les plus fréquentes." },
        "results_h3": { "en": "Results", "it": "Risultati", "fr": "Résultats" },
        "results_p": { "en": "The implemented changes led to a 35% reduction in average page load time, a 200% increase in the capacity to handle concurrent users, and a 22% reduction in monthly AWS costs thanks to more efficient use of resources.", "it": "Le modifiche implementate hanno portato a una riduzione del 35% del tempo di caricamento medio delle pagine, a un aumento della capacità di gestire utenti concorrenti del 200% e a una riduzione dei costi mensili di AWS del 22% grazie a un uso più efficiente delle risorse.", "fr": "Les modifications mises en œuvre ont entraîné une réduction de 35% du temps de chargement moyen des pages, une augmentation de 200% de la capacité à gérer les utilisateurs simultanés et une réduction de 22% des coûts mensuels d'AWS grâce à une utilisation plus efficace des ressources." }
    },
    "project_nlp": {
        "title": { "en": "Project: Sentiment Analysis System with BERT - Paolo Alborno", "it": "Progetto: Sistema di Analisi del Sentimento con BERT - Paolo Alborno", "fr": "Projet: Système d'Analyse de Sentiments avec BERT - Paolo Alborno" },
        "meta_description": { "en": "Details of the project for developing an NLP system for sentiment analysis based on BERT.", "it": "Dettagli del progetto di sviluppo di un sistema di NLP per l'analisi del sentimento basato su BERT.", "fr": "Détails du projet de développement d'un système NLP pour l'analyse des sentiments basé sur BERT." },
        "h2": { "en": "Sentiment Analysis System with BERT", "it": "Sistema di Analisi del Sentimento con BERT", "fr": "Système d'Analyse de Sentiments avec BERT" },
        "section_subtitle": { "en": "Applying Natural Language Processing for business insights.", "it": "Applicazione del Natural Language Processing per insight di business.", "fr": "Application du Traitement du Langage Naturel pour des informations commerciales." },
        "goal_h3": { "en": "Project Goal", "it": "Obiettivo del Progetto", "fr": "Objectif du Projet" },
        "goal_p": { "en": "The goal was to develop a machine learning model capable of analyzing large volumes of product reviews and accurately classifying them as positive, negative, or neutral. This tool was intended to provide the marketing team with actionable insights to improve products and communication.", "it": "L'obiettivo era sviluppare un modello di machine learning capace di analizzare grandi volumi di recensioni di prodotti e classificarle accuratamente come positive, negative o neutre. Questo strumento doveva fornire al team di marketing insight azionabili per migliorare i prodotti e la comunicazione.", "fr": "L'objectif était de développer un modèle d'apprentissage automatique capable d'analyser de grands volumes d'avis sur les produits et de les classer avec précision comme positifs, négatifs ou neutres. Cet outil visait à fournir à l'équipe marketing des informations exploitables pour améliorer les produits et la communication." },
        "solution_h3": { "en": "My Solution", "it": "La Mia Soluzione", "fr": "Ma Solution" },
        "solution_p": { "en": "I designed and implemented a complete NLP pipeline. The core of the system is a model based on BERT (Bidirectional Encoder Representations from Transformers), which I fine-tuned on a specific dataset of reviews from the domain of interest. The solution included:", "it": "Ho progettato e implementato una pipeline di NLP completa. Il cuore del sistema è un modello basato su BERT (Bidirectional Encoder Representations from Transformers), che ho fine-tuned su un dataset specifico di recensioni del dominio di interesse. La soluzione includeva:", "fr": "J'ai conçu et mis en œuvre un pipeline NLP complet. Le cœur du système est un modèle basé sur BERT (Bidirectional Encoder Representations from Transformers), que j'ai affiné sur un ensemble de données spécifique d'avis du domaine d'intérêt. La solution comprenait :" },
        "solution_li1": { "en": "Preprocessing of textual data to clean and normalize the text.", "it": "Preprocessing dei dati testuali per pulire e normalizzare il testo.", "fr": "Prétraitement des données textuelles pour nettoyer et normaliser le texte." },
        "solution_li2": { "en": "Fine-tuning of the pre-trained BERT model for the sentiment classification task.", "it": "Fine-tuning del modello BERT pre-addestrato per il compito di classificazione del sentimento.", "fr": "Affinage du modèle BERT pré-entraîné pour la tâche de classification des sentiments." },
        "solution_li3": { "en": "Development of a RESTful API with FastAPI to expose the model and allow real-time text analysis.", "it": "Sviluppo di un'API RESTful con FastAPI per esporre il modello e permettere l'analisi del testo in tempo reale.", "fr": "Développement d'une API RESTful avec FastAPI pour exposer le modèle et permettre l'analyse de texte en temps réel." },
        "solution_li4": { "en": "Containerization of the application with Docker to ensure portability and easy deployment.", "it": "Containerizzazione dell'applicazione con Docker per garantire la portabilità e una facile messa in produzione.", "fr": "Conteneurisation de l'application avec Docker pour assurer la portabilité et un déploiement facile." },
        "solution_li5": { "en": "Creation of an interactive dashboard to visualize the analysis results.", "it": "Creazione di una dashboard interattiva per visualizzare i risultati dell'analisi.", "fr": "Création d'un tableau de bord interactif pour visualiser les résultats de l'analyse." },
        "results_h3": { "en": "Results", "it": "Risultati", "fr": "Résultats" },
        "results_p": { "en": "The model achieved an accuracy of 92% on the test dataset, surpassing solutions based on more traditional approaches. The API made it possible to integrate sentiment analysis into other business systems, providing valuable data that helped guide two marketing campaigns and identify three areas for product improvement.", "it": "Il modello ha raggiunto un'accuratezza del 92% sul dataset di test, superando le soluzioni basate su approcci più tradizionali. L'API ha permesso di integrare l'analisi del sentimento in altri sistemi aziendali, fornendo dati preziosi che hanno contribuito a orientare due campagne di marketing e a identificare tre aree di miglioramento del prodotto.", "fr": "Le modèle a atteint une précision de 92% sur l'ensemble de données de test, dépassant les solutions basées sur des approches plus traditionnelles. L'API a permis d'intégrer l'analyse des sentiments dans d'autres systèmes d'entreprise, fournissant des données précieuses qui ont aidé à orienter deux campagnes marketing et à identifier trois domaines d'amélioration des produits." }
    },
    "cv": {
        "title": { "en": "CV - Paolo Alborno", "it": "CV - Paolo Alborno", "fr": "CV - Paolo Alborno" },
        "meta_description": { "en": "CV of Paolo Alborno, Senior Software & Data Engineer.", "it": "CV di Paolo Alborno, Senior Software & Data Engineer.", "fr": "CV de Paolo Alborno, Ingénieur Senior Logiciel & Données." },
        "doc_view_btn": { "en": "Document View", "it": "Visualizzazione Documento", "fr": "Vue Document" },
        "graph_view_btn": { "en": "Graph View", "it": "Visualizzazione Grafo", "fr": "Vue Graphe" },
        "download_btn": { "en": "Download CV (PDF)", "it": "Scarica CV (PDF)", "fr": "Télécharger le CV (PDF)" }
    },
    "python_snippets": {
        "title": { "en": "Python Snippets - Paolo Alborno", "it": "Python Snippets - Paolo Alborno", "fr": "Extraits Python - Paolo Alborno" },
        "h2": { "en": "Python Code Snippets", "it": "Python Code Snippets", "fr": "Extraits de Code Python" },
        "section_subtitle": { "en": "A collection of code examples and small scripts I have written.", "it": "Una raccolta di esempi di codice e piccoli script che ho scritto.", "fr": "Une collection d'exemples de code et de petits scripts que j'ai écrits." },
        "example1_h3": { "en": "Example 1: Data Cleaning with Pandas", "it": "Esempio 1: Data Cleaning con Pandas", "fr": "Exemple 1: Nettoyage de Données avec Pandas" },
        "example2_h3": { "en": "Example 2: Simple API Call", "it": "Esempio 2: Chiamata API Semplice", "fr": "Exemple 2: Appel API Simple" },
        "tech_aws": { "en": "AWS", "it": "AWS", "fr": "AWS" },
        "tech_cloud": { "en": "Cloud Architecture", "it": "Architettura Cloud", "fr": "Architecture Cloud" },
        "tech_ecommerce": { "en": "E-commerce", "it": "E-commerce", "fr": "E-commerce" },
        "tech_perf": { "en": "Performance Tuning", "it": "Ottimizzazione Performance", "fr": "Optimisation des Performances" },
        "tech_nlp": { "en": "NLP", "it": "NLP", "fr": "NLP" },
        "tech_bert": { "en": "BERT", "it": "BERT", "fr": "BERT" },
        "tech_python": { "en": "Python", "it": "Python", "fr": "Python" },
        "tech_pytorch": { "en": "PyTorch", "it": "PyTorch", "fr": "PyTorch" },
        "tech_fastapi": { "en": "FastAPI", "it": "FastAPI", "fr": "FastAPI" },
        "tech_docker": { "en": "Docker", "it": "Docker", "fr": "Docker" },
        "tech_ml": { "en": "Machine Learning", "it": "Machine Learning", "fr": "Apprentissage Automatique" },
        "tech_html": { "en": "HTML5", "it": "HTML5", "fr": "HTML5" },
        "tech_css": { "en": "CSS", "it": "CSS", "fr": "CSS" },
        "tech_js": { "en": "JavaScript", "it": "JavaScript", "fr": "JavaScript" },
        "tech_canvas": { "en": "Canvas", "it": "Canvas", "fr": "Canvas" },
        "tech_aurora": { "en": "AWS Aurora", "it": "AWS Aurora", "fr": "AWS Aurora" },
        "tech_ec2": { "en": "EC2 Auto Scaling", "it": "EC2 Auto Scaling", "fr": "EC2 Auto Scaling" },
        "tech_cloudfront": { "en": "CloudFront", "it": "CloudFront", "fr": "CloudFront" },
        "tech_elasticache": { "en": "ElastiCache", "it": "ElastiCache", "fr": "ElastiCache" },
        "tech_cloudwatch": { "en": "CloudWatch", "it": "CloudWatch", "fr": "CloudWatch" }
    },
    "login": {
        "title": { "en": "Admin Access", "it": "Accesso Admin", "fr": "Accès Admin" },
        "description": { "en": "Please log in with your GitHub account to access the admin area.", "it": "Effettua il login con il tuo account GitHub per accedere all'area admin.", "fr": "Veuillez vous connecter avec votre compte GitHub pour accéder à l'espace admin." }
    },
    "logout": {
        "title": { "en": "Confirm Logout", "it": "Conferma Logout", "fr": "Confirmer la déconnexion" },
        "description": { "en": "Are you sure you want to log out?", "it": "Sei sicuro di voler uscire?", "fr": "Êtes-vous sûr de vouloir vous déconnecter ?" },
        "confirm": { "en": "Logout", "it": "Logout", "fr": "Déconnexion" },
        "cancel": { "en": "Cancel", "it": "Annulla", "fr": "Annuler" }
    },
    "admin": {
        "title": { "en": "Admin Panel", "it": "Pannello Admin", "fr": "Panneau d'administration" },
        "section_subtitle": { "en": "Manage site content from here.", "it": "Gestisci i contenuti del sito da qui.", "fr": "Gérez le contenu du site d'ici." },
        "auth_required_title": { "en": "Authentication Required", "it": "Autenticazione Richiesta", "fr": "Authentification requise" },
        "auth_required_desc": { "en": "You must be logged in to view this page.", "it": "Devi essere loggato per visualizzare questa pagina.", "fr": "Vous devez être connecté pour voir cette page." },
        "login_button": { "en": "Login", "it": "Login", "fr": "Connexion" }
    }
};
