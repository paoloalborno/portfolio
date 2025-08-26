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
        "home": { "en": "Home", "it": "Home" },
        "about": { "en": "About Me", "it": "Chi Sono" },
        "projects": { "en": "Projects", "it": "Progetti" },
        "blog": { "en": "Blog", "it": "Blog" },
        "cv": { "en": "CV", "it": "CV" },
        "hobbies": { "en": "Hobbies", "it": "Hobby" },
        "contact": { "en": "Contact Me", "it": "Contattami" }
    },
    "footer": {
        "rights": { "en": "&copy; 2025 Paolo Alborno. All rights reserved.", "it": "&copy; 2025 Paolo Alborno. Tutti i diritti riservati." },
        "skills_h3": { "en": "Core Technologies", "it": "Tecnologie Chiave" }
    },
    "index": {
        "title": { "en": "Paolo Alborno - Software Engineer", "it": "Paolo Alborno - Software Engineer" },
        "meta_description": { "en": "Portfolio of Paolo Alborno, Software Engineer with AWS, Scrum, and PM certifications.", "it": "Portfolio di Paolo Alborno, Software Engineer con certificazione AWS, Scrum, e PM." },
        "h1": { "en": "Hi, I'm <span class=\"highlight\">Paolo</span>", "it": "Ciao, sono <span class=\"highlight\">Paolo</span>" },
        "subtitle": { "en": "Software Engineer | AWS Certified | Scrum & PM", "it": "Software Engineer | AWS Certified | Scrum & PM" },
        "p_hero": { "en": "Software engineer with experience in developing AWS cloud infrastructure, backend APIs, and NLP projects with BERT. I transform complex business needs into robust and scalable technology solutions.", "it": "Ingegnere del software con esperienza nello sviluppo di infrastrutture cloud AWS, API backend e progetti di NLP con BERT. Trasformo complesse esigenze di business in soluzioni tecnologiche robuste e scalabili." },
        "btn_projects": { "en": "<i class=\"fas fa-code\"></i> View Projects", "it": "<i class=\"fas fa-code\"></i> Vedi i Progetti" },
        "btn_contact": { "en": "<i class=\"fas fa-envelope\"></i> Contact Me", "it": "<i class=\"fas fa-envelope\"></i> Contattami" }
    },
    "about": {
        "title": { "en": "About Me - Paolo Alborno", "it": "Chi Sono - Paolo Alborno" },
        "meta_description": { "en": "Learn more about Paolo Alborno, a Software Engineer specializing in cloud, backend, and NLP.", "it": "Scopri di più su Paolo Alborno, Software Engineer specializzato in cloud, backend e NLP." },
        "h2": { "en": "About Me", "it": "Chi Sono" },
        "section_subtitle": { "en": "A software engineer with a passion for building complex solutions.", "it": "Un ingegnere del software con la passione per la creazione di soluzioni complesse." },
        "mission_h3": { "en": "My Mission", "it": "La Mia Missione" },
        "mission_p1": { "en": "I'm Paolo Alborno, a <strong>Software Engineer</strong> with solid experience in the world of <strong>cloud computing</strong>, particularly with <strong>AWS</strong>, and in <strong>backend development</strong>. My mission is to design and build the architecture behind the scenes, ensuring that applications are <strong>high-performing, scalable, and secure</strong>.", "it": "Sono Paolo Alborno, un <strong>Software Engineer</strong> con una solida esperienza nel mondo del <strong>cloud computing</strong>, in particolare con <strong>AWS</strong>, e nello <strong>sviluppo di backend</strong>. La mia missione è progettare e costruire l'architettura che sta dietro le quinte, garantendo che le applicazioni siano <strong>performanti, scalabili e sicure</strong>." },
        "mission_p2": { "en": "I hold <strong>AWS, Scrum, and Project Management certifications</strong>, which allow me to approach projects with a holistic view, combining technical expertise with effective management of the development process. I have worked on projects ranging from analyzing e-commerce infrastructures to developing <strong>Natural Language Processing (NLP) models with BERT</strong>, demonstrating versatility and strong problem-solving skills.", "it": "Possiedo <strong>certificazioni AWS, Scrum e di Project Management</strong>, che mi permettono di affrontare i progetti con una visione olistica, combinando competenza tecnica con una gestione efficace del processo di sviluppo. Ho lavorato su progetti che spaziano dall'analisi di infrastrutture per e-commerce allo sviluppo di modelli di <strong>Natural Language Processing (NLP) con BERT</strong>, dimostrando versatilità e una forte capacità di problem-solving." },
        "mission_p3": { "en": "I firmly believe in the power of technology to <strong>solve real-world problems</strong> and I am always looking for new challenges to refine my skills and <strong>contribute to innovative projects</strong>.", "it": "Credo fermamente nel potere della tecnologia per <strong>risolvere problemi reali</strong> e sono sempre alla ricerca di nuove sfide per affinare le mie competenze e <strong>contribuire a progetti innovativi</strong>." },
        "skills_h3": { "en": "My Key Skills", "it": "Le Mie Competenze Chiave" },
        "skill1": { "en": "AWS Cloud Infrastructure", "it": "Infrastruttura Cloud AWS" },
        "skill2": { "en": "Backend & API Development", "it": "Backend & API Development" },
        "skill3": { "en": "NLP (BERT)", "it": "NLP (BERT)" },
        "skill4": { "en": "E-commerce Analysis", "it": "Analisi E-commerce" },
        "skill5": { "en": "Java", "it": "Java" },
        "skill6": { "en": "Project Management", "it": "Project Management" },
        "skill7": { "en": "Python", "it": "Python" },
        "skill8": { "en": "CI/CD", "it": "CI/CD" },
        "skill9": { "en": "Orchestration (NiFi)", "it": "Orchestrazione (NiFi)" }
    },
    "projects": {
        "title": { "en": "Projects - Paolo Alborno", "it": "Progetti - Paolo Alborno" },
        "meta_description": { "en": "Explore Paolo Alborno's projects, including e-commerce infrastructure analysis and NLP.", "it": "Esplora i progetti di Paolo Alborno, includendo analisi di infrastrutture e-commerce e NLP." },
        "h2": { "en": "My Projects", "it": "I Miei Progetti" },
        "section_subtitle": { "en": "A selection of projects that demonstrate my technical and management skills.", "it": "Una selezione di progetti che dimostrano le mie competenze tecniche e di gestione." },
        "tab_ecommerce": { "en": "E-commerce Infrastructure Analysis", "it": "Analisi Infrastruttura E-commerce" },
        "tab_nlp": { "en": "NLP with BERT", "it": "NLP con BERT" },
        "tab_python": { "en": "Python Projects", "it": "Progetti Python" },
        "tab_game": { "en": "Snake Game", "it": "Gioco Snake" },
        "ecommerce_h3": { "en": "E-commerce Cloud Infrastructure Analysis and Optimization", "it": "Analisi e Ottimizzazione di Infrastruttura Cloud per E-commerce" },
        "ecommerce_p": { "en": "An in-depth analysis of an e-commerce infrastructure on AWS, aimed at improving performance, scalability, and costs. The project included reviewing the architecture, identifying bottlenecks, and proposing optimized solutions.", "it": "Un'analisi approfondita di un'infrastruttura e-commerce su AWS, finalizzata a migliorare performance, scalabilità e costi. Il progetto ha incluso la revisione dell'architettura, l'identificazione di colli di bottiglia e la proposta di soluzioni ottimizzate." },
        "ecommerce_btn": { "en": "Project Details", "it": "Dettagli del Progetto" },
        "nlp_h3": { "en": "Sentiment Analysis System with BERT", "it": "Sistema di Analisi del Sentimento con BERT" },
        "nlp_p": { "en": "Development of a Natural Language Processing system for sentiment analysis of product reviews. The model, based on BERT, was trained and fine-tuned to classify text with high accuracy, supporting strategic business decisions.", "it": "Sviluppo di un sistema di Natural Language Processing per l'analisi del sentimento di recensioni di prodotti. Il modello, basato su BERT, è stato addestrato e fine-tuned per classificare il testo con alta precisione, supportando decisioni di business strategiche." },
        "nlp_btn": { "en": "Project Details", "it": "Dettagli del Progetto" },
        "py_subtab_tasklist": { "en": "Task List", "it": "Task List" },
        "py_subtab_ai_agent": { "en": "AI Agent", "it": "AI Agent" },
        "py_tasklist_h3": { "en": "Task List Application", "it": "Applicazione Task List" },
        "py_tasklist_p": { "en": "A simple Python application for managing tasks. This project is currently under development.", "it": "Una semplice applicazione in Python per la gestione delle attività. Questo progetto è attualmente in fase di sviluppo." },
        "py_ai_agent_h3": { "en": "AI Agent with OLLAMA and Langchain", "it": "AI Agent con OLLAMA e Langchain" },
        "py_ai_agent_p": { "en": "An AI agent scaffolding project using OLLAMA and Langchain for local model interaction. This project is currently under development.", "it": "Un progetto di scaffolding per un agente AI che utilizza OLLAMA e Langchain per l'interazione con modelli locali. Questo progetto è attualmente in fase di sviluppo." },
        "game_h3": { "en": "Snake Game", "it": "Gioco Snake" },
        "game_p": { "en": "A simple implementation of the classic Snake game, created with HTML5 Canvas and JavaScript. A small project for fun and to refresh the basics of game logic.", "it": "Una semplice implementazione del classico gioco Snake, realizzato con HTML5 Canvas e JavaScript. Un piccolo progetto per divertimento e per rinfrescare le basi della logica di gioco." },
        "game_btn": { "en": "Play Game", "it": "Gioca" }
    },
    "contact": {
        "title": { "en": "Contact Me - Paolo Alborno", "it": "Contattami - Paolo Alborno" },
        "meta_description": { "en": "Contact Paolo Alborno for collaborations, projects, or job opportunities.", "it": "Contatta Paolo Alborno per collaborazioni, progetti o opportunità di lavoro." },
        "h2": { "en": "Contact Me", "it": "Contattami" },
        "section_subtitle": { "en": "I am available for new opportunities and collaborations. Write me to discuss a project or just to say hello.", "it": "Sono disponibile per nuove opportunità e collaborazioni. Scrivimi per discutere di un progetto o semplicemente per un saluto." },
        "label_name": { "en": "Name", "it": "Nome" },
        "label_email": { "en": "Email", "it": "Email" },
        "label_subject": { "en": "Subject", "it": "Oggetto" },
        "label_message": { "en": "Message", "it": "Messaggio" },
        "btn_send": { "en": "Send Message", "it": "Invia Messaggio" }
    },
    "hobbies": {
        "title": { "en": "Paolo - Hobbies", "it": "Paolo - Hobby" },
        "h1": { "en": "My Hobbies", "it": "I Miei Hobby" },
        "section_subtitle": { "en": "A collection of my passions and interests outside of the technology world.", "it": "Una collezione delle mie passioni e interessi al di fuori del mondo della tecnologia." },
        "gallery_h3": { "en": "Photo Gallery", "it": "Galleria Fotografica" },
        "gallery_p": { "en": "A small collection of moments and places that have inspired me. Click below to explore the gallery.", "it": "Una piccola collezione di momenti e luoghi che mi hanno ispirato. Clicca qui sotto per esplorare la galleria." },
        "gallery_btn": { "en": "Go to Gallery", "it": "Vai alla Galleria" },
        "passions_h3": { "en": "My Passions", "it": "Le Mie Passioni" },
        "passions_p": { "en": "I am passionate about travel, photography, and trekking. These interests help me maintain a balance between my professional and personal life, and find inspiration in unexpected places.", "it": "Sono un appassionato di viaggi, fotografia e trekking. Questi interessi mi aiutano a mantenere un equilibrio tra vita professionale e personale, e a trovare ispirazione in luoghi inaspettati." }
    },
    "gallery": {
        "title": { "en": "Gallery - Paolo Alborno", "it": "Galleria - Paolo Alborno" },
        "h2": { "en": "Photo Gallery", "it": "Galleria Fotografica" },
        "section_subtitle": { "en": "A small collection of moments and places that have inspired me.", "it": "Una piccola collezione di momenti e luoghi che mi hanno ispirato." }
    },
    "game": {
        "title": { "en": "Paolo - Game", "it": "Paolo - Gioco" },
        "h1": { "en": "Snake", "it": "Snake" },
        "section_subtitle": { "en": "A little game to pass the time. Use the arrow keys to move.", "it": "Un piccolo gioco per passare il tempo. Usa i tasti freccia per muoverti." }
    },
    "python_projects": {
        "title": { "en": "Python Snippets - Paolo Alborno", "it": "Python Snippets - Paolo Alborno" },
        "h2": { "en": "Python Code Snippets", "it": "Python Code Snippets" },
        "section_subtitle": { "en": "A collection of code examples and small scripts I have written.", "it": "Una raccolta di esempi di codice e piccoli script che ho scritto." },
        "example1_h3": { "en": "Example 1: Data Cleaning with Pandas", "it": "Esempio 1: Data Cleaning con Pandas" },
        "example2_h3": { "en": "Example 2: Simple API Call", "it": "Esempio 2: Chiamata API Semplice" }
    },
    "blog": {
        "title": { "en": "Paolo - Blog", "it": "Paolo - Blog" },
        "h1": { "en": "My Blog", "it": "Il Mio Blog" },
        "section_subtitle": { "en": "Thoughts, articles, and personal notes on the world of technology and beyond.", "it": "Pensieri, articoli e note personali sul mondo della tecnologia e non solo." },
        "coming_soon_h3": { "en": "Coming soon...", "it": "Prossimamente..." },
        "coming_soon_p": { "en": "I'm working on creating interesting content. Check back soon!", "it": "Sto lavorando alla creazione di contenuti interessanti. Torna a trovarmi presto!" }
    },
    "project_ecommerce": {
        "title": { "en": "Project: E-commerce Infrastructure Analysis - Paolo Alborno", "it": "Progetto: Analisi Infrastruttura E-commerce - Paolo Alborno" },
        "meta_description": { "en": "Details of the project for analyzing and optimizing an e-commerce cloud infrastructure on AWS.", "it": "Dettagli del progetto di analisi e ottimizzazione di un'infrastruttura cloud per e-commerce su AWS." },
        "h2": { "en": "E-commerce Infrastructure Analysis", "it": "Analisi Infrastruttura E-commerce" },
        "section_subtitle": { "en": "Optimizing performance, scalability, and costs on AWS.", "it": "Ottimizzazione di performance, scalabilità e costi su AWS." },
        "goal_h3": { "en": "Project Goal", "it": "Obiettivo del Progetto" },
        "goal_p": { "en": "The main objective was to analyze the cloud infrastructure of a medium-sized e-commerce platform to identify areas for improvement. The key metrics were page load time, the ability to handle traffic spikes during promotional campaigns, and the optimization of operational costs on AWS.", "it": "L'obiettivo principale era analizzare l'infrastruttura cloud di una piattaforma e-commerce di medie dimensioni per identificare aree di miglioramento. Le metriche chiave erano il tempo di caricamento delle pagine, la capacità di gestire picchi di traffico durante le campagne promozionali e l'ottimizzazione dei costi operativi su AWS." },
        "solution_h3": { "en": "My Solution", "it": "La Mia Soluzione" },
        "solution_p": { "en": "I conducted a complete architectural analysis, using tools like AWS Cost Explorer, CloudWatch, and X-Ray. I identified that the database was a bottleneck and that the use of EC2 instances was not optimized. My proposal included:", "it": "Ho condotto un'analisi architetturale completa, utilizzando strumenti come AWS Cost Explorer, CloudWatch e X-Ray. Ho identificato che il database era un collo di bottiglia e che l'uso delle istanze EC2 non era ottimizzato. La mia proposta ha incluso:" },
        "solution_li1": { "en": "Migration of the database to an Amazon Aurora instance with read replicas to improve read scalability.", "it": "Migrazione del database a un'istanza Amazon Aurora con read replicas per migliorare la scalabilità in lettura." },
        "solution_li2": { "en": "Implementation of an Auto Scaling strategy for EC2 instances to dynamically adapt to the load.", "it": "Implementazione di una strategia di Auto Scaling per le istanze EC2, per adattarsi dinamicamente al carico." },
        "solution_li3": { "en": "Use of a CDN (Amazon CloudFront) to serve static content and reduce latency for end users.", "it": "Utilizzo di una CDN (Amazon CloudFront) per servire i contenuti statici e ridurre la latenza per gli utenti finali." },
        "solution_li4": { "en": "Introduction of a caching system with ElastiCache (Redis) for the most frequent queries.", "it": "Introduzione di un sistema di caching con ElastiCache (Redis) per le query più frequenti." },
        "results_h3": { "en": "Results", "it": "Risultati" },
        "results_p": { "en": "The implemented changes led to a 35% reduction in average page load time, a 200% increase in the capacity to handle concurrent users, and a 22% reduction in monthly AWS costs thanks to more efficient use of resources.", "it": "Le modifiche implementate hanno portato a una riduzione del 35% del tempo di caricamento medio delle pagine, a un aumento della capacità di gestire utenti concorrenti del 200% e a una riduzione dei costi mensili di AWS del 22% grazie a un uso più efficiente delle risorse." }
    },
    "project_nlp": {
        "title": { "en": "Project: Sentiment Analysis System with BERT - Paolo Alborno", "it": "Progetto: Sistema di Analisi del Sentimento con BERT - Paolo Alborno" },
        "meta_description": { "en": "Details of the project for developing an NLP system for sentiment analysis based on BERT.", "it": "Dettagli del progetto di sviluppo di un sistema di NLP per l'analisi del sentimento basato su BERT." },
        "h2": { "en": "Sentiment Analysis System with BERT", "it": "Sistema di Analisi del Sentimento con BERT" },
        "section_subtitle": { "en": "Applying Natural Language Processing for business insights.", "it": "Applicazione del Natural Language Processing per insight di business." },
        "goal_h3": { "en": "Project Goal", "it": "Obiettivo del Progetto" },
        "goal_p": { "en": "The goal was to develop a machine learning model capable of analyzing large volumes of product reviews and accurately classifying them as positive, negative, or neutral. This tool was intended to provide the marketing team with actionable insights to improve products and communication.", "it": "L'obiettivo era sviluppare un modello di machine learning capace di analizzare grandi volumi di recensioni di prodotti e classificarle accuratamente come positive, negative o neutre. Questo strumento doveva fornire al team di marketing insight azionabili per migliorare i prodotti e la comunicazione." },
        "solution_h3": { "en": "My Solution", "it": "La Mia Soluzione" },
        "solution_p": { "en": "I designed and implemented a complete NLP pipeline. The core of the system is a model based on BERT (Bidirectional Encoder Representations from Transformers), which I fine-tuned on a specific dataset of reviews from the domain of interest. The solution included:", "it": "Ho progettato e implementato una pipeline di NLP completa. Il cuore del sistema è un modello basato su BERT (Bidirectional Encoder Representations from Transformers), che ho fine-tuned su un dataset specifico di recensioni del dominio di interesse. La soluzione includeva:" },
        "solution_li1": { "en": "Preprocessing of textual data to clean and normalize the text.", "it": "Preprocessing dei dati testuali per pulire e normalizzare il testo." },
        "solution_li2": { "en": "Fine-tuning of the pre-trained BERT model for the sentiment classification task.", "it": "Fine-tuning del modello BERT pre-addestrato per il compito di classificazione del sentimento." },
        "solution_li3": { "en": "Development of a RESTful API with FastAPI to expose the model and allow real-time text analysis.", "it": "Sviluppo di un'API RESTful con FastAPI per esporre il modello e permettere l'analisi del testo in tempo reale." },
        "solution_li4": { "en": "Containerization of the application with Docker to ensure portability and easy deployment.", "it": "Containerizzazione dell'applicazione con Docker per garantire la portabilità e una facile messa in produzione." },
        "solution_li5": { "en": "Creation of an interactive dashboard to visualize the analysis results.", "it": "Creazione di una dashboard interattiva per visualizzare i risultati dell'analisi." },
        "results_h3": { "en": "Results", "it": "Risultati" },
        "results_p": { "en": "The model achieved an accuracy of 92% on the test dataset, surpassing solutions based on more traditional approaches. The API made it possible to integrate sentiment analysis into other business systems, providing valuable data that helped guide two marketing campaigns and identify three areas for product improvement.", "it": "Il modello ha raggiunto un'accuratezza del 92% sul dataset di test, superando le soluzioni basate su approcci più tradizionali. L'API ha permesso di integrare l'analisi del sentimento in altri sistemi aziendali, fornendo dati preziosi che hanno contribuito a orientare due campagne di marketing e a identificare tre aree di miglioramento del prodotto." }
    },
    "cv": {
        "title": { "en": "CV - Paolo Alborno", "it": "CV - Paolo Alborno" },
        "meta_description": { "en": "CV of Paolo Alborno, Senior Software & Data Engineer.", "it": "CV di Paolo Alborno, Senior Software & Data Engineer." },
        "doc_view_btn": { "en": "Document View", "it": "Visualizzazione Documento" },
        "graph_view_btn": { "en": "Graph View", "it": "Visualizzazione Grafo" },
        "download_btn": { "en": "Download CV (PDF)", "it": "Scarica CV (PDF)" }
    },
    "python_snippets": {
        "title": { "en": "Python Snippets - Paolo Alborno", "it": "Python Snippets - Paolo Alborno" },
        "h2": { "en": "Python Code Snippets", "it": "Python Code Snippets" },
        "section_subtitle": { "en": "A collection of code examples and small scripts I have written.", "it": "Una raccolta di esempi di codice e piccoli script che ho scritto." },
        "example1_h3": { "en": "Example 1: Data Cleaning with Pandas", "it": "Esempio 1: Data Cleaning con Pandas" },
        "example2_h3": { "en": "Example 2: Simple API Call", "it": "Esempio 2: Chiamata API Semplice" },
        "tech_aws": { "en": "AWS", "it": "AWS" },
        "tech_cloud": { "en": "Cloud Architecture", "it": "Architettura Cloud" },
        "tech_ecommerce": { "en": "E-commerce", "it": "E-commerce" },
        "tech_perf": { "en": "Performance Tuning", "it": "Ottimizzazione Performance" },
        "tech_nlp": { "en": "NLP", "it": "NLP" },
        "tech_bert": { "en": "BERT", "it": "BERT" },
        "tech_python": { "en": "Python", "it": "Python" },
        "tech_pytorch": { "en": "PyTorch", "it": "PyTorch" },
        "tech_fastapi": { "en": "FastAPI", "it": "FastAPI" },
        "tech_docker": { "en": "Docker", "it": "Docker" },
        "tech_ml": { "en": "Machine Learning", "it": "Machine Learning" },
        "tech_html": { "en": "HTML5", "it": "HTML5" },
        "tech_css": { "en": "CSS", "it": "CSS" },
        "tech_js": { "en": "JavaScript", "it": "JavaScript" },
        "tech_canvas": { "en": "Canvas", "it": "Canvas" },
        "tech_aurora": { "en": "AWS Aurora", "it": "AWS Aurora" },
        "tech_ec2": { "en": "EC2 Auto Scaling", "it": "EC2 Auto Scaling" },
        "tech_cloudfront": { "en": "CloudFront", "it": "CloudFront" },
        "tech_elasticache": { "en": "ElastiCache", "it": "ElastiCache" },
        "tech_cloudwatch": { "en": "CloudWatch", "it": "CloudWatch" }
    }
};
