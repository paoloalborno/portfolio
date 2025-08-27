/**
 * =================================================================================
 * cv_logic.js - Logica per la Pagina CV
 * =================================================================================
 */
class CVManager {
    constructor(lang) {
        this.lang = lang;
        this.cvData = this.getCvDataForLanguage(lang);
        this.graphRendered = false;

        this.docViewContainer = document.getElementById('cv-text-container');
        this.graphViewContainer = document.getElementById('cv-graph');
        this.tabButtons = document.querySelectorAll('.cv-tab-btn');
        this.tabPanes = document.querySelectorAll('.cv-tab-pane');
        this.modal = document.getElementById('cv-modal');
        this.modalCloseBtn = document.querySelector('.cv-modal-close-btn');
    }

    getCvDataForLanguage(lang) {
        switch (lang) {
            case 'en':
                return window.cvDataEN;
            case 'fr':
                return window.cvDataFR;
            case 'it':
            default:
                return window.cvDataIT;
        }
    }

    init() {
        this.renderDocumentView();
        this.setupEventListeners();
        this.setupModal();
    }

    setupEventListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPaneId = button.getAttribute('data-tab');
                this.tabButtons.forEach(btn => btn.classList.remove('active'));
                this.tabPanes.forEach(pane => pane.classList.remove('active'));
                button.classList.add('active');
                document.getElementById(targetPaneId)?.classList.add('active');

                if (targetPaneId === 'graph-view' && !this.graphRendered) {
                    this.renderGraphView();
                    this.graphRendered = true;
                }
            });
        });
    }

    renderDocumentView() {
        this.docViewContainer.innerHTML = ''; // Pulisce il contenitore

        // Ordine delle sezioni da visualizzare
        const sectionOrder = ['summary', 'experience', 'education', 'certifications', 'skills'];

        sectionOrder.forEach(sectionKey => {
            if (this.cvData[sectionKey]) {
                const sectionInfo = this.cvData.sections[sectionKey];
                let sectionHTML = `
                    <div class="cv-section" id="cv-${sectionKey}">
                        <h2 class="cv-section-title">
                            <i class="fas ${sectionInfo.icon}"></i> ${sectionInfo.title}
                        </h2>
                `;

                if (sectionKey === 'summary') {
                    sectionHTML += this.renderSummarySection();
                } else if (sectionKey === 'skills') {
                    sectionHTML += this.renderSkillsSection();
                } else {
                    sectionHTML += this.renderTimelineSection(sectionKey);
                }

                sectionHTML += `</div>`;
                this.docViewContainer.innerHTML += sectionHTML;
            }
        });
    }

    renderSummarySection() {
        return `<div class="cv-summary"><p>${this.cvData.profile.summary}</p></div>`;
    }

    renderTimelineSection(sectionKey) {
        let timelineHTML = '<div class="timeline">';
        const sectionData = this.cvData[sectionKey];

        if (sectionData && sectionData.length > 0) {
            sectionData.forEach(item => {
                timelineHTML += `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <h3 class="timeline-title">${item.title}</h3>
                            ${item.date ? `<p class="timeline-date">${item.date}</p>` : ''}
                            ${item.company ? `<p class="timeline-company">${item.company}</p>` : ''}
                            ${item.details && item.details.length > 0 ? `
                                <div class="timeline-details">
                                    <ul>
                                        ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
        }
        timelineHTML += '</div>';
        return timelineHTML;
    }

    renderSkillsSection() {
        let skillsHTML = '<div class="skills-grid">';
        const skillsData = this.cvData.skills;

        for (const category in skillsData) {
            skillsHTML += `
                <div class="skill-category">
                    <h4 class="skill-category-title">${category}</h4>
                    <ul class="skill-list">
                        ${skillsData[category].map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        skillsHTML += '</div>';
        return skillsHTML;
    }

    renderGraphView() {
        if (this.graphViewContainer) {
            // Svuota il contenitore prima di renderizzare per evitare duplicati
            this.graphViewContainer.innerHTML = '';
            const cvTree = new SimpleTree(this.graphViewContainer, this.cvData);
            cvTree.render();
        }
    }

    setupModal() {
        if (this.modal && this.modalCloseBtn) {
            const closeModal = () => this.modal.style.display = "none";
            this.modalCloseBtn.onclick = closeModal;
            window.onclick = (event) => {
                if (event.target == this.modal) {
                    closeModal();
                }
            };
        }
    }
}
