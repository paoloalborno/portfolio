/**
 * =================================================================================
 * cv_data.js - Dati Strutturati del CV (Multilingua)
 * =================================================================================
 *
 * Questo file contiene i dati del CV in formato JavaScript, separati per lingua.
 * - cvDataIT: Contiene i dati in italiano.
 * - cvDataEN: Contiene i dati in inglese.
 *
 * La struttura è stata aggiornata per essere più completa e per facilitare
 * la generazione dinamica del CV.
 *
 */

// ===========================================
// --- DATI DEL CV IN ITALIANO ---
// ===========================================
var cvDataIT = {
    profile: {
        name: "Paolo Alborno",
        title: "Senior Software & Data Engineer",
        summary: "Ingegnere del software e dei dati con oltre 5 anni di esperienza nella progettazione e implementazione di architetture cloud-native, pipeline di dati complesse e soluzioni di intelligenza artificiale. Specializzato in AWS, NLP e metodologie agili, con una comprovata capacità di tradurre le esigenze aziendali in sistemi tecnologici robusti, scalabili ed efficienti."
    },
    sections: {
        summary: { title: 'Profilo Professionale', icon: 'fa-user' },
        experience: { title: 'Esperienze Lavorative', icon: 'fa-briefcase' },
        education: { title: 'Istruzione e Formazione', icon: 'fa-graduation-cap' },
        certifications: { title: 'Certificazioni', icon: 'fa-certificate' },
        skills: { title: 'Competenze Tecniche', icon: 'fa-cogs' }
    },
    experience: [
        {
            id: 'exp_senior',
            title: 'Senior S/W & Data Engineer',
            graph_category: 'experience_item',
            date: 'Feb 2019 - Presente',
            company: 'MASSIVE DATA HEIGHTS | Varazze, Italia (Remoto)',
            details: [
                "Progettazione e sviluppo di un'architettura cloud-native su AWS per l'analisi di miliardi di recensioni di prodotti.",
                "Implementazione di modelli NLP (BERT) e LLM (LangChain) per l'estrazione automatica di insight strategici.",
                "Sviluppo di microservizi performanti in Python e API in Java per pipeline di dati complesse.",
                "Gestione dell'infrastruttura con Docker e ottimizzazione dei costi AWS, ottenendo una riduzione del 30%.",
                "Contributo chiave all'acquisizione di oltre 10 clienti di livello enterprise."
            ],
            skills: ['AWS', 'Python', 'NLP', 'BERT', 'Java', 'Docker', 'LangChain', 'System Design']
        },
        {
            id: 'exp_phd',
            title: 'Dottorando e Ricercatore',
            graph_category: 'experience_item',
            date: 'Set 2014 - Feb 2019',
            company: 'UNIVERSITÀ DI GENOVA - DIBRIS | Genova, Italia',
            details: [
                "Sviluppo di moduli software per l'acquisizione e l'analisi di dati da sensori in tempo reale in progetti di ricerca europei (H2020).",
                "Coordinamento dei deliverable tecnici e redazione di reportistica scientifica e tecnica.",
                "Co-organizzazione della conferenza internazionale sulla computer-human interaction (MOCO 2018)."
            ],
            skills: ['Python', 'Java', 'Project Management', 'Ricerca']
        }
    ],
    education: [
        {
            id: 'edu_phd',
            title: 'Dottorato in Informatica',
            graph_category: 'education_item',
            date: '2014 - 2018',
            company: 'Università di Genova, Italia',
            details: ["Specializzazione in Human-Computer Interaction e analisi di dati multimodali."]
        },
        {
            id: 'edu_msc',
            title: 'Laurea Mag. Ing. Informatica',
            graph_category: 'education_item',
            date: '2011 - 2014',
            company: 'Università di Genova, Italia',
            details: ["Votazione: 110/110 e Lode."]
        },
        {
            id: 'edu_bsc',
            title: 'Laurea Triennale Ing. Informatica',
            graph_category: 'education_item',
            date: '2008 - 2011',
            company: 'Università di Genova, Italia',
            details: []
        }
    ],
    certifications: [
        { id: 'cert_aws', title: 'Cert. AWS Solutions Architect', graph_category: 'certification_item', details: [] },
        { id: 'cert_psm', title: 'Cert. Scrum Master (PSM I)', graph_category: 'certification_item', details: [] },
        { id: 'cert_google', title: 'Cert. Google Project Management', graph_category: 'certification_item', details: [] }
    ],
    skills: {
        "Cloud & DevOps": ["AWS (EC2, S3, Lambda, ECS, Aurora)", "Docker", "CI/CD"],
        "Backend": ["Python (FastAPI, Flask)", "Java", "Node.js (base)"],
        "AI & Dati": ["NLP (BERT, Transformers, CoreNLP, Clustering)", "LangChain", "SQL", "Vector Databases"],
        "Altro": ["Metodologie Agili (Scrum)", "Project Management", "System Design", "Git"]
    }
};

// ===========================================
// --- CV DATA IN ENGLISH ---
// ===========================================
var cvDataEN = {
    profile: {
        name: "Paolo Alborno",
        title: "Senior Software & Data Engineer",
        summary: "A Software and Data Engineer with over 5 years of experience in designing and implementing cloud-native architectures, complex data pipelines, and artificial intelligence solutions. Specialized in AWS, NLP, and agile methodologies, with a proven ability to translate business needs into robust, scalable, and efficient technological systems."
    },
    sections: {
        summary: { title: 'Professional Profile', icon: 'fa-user' },
        experience: { title: 'Work Experience', icon: 'fa-briefcase' },
        education: { title: 'Education & Training', icon: 'fa-graduation-cap' },
        certifications: { title: 'Certifications', icon: 'fa-certificate' },
        skills: { title: 'Technical Skills', icon: 'fa-cogs' }
    },
    experience: [
        {
            id: 'exp_senior',
            title: 'Senior S/W & Data Engineer',
            graph_category: 'experience_item',
            date: 'Feb 2019 - Present',
            company: 'MASSIVE DATA HEIGHTS | Varazze, Italy (Remote)',
            details: [
                "Designed and developed a cloud-native architecture on AWS for analyzing billions of product reviews.",
                "Implemented NLP (BERT) and LLM (LangChain) models for automatic extraction of strategic insights.",
                "Developed high-performance microservices in Python and Java APIs for complex data pipelines.",
                "Managed infrastructure with Docker and optimized AWS costs, achieving a 30% reduction.",
                "Key contributor to acquiring over 10 enterprise-level clients."
            ],
            skills: ['AWS', 'Python', 'NLP', 'BERT', 'Java', 'Docker', 'LangChain', 'System Design']
        },
        {
            id: 'exp_phd',
            title: 'PhD Candidate & Researcher',
            graph_category: 'experience_item',
            date: 'Sep 2014 - Feb 2019',
            company: 'UNIVERSITY OF GENOA - DIBRIS | Genoa, Italy',
            details: [
                "Developed software modules for real-time data acquisition and analysis from sensors in European research projects (H2020).",
                "Coordinated technical deliverables and drafted scientific and technical reports.",
                "Co-organized the international conference on computer-human interaction (MOCO 2018)."
            ],
            skills: ['Python', 'Java', 'Project Management', 'Research']
        }
    ],
    education: [
        {
            id: 'edu_phd',
            title: 'PhD in Computer Science',
            graph_category: 'education_item',
            date: '2014 - 2018',
            company: 'University of Genoa, Italy',
            details: ["Specialization in Human-Computer Interaction and multimodal data analysis."]
        },
        {
            id: 'edu_msc',
            title: 'MSc in Computer Engineering',
            graph_category: 'education_item',
            date: '2011 - 2014',
            company: 'University of Genoa, Italy',
            details: ["Final grade: 110/110 cum Laude."]
        },
        {
            id: 'edu_bsc',
            title: 'BSc in Computer Engineering',
            graph_category: 'education_item',
            date: '2008 - 2011',
            company: 'University of Genoa, Italy',
            details: []
        }
    ],
    certifications: [
        { id: 'cert_aws', title: 'Cert. AWS Solutions Architect', graph_category: 'certification_item', details: [] },
        { id: 'cert_psm', title: 'Cert. Scrum Master (PSM I)', graph_category: 'certification_item', details: [] },
        { id: 'cert_google', title: 'Cert. Google Project Management', graph_category: 'certification_item', details: [] }
    ],
    skills: {
        "Cloud & DevOps": ["AWS (EC2, S3, Lambda, ECS, Aurora)", "Docker", "CI/CD"],
        "Backend": ["Python (FastAPI, Flask)", "Java", "Node.js (basic)"],
        "AI & Data": ["NLP (BERT, Transformers, CoreNLP, Clustering)", "LangChain", "SQL", "Vector Databases"],
        "Other": ["Agile Methodologies (Scrum)", "Project Management", "System Design", "Git"]
    }
};

// ===========================================
// --- CV DATA IN FRENCH ---
// ===========================================
var cvDataFR = {
    profile: {
        name: "Paolo Alborno",
        title: "Ingénieur Senior Logiciel & Données",
        summary: "Ingénieur logiciel et données avec plus de 5 ans d'expérience dans la conception et la mise en œuvre d'architectures cloud-natives, de pipelines de données complexes et de solutions d'intelligence artificielle. Spécialisé en AWS, NLP et méthodologies agiles, avec une capacité avérée à traduire les besoins de l'entreprise en systèmes technologiques robustes, évolutifs et efficaces."
    },
    sections: {
        summary: { title: 'Profil Professionnel', icon: 'fa-user' },
        experience: { title: 'Expérience Professionnelle', icon: 'fa-briefcase' },
        education: { title: 'Éducation et Formation', icon: 'fa-graduation-cap' },
        certifications: { title: 'Certifications', icon: 'fa-certificate' },
        skills: { title: 'Compétences Techniques', icon: 'fa-cogs' }
    },
    experience: [
        {
            id: 'exp_senior',
            title: 'Ingénieur Senior S/W & Données',
            graph_category: 'experience_item',
            date: 'Fév 2019 - Présent',
            company: 'MASSIVE DATA HEIGHTS | Varazze, Italie (À distance)',
            details: [
                "Conception et développement d'une architecture cloud-native sur AWS pour l'analyse de milliards d'avis sur les produits.",
                "Mise en œuvre de modèles NLP (BERT) et LLM (LangChain) pour l'extraction automatique d'informations stratégiques.",
                "Développement de microservices performants en Python et d'API en Java pour des pipelines de données complexes.",
                "Gestion de l'infrastructure avec Docker et optimisation des coûts AWS, réalisant une réduction de 30%.",
                "Contributeur clé à l'acquisition de plus de 10 clients de niveau entreprise."
            ],
            skills: ['AWS', 'Python', 'NLP', 'BERT', 'Java', 'Docker', 'LangChain', 'System Design']
        },
        {
            id: 'exp_phd',
            title: 'Doctorant & Chercheur',
            graph_category: 'experience_item',
            date: 'Sep 2014 - Fév 2019',
            company: 'UNIVERSITÉ DE GÊNES - DIBRIS | Gênes, Italie',
            details: [
                "Développement de modules logiciels pour l'acquisition et l'analyse de données de capteurs en temps réel dans des projets de recherche européens (H2020).",
                "Coordination des livrables techniques et rédaction de rapports scientifiques et techniques.",
                "Co-organisation de la conférence internationale sur l'interaction homme-machine (MOCO 2018)."
            ],
            skills: ['Python', 'Java', 'Gestion de Projet', 'Recherche']
        }
    ],
    education: [
        {
            id: 'edu_phd',
            title: 'Doctorat en Informatique',
            graph_category: 'education_item',
            date: '2014 - 2018',
            company: 'Université de Gênes, Italie',
            details: ["Spécialisation en Interaction Homme-Machine et analyse de données multimodales."]
        },
        {
            id: 'edu_msc',
            title: 'MSc en Ingénierie Informatique',
            graph_category: 'education_item',
            date: '2011 - 2014',
            company: 'Université de Gênes, Italie',
            details: ["Note finale: 110/110 avec mention."]
        },
        {
            id: 'edu_bsc',
            title: 'BSc en Ingénierie Informatique',
            graph_category: 'education_item',
            date: '2008 - 2011',
            company: 'Université de Gênes, Italie',
            details: []
        }
    ],
    certifications: [
        { id: 'cert_aws', title: 'Cert. AWS Solutions Architect', graph_category: 'certification_item', details: [] },
        { id: 'cert_psm', title: 'Cert. Scrum Master (PSM I)', graph_category: 'certification_item', details: [] },
        { id: 'cert_google', title: 'Cert. Google Project Management', graph_category: 'certification_item', details: [] }
    ],
    skills: {
        "Cloud & DevOps": ["AWS (EC2, S3, Lambda, ECS, Aurora)", "Docker", "CI/CD"],
        "Backend": ["Python (FastAPI, Flask)", "Java", "Node.js (basique)"],
        "AI & Données": ["NLP (BERT, Transformers, CoreNLP, Clustering)", "LangChain", "SQL", "Bases de données vectorielles"],
        "Autre": ["Méthodologies Agiles (Scrum)", "Gestion de Projet", "Conception de Systèmes", "Git"]
    }
};

// Per compatibilità con il vecchio sistema, si potrebbe esportare uno di default
var cvData = cvDataIT;
