const gData = {
    nodes: [
        // Core Node
        { id: 'Paolo Alborno', group: 'core', val: 4 },

        // Categories
        { id: 'Esperienze', group: 'category', val: 3 },
        { id: 'Istruzione', group: 'category', val: 3 },
        { id: 'Certificazioni', group: 'category', val: 3 },
        { id: 'Competenze', group: 'category', val: 3 },
        { id: 'Obiettivi Futuri', group: 'category', val: 3 },

        // Esperienze
        { id: 'Senior Software, Data Engineer', group: 'experience', val: 2 },
        { id: 'PhD, Postdoc Fellow', group: 'experience', val: 2 },

        // Istruzione
        { id: 'Dottorato in Informatica', group: 'education', val: 2 },
        { id: 'Laurea Magistrale in Ingegneria Informatica', group: 'education', val: 2 },

        // Certificazioni
        { id: 'AWS Certified Solutions Architect', group: 'certs', val: 2 },
        { id: 'Professional Scrum Master I', group: 'certs', val: 2 },
        { id: 'Google PM Certificate', group: 'certs', val: 2 },

        // Competenze
        { id: 'AWS', group: 'skill', val: 1 },
        { id: 'Python', group: 'skill', val: 1 },
        { id: 'NLP', group: 'skill', val: 1 },
        { id: 'BERT', group: 'skill', val: 1 },
        { id: 'LangChain', group: 'skill', val: 1 },
        { id: 'Docker', group: 'skill', val: 1 },
        { id: 'Java', group: 'skill', val: 1 },
        { id: 'Project Management', group: 'skill', val: 1 },

        // Obiettivi
        { id: 'AI Agents', group: 'future', val: 2 },
        { id: 'Advanced AI/ML', group: 'future', val: 1 },
        { id: 'System Design a larga scala', group: 'future', val: 1 }
    ],
    links: [
        // Connect categories to core
        { source: 'Paolo Alborno', target: 'Esperienze' },
        { source: 'Paolo Alborno', target: 'Istruzione' },
        { source: 'Paolo Alborno', target: 'Certificazioni' },
        { source: 'Paolo Alborno', target: 'Competenze' },
        { source: 'Paolo Alborno', target: 'Obiettivi Futuri' },

        // Connect items to categories
        { source: 'Esperienze', target: 'Senior Software, Data Engineer' },
        { source: 'Esperienze', target: 'PhD, Postdoc Fellow' },
        { source: 'Istruzione', target: 'Dottorato in Informatica' },
        { source: 'Istruzione', target: 'Laurea Magistrale in Ingegneria Informatica' },
        { source: 'Certificazioni', target: 'AWS Certified Solutions Architect' },
        { source: 'Certificazioni', target: 'Professional Scrum Master I' },
        { source: 'Certificazioni', target: 'Google PM Certificate' },
        { source: 'Obiettivi Futuri', target: 'AI Agents' },
        { source: 'Obiettivi Futuri', target: 'Advanced AI/ML' },
        { source: 'Obiettivi Futuri', target: 'System Design a larga scala' },

        // Connect experiences to skills
        { source: 'Senior Software, Data Engineer', target: 'AWS' },
        { source: 'Senior Software, Data Engineer', target: 'Python' },
        { source: 'Senior Software, Data Engineer', target: 'NLP' },
        { source: 'Senior Software, Data Engineer', target: 'BERT' },
        { source: 'Senior Software, Data Engineer', target: 'Java' },
        { source: 'Senior Software, Data Engineer', target: 'Docker' },
        { source: 'PhD, Postdoc Fellow', target: 'Python' },
        { source: 'PhD, Postdoc Fellow', target: 'Java' },

        // Connect certs to skills
        { source: 'AWS Certified Solutions Architect', target: 'AWS' },
        { source: 'Professional Scrum Master I', target: 'Project Management' },
        { source: 'Google PM Certificate', target: 'Project Management' },

        // Connect skills to other skills
        { source: 'NLP', target: 'BERT' },
        { source: 'NLP', target: 'LangChain' },
        { source: 'AI Agents', target: 'LangChain' },
        { source: 'AI Agents', target: 'Python' },

        // Connect all skills to Competente category
        { source: 'Competenze', target: 'AWS' },
        { source: 'Competenze', target: 'Python' },
        { source: 'Competenze', target: 'NLP' },
        { source: 'Competenze', target: 'BERT' },
        { source: 'Competenze', target: 'LangChain' },
        { source: 'Competenze', target: 'Docker' },
        { source: 'Competenze', target: 'Java' },
        { source: 'Competenze', target: 'Project Management' }
    ]
};
