const cvData = {
    skills: [
        { id: 'AWS', group: 'skill', val: 1 },
        { id: 'Python', group: 'skill', val: 1 },
        { id: 'NLP', group: 'skill', val: 1 },
        { id: 'BERT', group: 'skill', val: 1 },
        { id: 'LangChain', group: 'skill', val: 1 },
        { id: 'Docker', group: 'skill', val: 1 },
        { id: 'Java', group: 'skill', val: 1 },
        { id: 'Project Management', group: 'skill', val: 1 }
    ],
    future_goals: [
        { id: 'AI Agents', group: 'future', val: 2 },
        { id: 'Advanced AI/ML', group: 'future', val: 1 },
        { id: 'System Design a larga scala', group: 'future', val: 1 }
    ],
    experience: [
        {
            id: 'exp_senior',
            title: 'SENIOR SOFTWARE, DATA ENGINEER - PARTNER',
            date: 'Feb 2019 - Presente',
            company: 'MASSIVE DATA HEIGHTS | Varazze, Italia (Remoto)',
            details: [
                "Sviluppato un'architettura cloud scalabile su AWS (EC2, ELB, RDS, Auto Scaling, ecc.) per processare oltre 1 miliardo di recensioni di consumatori in più di 15 categorie di prodotti.",
                "Applicato tecniche di NLP come clustering, estrazione di topic (sklearn, BERT) e analisi del sentiment per identificare insight sui prodotti e trend di consumo.",
                "Progettato pipeline di dati integrando API Java e microservizi Python (Flask, Lambda) e database.",
                "Integrato capacità LLM (LangChain, agenti, prompt engineering) per abilitare l'esplorazione dei dati basata su chat.",
                "Supportato attivamente il management nello sviluppo del prodotto e nell'ottimizzazione dell'infrastruttura: contribuendo a ottenere oltre 10 clienti enterprise e a ridurre i costi operativi di AWS del 30%."
            ],
            skills: ['AWS', 'Python', 'NLP', 'BERT', 'Java', 'Docker', 'LangChain'],
            link: 'projects.html'
        },
        {
            id: 'exp_phd',
            title: 'DOTTORANDO, ASSEGNISTA DI RICERCA',
            date: 'Set 2014 - Feb 2019',
            company: 'UNIVERSITÀ DI GENOVA - DIBRIS | Genova, Italia',
            details: [
                "Sviluppato moduli software/app per supportare le attività di ricerca, principalmente per l'acquisizione di dati da sensori in tempo reale.",
                "Competente nella stesura di report tecnici e nel coordinamento di deliverable in progetti di ricerca finanziati dall'UE (H2020).",
                "Co-organizzato MOCO 2018 (150+ partecipanti), curando il programma e gestendo la logistica."
            ],
            skills: ['Python', 'Java', 'Project Management']
        }
    ],
    education: [
        {
            id: 'edu_phd',
            title: 'Dottorato di Ricerca in Informatica e Ingegneria dei Sistemi',
            date: 'Set 2014 - Mag 2018',
            company: 'Università di Genova',
            details: [],
            skills: ['NLP']
        },
        {
            id: 'edu_msc',
            title: 'Laurea Magistrale in Ingegneria Informatica, con lode',
            date: 'Set 2011 - Giu 2014',
            company: 'Università di Genova',
            details: [],
            skills: []
        }
    ],
    certifications: [
        {
            id: 'cert_aws',
            title: 'AWS Certified Solutions Architect (Associate)',
            details: [],
            skills: ['AWS']
        },
        {
            id: 'cert_psm',
            title: 'Professional Scrum Master™ (PSM I)',
            details: [],
            skills: ['Project Management']
        },
        {
            id: 'cert_google',
            title: 'Google PM Certificate V1',
            details: [],
            skills: ['Project Management']
        }
    ]
};
