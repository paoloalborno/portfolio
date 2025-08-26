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
            title: 'SENIOR SOFTWARE & DATA ENGINEER - PARTNER',
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
            title: 'DOTTORANDO E ASSEGNISTA DI RICERCA',
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
            title: 'Dottorato in Informatica (Ph.D.)',
            date: '2014 - 2018',
            company: 'Università di Genova, Italia',
            details: ["Specializzazione in Human-Computer Interaction e analisi di dati multimodali."]
        },
        {
            id: 'edu_msc',
            title: 'Laurea Magistrale in Ingegneria Informatica',
            date: '2011 - 2014',
            company: 'Università di Genova, Italia',
            details: ["Votazione: 110/110 e Lode."]
        },
        {
            id: 'edu_bsc',
            title: 'Laurea Triennale in Ingegneria Informatica',
            date: '2008 - 2011',
            company: 'Università di Genova, Italia',
            details: []
        }
    ],
    certifications: [
        { id: 'cert_aws', title: 'AWS Certified Solutions Architect – Associate', date: '2023', details: [] },
        { id: 'cert_psm', title: 'Professional Scrum Master I (PSM I)', date: '2022', details: [] },
        { id: 'cert_google', title: 'Google Project Management Certificate', date: '2022', details: [] }
    ],
    skills: {
        "Cloud & DevOps": ["AWS (EC2, S3, Lambda, ECS, Aurora)", "Docker", "CI/CD", "Terraform (principiante)"],
        "Backend": ["Python (FastAPI, Flask)", "Java", "Node.js (base)"],
        "AI & Dati": ["NLP (BERT, Transformers)", "LangChain", "PyTorch", "Pandas", "SQL", "Vector Databases"],
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
            title: 'SENIOR SOFTWARE & DATA ENGINEER - PARTNER',
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
            title: 'PHD CANDIDATE AND RESEARCH FELLOW',
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
            date: '2014 - 2018',
            company: 'University of Genoa, Italy',
            details: ["Specialization in Human-Computer Interaction and multimodal data analysis."]
        },
        {
            id: 'edu_msc',
            title: 'Master of Science in Computer Engineering',
            date: '2011 - 2014',
            company: 'University of Genoa, Italy',
            details: ["Final grade: 110/110 cum Laude."]
        },
        {
            id: 'edu_bsc',
            title: 'Bachelor of Science in Computer Engineering',
            date: '2008 - 2011',
            company: 'University of Genoa, Italy',
            details: []
        }
    ],
    certifications: [
        { id: 'cert_aws', title: 'AWS Certified Solutions Architect – Associate', date: '2023', details: [] },
        { id: 'cert_psm', title: 'Professional Scrum Master I (PSM I)', date: '2022', details: [] },
        { id: 'cert_google', title: 'Google Project Management Certificate', date: '2022', details: [] }
    ],
    skills: {
        "Cloud & DevOps": ["AWS (EC2, S3, Lambda, ECS, Aurora)", "Docker", "CI/CD", "Terraform (beginner)"],
        "Backend": ["Python (FastAPI, Flask)", "Java", "Node.js (basic)"],
        "AI & Data": ["NLP (BERT, Transformers)", "LangChain", "PyTorch", "Pandas", "SQL", "Vector Databases"],
        "Other": ["Agile Methodologies (Scrum)", "Project Management", "System Design", "Git"]
    }
};

// Per compatibilità con il vecchio sistema, si potrebbe esportare uno di default
var cvData = cvDataIT;
