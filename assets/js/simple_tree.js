/**
 * @class SimpleTree
 * A modern, refactored D3.js collapsible tree chart component.
 * This class encapsulates the logic for rendering and interacting with a vertical tree diagram,
 * following D3 best practices for modularity, clarity, and stability.
 */
class SimpleTree {
    /**
     * Initializes the tree chart.
     * @param {HTMLElement} container - The DOM element to render the chart in.
     * @param {Object} initialData - The raw data to be transformed and visualized.
     * @param {Object} [options={}] - Configuration options for the chart.
     */
    constructor(container, initialData, options = {}) {
        if (!container || !initialData) {
            console.error("SimpleTree requires a container and initial data.");
            return;
        }

        this._setupProperties(container, initialData, options);
        this._setupSvg();
        this._setupTreeLayout();
    }

    /**
     * Sets up the core properties and configuration of the chart.
     * @private
     */
    _setupProperties(container, initialData, options) {
        const defaults = {
            margin: { top: 40, right: 20, bottom: 80, left: 20 },
            duration: 750,
            nodeWidth: 140,
            nodeHeight: 180,
            colorScale: d3.scaleOrdinal()
                .domain(["root", "section_experience", "experience_item", "section_education", "education_item", "section_certifications", "certification_item", "section_skills", "skill_area", "skill"])
                .range(["#2d3748", "#E53E3E", "#C53030", "#D69E2E", "#805AD5", "#319795", "#2C7A7B", "#4A5568", "#2B6CB0", "#4299E1"])
        };

        this.options = { ...defaults, ...options };
        this.container = container;
        this.rawData = initialData;
        this.nodeCounter = 0;

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
    }

    /**
     * Creates the main SVG and the primary group elements for links and nodes.
     * @private
     */
    _setupSvg() {
        d3.select(this.container).select("svg").remove();

        this.svg = d3.select(this.container).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("font", "12px sans-serif")
            .style("user-select", "none");

        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.width / 2},${this.options.margin.top})`);

        this.gLink = this.g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#B0B0B0")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5);

        this.gNode = this.g.append("g")
            .attr("cursor", "pointer");
    }

    /**
     * Initializes the D3 tree layout generator.
     * @private
     */
    _setupTreeLayout() {
        this.tree = d3.tree().nodeSize([this.options.nodeWidth, this.options.nodeHeight]);
    }

    /**
     * Transforms the raw CV data into a D3-compatible hierarchical structure.
     * @private
     */
    _transformData(data) {
        const transformed = JSON.parse(JSON.stringify(data));
        const root = { name: "Me", category: "root", children: [] };

        const sectionMap = {
            experience: "experience",
            education: "education",
            certifications: "certifications",
            skills: "skills"
        };

        Object.keys(sectionMap).forEach(key => {
            if (transformed.sections[key] && transformed[key]) {
                const sectionCategory = `section_${sectionMap[key]}`;
                const sectionNode = {
                    name: transformed.sections[key].title,
                    title: transformed.sections[key].title,
                    category: sectionCategory,
                    children: []
                };

                if (key === 'skills') {
                    for (const categoryName in transformed.skills) {
                        const categoryNode = {
                            name: categoryName,
                            category: "skill_area",
                            children: transformed.skills[categoryName].map(skill => ({
                                name: skill,
                                title: skill,
                                category: "skill"
                            }))
                        };
                        sectionNode.children.push(categoryNode);
                    }
                } else {
                    sectionNode.children = transformed[key].map(item => {
                        item.category = item.graph_category || `${sectionMap[key]}_item`;
                        item.name = item.title;
                        return item;
                    });
                }
                root.children.push(sectionNode);
            }
        });
        return root;
    }

    /**
     * Public method to render the initial state of the tree.
     * The root starts expanded, but its children start collapsed.
     */
    render() {
        const hierarchicalData = this._transformData(this.rawData);
        this.root = d3.hierarchy(hierarchicalData, d => d.children);
        this.root.x0 = 0;
        this.root.y0 = 0;

        // Collapse all nodes starting from the second level.
        // The root's direct children will be visible but collapsed.
        if (this.root.children) {
            this.root.children.forEach(this._collapse);
        }

        this._update(this.root);
    }

    /**
     * Recursively collapses a node and all its children.
     * This is used for setting up the initial state of the tree.
     * @private
     */
    _collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(child => this._collapse(child));
            d.children = null;
        }
    }

    /**
     * Handles click events on nodes to expand/collapse or open a modal.
     * This performs a simple toggle and does not recurse.
     * @private
     */
    _handleNodeClick(event, d) {
        // If the node has children, it's open; collapse it.
        if (d.children) {
            d._children = d.children;
            d.children = null;
        // If it has _children, it's closed; expand it.
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        // If it's a leaf node, open the modal.
        } else {
            this._openModal(d.data);
            return; // Don't call update if we're just opening a modal
        }

        this._update(d); // Redraw the tree from the clicked node.
    }

    /**
     * The core update function that redraws the tree based on a source node.
     * @param {d3.HierarchyNode} source - The node that was clicked, which acts as the origin for transitions.
     * @private
     */
    _update(source) {
        const duration = this.options.duration;
        const nodes = this.root.descendants().reverse();
        const links = this.root.links();

        this.tree(this.root);

        const nodeSelection = this.gNode.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++this.nodeCounter));

        const nodeEnter = nodeSelection.enter().append("g")
            .attr("class", "node")
            .attr("data-category", d => d.data.category)
            .attr("transform", `translate(${source.x0},${source.y0})`)
            .attr("opacity", 0)
            .on("click", (event, d) => this._handleNodeClick(event, d));

        nodeEnter.append("circle")
            .attr("r", 6)
            .attr("fill", d => this.options.colorScale(d.data.category))
            .attr("stroke-width", 10);

        nodeEnter.append("text")
            .attr("class", "node-label")
            .attr("dy", "0.31em")
            .attr("y", -14)
            .attr("text-anchor", "middle")
            .text(d => d.data.name)
            .call(this._wrapText.bind(this), this.options.nodeWidth - 20);

        const nodeUpdate = nodeSelection.merge(nodeEnter);

        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .attr("opacity", 1);

        nodeUpdate.select('circle')
            .attr("stroke", d => d._children ? "#2d3748" : "none")
            .attr("stroke-width", 2);

        nodeSelection.exit().transition()
            .duration(duration)
            .attr("transform", `translate(${source.x},${source.y})`)
            .attr("opacity", 0)
            .remove();

        const linkSelection = this.gLink.selectAll("path.link")
            .data(links, d => d.target.id);

        const linkEnter = linkSelection.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = { x: source.x0, y: source.y0 };
                return d3.linkVertical()({ source: o, target: o });
            });

        linkEnter.merge(linkSelection).transition()
            .duration(duration)
            .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y));

        linkSelection.exit().transition()
            .duration(duration)
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                return d3.linkVertical()({ source: o, target: o });
            })
            .remove();

        this.root.each(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    /**
     * Wraps long text labels into multiple lines.
     * @private
     */
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

    /**
     * Opens the details modal for a leaf node.
     * @private
     */
    _openModal(data) {
        const modal = document.getElementById('cv-modal');
        if (!modal) return;

        if (!data.company && !data.date && (!data.details || data.details.length === 0) && !data.link) {
            return;
        }

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