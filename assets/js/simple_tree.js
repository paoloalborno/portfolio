/**
 * @class SimpleTree
 * A simplified, rebuilt D3.js collapsible tree chart.
 * This version focuses on reliable, static rendering to ensure visibility.
 */
class SimpleTree {
    constructor(container, initialData, options = {}) {
        if (!container || !initialData) {
            console.error("SimpleTree requires a container and initial data.");
            return;
        }

        this._setupProperties(container, initialData, options);
        this._setupTreeLayout();
    }

    _setupProperties(container, initialData, options) {
        const defaults = {
            margin: { top: 40, right: 20, bottom: 80, left: 20 },
            nodeWidth: 140,
            nodeHeight: 180,
            colorScale: d3.scaleOrdinal()
                .domain(["root", "section_experience", "experience_item", "section_education", "education_item", "section_certifications", "certification_item", "section_skills", "skill_area", "skill"])
                .range(["#2d3748", "#E53E3E", "#C53030", "#D69E2E", "#D69E2E", "#319795", "#2C7A7B", "#4A5568", "#2B6CB0", "#4299E1"])
        };

        this.options = { ...defaults, ...options };
        this.container = container;
        this.rawData = initialData;
        this.nodeCounter = 0;
    }

    _setupTreeLayout() {
        this.tree = d3.tree().nodeSize([this.options.nodeWidth, this.options.nodeHeight]);
    }

    _transformData(data) {
        const root = { name: "Me", category: "root", children: [] };
        const sectionMap = {
            experience: "experience",
            education: "education",
            certifications: "certifications",
            skills: "skills"
        };

        Object.keys(sectionMap).forEach(key => {
            if (data.sections[key] && data[key]) {
                const sectionNode = {
                    name: data.sections[key].title,
                    category: `section_${sectionMap[key]}`,
                    children: []
                };

                if (key === 'skills') {
                    for (const categoryName in data.skills) {
                        const categoryNode = {
                            name: categoryName,
                            category: "skill_area",
                            children: data.skills[categoryName].map(skill => ({ name: skill, category: "skill" }))
                        };
                        sectionNode.children.push(categoryNode);
                    }
                } else {
                    sectionNode.children = data[key].map(item => ({
                        ...item,
                        name: item.title,
                        category: item.graph_category || `${sectionMap[key]}_item`
                    }));
                }
                root.children.push(sectionNode);
            }
        });
        return root;
    }

    render() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        d3.select(this.container).select("svg").remove();

        this.svg = d3.select(this.container).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("font", "12px sans-serif")
            .style("user-select", "none");

        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.width / 2},${this.options.margin.top})`);

        const hierarchicalData = this._transformData(this.rawData);
        this.root = d3.hierarchy(hierarchicalData, d => d.children);
        this.root.x0 = 0;
        this.root.y0 = 0;

        if (this.root.children) {
            this.root.children.forEach(this._collapse.bind(this));
        }

        this._update();
    }

    _collapse(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
            d._children.forEach(this._collapse.bind(this));
        }
    }

    _handleNodeClick(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        } else {
            this._openModal(d.data);
            return;
        }
        this._update();
    }

    _update() {
        const nodes = this.root.descendants();
        const links = this.root.links();

        this.tree(this.root);

        this.g.selectAll('.link').remove();
        this.g.selectAll('.node').remove();

        this.g.selectAll('.link')
            .data(links)
            .enter().append('path')
            .attr('class', 'link')
            .attr("fill", "none")
            .attr("stroke", "#B0B0B0")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5)
            .attr('d', d => `M${d.source.x},${d.source.y}C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`);

        const node = this.g.selectAll('.node')
            .data(nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on('click', this._handleNodeClick.bind(this));

        node.append('circle')
            .attr('r', 6)
            .style('fill', d => this.options.colorScale(d.data.category))
            .attr("stroke", d => d._children ? "#2d3748" : "none")
            .attr("stroke-width", 2);

        node.append('text')
            .attr('dy', '.31em')
            .attr('y', -14)
            .attr('text-anchor', 'middle')
            .text(d => d.data.name)
            .call(this._wrapText.bind(this), this.options.nodeWidth - 20);
    }

    _wrapText(textSelection, width) {
        textSelection.each(function() {
            const text = d3.select(this);
            const words = text.text().split(/\s+/).reverse();
            let word;
            let line = [];
            let lineNumber = 0;
            const lineHeight = 1.1; // ems
            const y = text.attr("y");
            const dy = parseFloat(text.attr("dy"));
            text.text(null);
            let tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width && line.length > 1) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    _openModal(data) {
        const modal = document.getElementById('cv-modal');
        if (!modal) return;
        if (!data.company && !data.date && (!data.details || data.details.length === 0) && !data.link && !data.badge) return;

        document.getElementById('modal-title').textContent = data.name || 'Details';
        document.getElementById('modal-company').textContent = data.company || '';
        document.getElementById('modal-date').textContent = data.date || '';

        const detailsContainer = document.getElementById('modal-details');
        detailsContainer.innerHTML = '';
        if (data.details && data.details.length > 0) {
            const ul = document.createElement('ul');
            data.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                ul.appendChild(li);
            });
            detailsContainer.appendChild(ul);
        }

        const badgesContainer = document.getElementById('modal-badges-container');
        badgesContainer.innerHTML = '';
        if (data.badge) {
            const badgeImg = document.createElement('img');
            badgeImg.src = data.badge;
            badgeImg.alt = data.name + " badge";
            badgeImg.className = 'modal-badge-img';
            badgesContainer.appendChild(badgeImg);
        }

        const linkContainer = document.getElementById('modal-link-container');
        linkContainer.innerHTML = '';
        if (data.link) {
            const a = document.createElement('a');
            a.href = data.link;
            a.textContent = 'View Related Project';
            a.className = 'btn btn-primary';
            a.style.marginTop = '1rem';
            a.target = '_blank';
            linkContainer.appendChild(a);
        }

        modal.style.display = "block";
    }
}