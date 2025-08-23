const cvData = {
    // New structure for skills, grouped by area
    competency_areas: {
        'Backend': {
            group: 'area',
            skills: ['Java', 'Python', 'Docker']
        },
        'Cloud': {
            group: 'area',
            skills: ['AWS']
        },
        'AI/ML': {
            group: 'area',
            skills: ['NLP', 'BERT', 'LangChain']
        },
        'Management': {
            group: 'area',
            skills: ['Project Management', 'Ricerca']
        }
    },
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
                "Sviluppato un'architettura cloud scalabile su AWS per processare miliardi di recensioni.",
                "Applicato tecniche di NLP (BERT) e LLM (LangChain) per estrarre insight.",
                "Progettato pipeline di dati con API Java e microservizi Python.",
                "Contribuito a ottenere >10 clienti enterprise e ridurre i costi AWS del 30%."
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
                "Sviluppato moduli software per l'acquisizione di dati da sensori in tempo reale.",
                "Redatto report tecnici e coordinato deliverable in progetti di ricerca EU.",
                "Co-organizzato la conferenza internazionale MOCO 2018."
            ],
            skills: ['Python', 'Java', 'Project Management', 'Ricerca']
        }
    ],
    education: [
        {
            id: 'edu_phd',
            title: 'Dottorato in Informatica',
            date: 'Set 2014 - Mag 2018',
            company: 'Università di Genova',
            details: [],
            skills: ['NLP', 'Ricerca']
        },
        {
            id: 'edu_msc',
            title: 'Laurea Magistrale in Ingegneria Informatica',
            date: 'Set 2011 - Giu 2014',
            company: 'Università di Genova',
            details: [],
            skills: []
        }
    ],
    certifications: [
        {
            id: 'cert_aws',
            title: 'AWS Certified Solutions Architect',
            details: [],
            skills: ['AWS']
        },
        {
            id: 'cert_psm',
            title: 'Professional Scrum Master I',
            details: [],
            skills: ['Project Management']
        },
        {
            id: 'cert_google',
            title: 'Google PM Certificate',
            details: [],
            skills: ['Project Management']
        }
    ]
};
