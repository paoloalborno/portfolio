/**
 * SimpleTree - A library to create and manage a collapsible D3 tree graph.
 */
class SimpleTree {
    constructor(container, initialData, options = {}) {
        if (!container || !initialData) {
            console.error("SimpleTree needs a container element and data to initialize.");
            return;
        }
        const defaults = {
            margin: { top: 40, right: 90, bottom: 50, left: 90 },
            duration: 750,
            nodeSeparation: window.innerWidth < 768 ? 220 : 180,
            colorScale: d3.scaleOrdinal()
                .domain(["root", "section", "item", "skill_area", "skill", "summary"])
                .range(["#2d3748", "#4A5568", "#2B6CB0", "#319795", "#4299E1", "#6B46C1"])
        };
        this.options = { ...defaults, ...options };
        this.container = container;
        this.rawData = initialData;
        this.nodeCounter = 0;
        this.margin = this.options.margin;
        this.width = this.container.clientWidth - this.margin.left - this.margin.right;
        this.height = this.container.clientHeight - this.margin.top - this.margin.bottom;
        this.svg = d3.select(this.container).append("svg")
            .attr("width", this.width + this.margin.right + this.margin.left)
            .attr("height", this.height + this.margin.top + this.margin.bottom);
        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
        this.tree = d3.tree().size([this.width, this.height]);
        this.root = null;
        this.colorScale = this.options.colorScale;
        this._setupDefs();
    }

    render() {
        const transformedData = this._transformData(this.rawData);
        this.root = d3.hierarchy(transformedData, d => d.children);
        this.root.x0 = this.width / 2;
        this.root.y0 = 0;
        if (this.root.children) {
            this.root.children.forEach(child => this._collapse(child));
        }
        this._update(this.root);
    }

    _setupDefs() {
        // SVG definitions remain the same
    }

    _transformData(data) {
        const isMobile = window.innerWidth < 768;

        const shorten = (name) => {
            if (!isMobile) return name;
            const shortNames = {
                // Italian
                "SENIOR SOFTWARE & DATA ENGINEER - PARTNER": "Sr. Engineer",
                "DOTTORANDO E ASSEGNISTA DI RICERCA": "PhD Researcher",
                "Dottorato in Informatica (Ph.D.)": "PhD in CS",
                "Laurea Magistrale in Ingegneria Informatica": "MSc in CS Eng.",
                "AWS Certified Solutions Architect – Associate": "AWS Architect",
                "Professional Scrum Master I (PSM I)": "Scrum Master",
                "Google Project Management Certificate": "Google PM Cert.",
                // English
                "SENIOR SOFTWARE & DATA ENGINEER - PARTNER": "Sr. Engineer",
                "PHD CANDIDATE AND RESEARCH FELLOW": "PhD Researcher",
                "PhD in Computer Science": "PhD in CS",
                "Master of Science in Computer Engineering": "MSc in CS Eng.",
                "AWS Certified Solutions Architect – Associate": "AWS Architect",
                "Professional Scrum Master I (PSM I)": "Scrum Master",
                "Google Project Management Certificate": "Google PM Cert."
            };
            return shortNames[name] || name;
        };

        const transformNode = (node) => {
            // Create the 'name' property for display, but keep the original 'title'
            if (node.title) {
                node.name = shorten(node.title);
            }
            if (node.children) {
                node.children.forEach(transformNode);
            }
        };

        // Deep copy to avoid modifying original data
        const transformed = JSON.parse(JSON.stringify(data));

        // Use profile name and title from data for the root node
        const root = { name: transformed.profile.name || "Root", category: "root", children: [] };

        // Dynamically create sections from the 'sections' object in the data
        const sectionKeys = ['experience', 'education', 'certifications', 'skills'];

        sectionKeys.forEach(key => {
            if (transformed.sections[key] && transformed[key]) {
                const sectionNode = {
                    name: transformed.sections[key].title,
                    category: "section",
                    children: []
                };

                if (key === 'skills') {
                    for (const categoryName in transformed.skills) {
                        const categoryNode = {
                            name: categoryName,
                            category: "skill_area",
                            children: transformed.skills[categoryName].map(skill => ({ name: skill, category: "skill" }))
                        };
                        sectionNode.children.push(categoryNode);
                    }
                } else {
                    sectionNode.children = transformed[key];
                }

                root.children.push(sectionNode);
            }
        });

        transformNode(root);
        return root;
    }

    _update(source) {
        const treeLayoutData = this.tree(this.root);
        let nodes = treeLayoutData.descendants();
        let links = treeLayoutData.links();

        nodes.forEach(d => { d.y = d.depth * this.options.nodeSeparation; });

        let node = this.g.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++this.nodeCounter));

        let nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", `translate(${source.x0},${source.y0})`)
            .on('click', (event, d) => this._click(event, d));

        nodeEnter.append('circle')
            .attr('r', 1e-6)
            .style("filter", "url(#shadow)");

        const wrapWidth = window.innerWidth < 500 ? 80 : 120;

        nodeEnter.append('text')
            .attr("y", d => d.children || d._children ? -20 : 20)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.data.name)
            .call(this._wrapText.bind(this), wrapWidth);

        let nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(this.options.duration)
            .attr("transform", d => `translate(${d.x},${d.y})`);

        nodeUpdate.select('circle')
            .attr('r', 12)
            .style("fill", d => `url(#gradient-${(d.data.category || 'item').replace(/\s/g, '-')})`)
            .attr('cursor', 'pointer');

        nodeUpdate.select('text').style("fill-opacity", 1);

        let nodeExit = node.exit().transition()
            .duration(this.options.duration)
            .attr("transform", `translate(${source.x},${source.y})`)
            .remove();

        nodeExit.select('circle').attr('r', 1e-6);
        nodeExit.select('text').style('fill-opacity', 1e-6);

        let link = this.g.selectAll('path.link')
            .data(links, d => d.target.id);

        let linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', d => {
                const o = {x: source.x0, y: source.y0};
                return d3.linkVertical().x(d => d.x).y(d => d.y)({source: o, target: o});
            });

        let linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(this.options.duration)
            .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y));

        link.exit().transition()
            .duration(this.options.duration)
            .attr('d', d => {
                const o = {x: source.x, y: source.y};
                return d3.linkVertical().x(d => d.x).y(d => d.y)({source: o, target: o});
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    _click(event, d) {
        if (d.children || d._children) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this._update(d);
        } else {
            this._openModal(d.data);
        }
    }

    _collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(child => this._collapse(child));
            d.children = null;
        }
    }

    _wrapText(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1,
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy") || 0),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", dy + "em");

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width && line.length > 1) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("dy", `${lineHeight}em`).text(word);
                }
            }
        });
    }

    _openModal(data) {
        const modal = document.getElementById('cv-modal');
        if (!modal) return;

        // Only open modal for nodes that have actual details
        if (!data.company && !data.date && (!data.details || data.details.length === 0)) {
            return;
        }

        document.getElementById('modal-title').textContent = data.title || 'Details';
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

        const linkContainer = document.getElementById('modal-link-container');
        linkContainer.innerHTML = '';
        if (data.link) {
            const a = document.createElement('a');
            a.href = data.link;
            a.textContent = 'View Related Project';
            a.className = 'btn';
            a.target = '_blank';
            linkContainer.appendChild(a);
        }

        modal.style.display = "block";
    }
}
