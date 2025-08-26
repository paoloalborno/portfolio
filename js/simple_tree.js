/**
 * SimpleTree - A library to create and manage a collapsible D3 tree graph.
 *
 * This library is designed to be easy to use for those not familiar with the
 * complexities of D3.js. It encapsulates the D3 logic and provides a simple API.
 */
class SimpleTree {
    /**
     * Initializes the tree.
     * @param {HTMLElement} container - The DOM element where the graph will be rendered.
     * @param {Object} initialData - The initial data for the tree (e.g., cvData).
     */
    constructor(container, initialData, options = {}) {
        if (!container || !initialData) {
            console.error("SimpleTree needs a container element and data to initialize.");
            return;
        }

        // --- Default Options ---
        const defaults = {
            margin: { top: 40, right: 90, bottom: 50, left: 90 },
            duration: 750,
            nodeSeparation: 180,
            colorScale: d3.scaleOrdinal()
                .domain(["root", "section", "item", "skill_area", "skill"])
                .range(["#2d3748", "#4A5568", "#2B6CB0", "#319795", "#4299E1"])
        };

        // Merge user options with defaults
        this.options = { ...defaults, ...options };

        // --- Core Properties ---
        this.container = container;
        this.rawData = initialData;
        this.nodeCounter = 0;

        // --- D3 Setup ---
        this.margin = this.options.margin;
        this.width = this.container.clientWidth - this.margin.left - this.margin.right;
        this.height = this.container.clientHeight - this.margin.top - this.margin.bottom;

        this.svg = d3.select(this.container).append("svg")
            .attr("width", this.width + this.margin.right + this.margin.left)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        this.tree = d3.tree().size([this.width, this.height]);
        this.root = null; // Will be initialized in render()

        // Use the color scale from options
        this.colorScale = this.options.colorScale;

        this._setupDefs();
    }

    /**
     * Public method to render the initial state of the tree.
     */
    render() {
        const transformedData = this._transformData(this.rawData);
        this.root = d3.hierarchy(transformedData, d => d.children);
        this.root.x0 = this.width / 2;
        this.root.y0 = 0;

        // Collapse after the first level
        this.root.children.forEach(child => this._collapse(child));
        this._update(this.root);
    }

    // --- PUBLIC API METHODS ---

    /**
     * Finds a node in the tree by its name. This is a helper for other API methods.
     * @param {string} nodeName - The name of the node to find.
     * @returns {d3.HierarchyNode|null} The D3 node if found, otherwise null.
     */
    findNode(nodeName) {
        let foundNode = null;
        if (this.root) {
            this.root.each(d => {
                if (d.data.name === nodeName) {
                    foundNode = d;
                }
            });
        }
        return foundNode;
    }

    /**
     * Adds a new node to the tree.
     * @param {Object} newNodeData - The data for the new node (e.g., {name: 'New Skill', category: 'skill'}).
     * @param {string} parentName - The name of the parent node to attach the new node to.
     */
    addNode(newNodeData, parentName) {
        const parentNode = this.findNode(parentName);
        if (!parentNode) {
            console.error(`Parent node '${parentName}' not found.`);
            return;
        }

        // If parent is collapsed, we must expand it to show the new node
        if (parentNode._children) {
            parentNode.children = parentNode._children;
            parentNode._children = null;
        }

        // Create a new hierarchy node from the data
        const newNode = d3.hierarchy(newNodeData);

        // If parent had no children, initialize the array
        if (!parentNode.children) {
            parentNode.children = [];
        }

        // Add the new node
        parentNode.children.push(newNode);

        // Redraw the tree starting from the parent
        this._update(parentNode);
    }

    /**
     * Removes a node from the tree.
     * @param {string} nodeName - The name of the node to remove.
     */
    removeNode(nodeName) {
        const nodeToRemove = this.findNode(nodeName);
        if (!nodeToRemove) {
            console.error(`Node '${nodeName}' not found.`);
            return;
        }
        if (!nodeToRemove.parent) {
            console.error("Cannot remove the root node.");
            return;
        }

        const parent = nodeToRemove.parent;
        // Filter out the node to be removed
        parent.children = parent.children.filter(child => child.id !== nodeToRemove.id);

        // If the parent has no more children, it should not be expandable
        if (parent.children.length === 0) {
            parent.children = null;
        }

        this._update(parent);
    }

    /**
     * Updates the data of an existing node.
     * @param {string} nodeName - The name of the node to update.
     * @param {Object} newData - The new data to apply to the node (e.g., {name: 'Updated Name'}).
     */
    updateNode(nodeName, newData) {
        const nodeToUpdate = this.findNode(nodeName);
        if (!nodeToUpdate) {
            console.error(`Node '${nodeName}' not found.`);
            return;
        }

        // Merge new data with existing data
        Object.assign(nodeToUpdate.data, newData);

        // We need to redraw from the node itself to update its label, etc.
        this._update(nodeToUpdate);
    }


    // --- "PRIVATE" METHODS (D3 LOGIC) ---

    /**
     * Sets up SVG definitions like gradients and filters.
     * @private
     */
    _setupDefs() {
        const defs = this.svg.append("defs");

        // Drop shadow filter
        const filter = defs.append("filter").attr("id", "shadow").attr("height", "150%");
        filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 4).attr("result", "blur");
        filter.append("feOffset").attr("in", "blur").attr("dx", 3).attr("dy", 3).attr("result", "offsetBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "offsetBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Gradients for node colors
        const categories = this.colorScale.domain();
        categories.forEach(category => {
            const color = this.colorScale(category);
            const gradient = defs.append("linearGradient")
                .attr("id", `gradient-${category.replace(/\s/g, '-')}`)
                .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%");
            gradient.append("stop").attr("offset", "0%").attr("stop-color", d3.color(color).brighter(0.8));
            gradient.append("stop").attr("offset", "100%").attr("stop-color", d3.color(color).darker(0.5));
        });
    }

    /**
     * Transforms the raw CV data into a hierarchical structure for D3.
     * @param {Object} data - The raw cvData object.
     * @returns {Object} The transformed hierarchical data.
     * @private
     */
    _transformData(data) {
        const root = { name: "Paolo Alborno", category: "root", children: [] };
        const expNode = { name: "Esperienze", category: "section", children: [] };
        data.experience.forEach(exp => expNode.children.push({ name: exp.title, category: "item", details: exp.details, company: exp.company, date: exp.date, link: exp.link }));
        const eduNode = { name: "Istruzione", category: "section", children: [] };
        data.education.forEach(edu => eduNode.children.push({ name: edu.title, category: "item", details: edu.details, company: edu.company, date: edu.date }));
        const skillsNode = { name: "Competenze", category: "section", children: [] };
        for (const areaName in data.competency_areas) {
            const area = data.competency_areas[areaName];
            const areaNode = { name: areaName, category: "skill_area", children: [] };
            area.skills.forEach(skill => areaNode.children.push({ name: skill, category: "skill" }));
            skillsNode.children.push(areaNode);
        }
        const certNode = { name: "Certificazioni", category: "section", children: [] };
        data.certifications.forEach(cert => certNode.children.push({ name: cert.title, category: "item", details: cert.details }));

        // Shorten names for mobile view
        if (window.innerWidth < 768) {
            expNode.name = "Exp.";
            eduNode.name = "Edu.";
            skillsNode.name = "Skills";
            certNode.name = "Certs.";
        }

        root.children.push(expNode, eduNode, skillsNode, certNode);
        return root;
    }

    /**
     * The main D3 update function that redraws the tree.
     * @param {Object} source - The node that was clicked to trigger the update.
     * @private
     */
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

        // Add a foreignObject to allow for HTML content (like icons)
        const nodeContent = nodeEnter.append("foreignObject")
            .attr("width", 30)
            .attr("height", 30)
            .attr("x", -15)
            .attr("y", -15)
            .style("overflow", "visible");

        nodeContent.append("xhtml:div")
            .attr("class", "node-html-container")
            .append("xhtml:i")
            .attr("class", "fas"); // Placeholder, will be updated dynamically

        const wrapWidth = window.innerWidth < 500 ? 80 : 120; // Use viewport width to determine wrap width

        nodeEnter.append('text')
            .attr("y", d => d.children || d._children ? -25 : 25)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.data.name)
            .style("font-weight", d => d.children || d._children ? 600 : 400)
            .style("fill-opacity", 1e-6)
            .call(this._wrapText.bind(this), wrapWidth);

        let nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(this.options.duration)
            .attr("transform", d => `translate(${d.x},${d.y})`);

        nodeUpdate.select("i.fas")
            .attr("class", d => {
                let baseClass = "fas ";
                if (d.children) return baseClass + "fa-minus-circle";
                if (d._children) return baseClass + "fa-plus-circle";
                return baseClass + "fa-info-circle";
            })
            .style("color", d => this.colorScale(d.data.category));

        nodeUpdate.select('div.node-html-container')
             .attr('cursor', 'pointer');

        nodeUpdate.select('text').style("fill-opacity", 1);

        let nodeExit = node.exit().transition()
            .duration(this.options.duration)
            .attr("transform", d => `translate(${source.x},${source.y})`)
            .remove();

        nodeExit.select('foreignObject').remove(); // Or transition out
        nodeExit.select('text').style('fill-opacity', 1e-6);

        let link = this.g.selectAll('path.link')
            .data(links, d => d.id);

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

    /**
     * Handles click events on nodes to expand/collapse or open a modal.
     * @param {Event} event - The click event.
     * @param {Object} d - The D3 node data.
     * @private
     */
    _click(event, d) {
        if (d.children || d._children) { // Internal node
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this._update(d);
        } else { // Leaf node
            this._openModal(d.data);
        }
    }

    /**
     * Recursively collapses nodes.
     * @param {Object} d - The D3 node to collapse.
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
     * Wraps long text labels into multiple lines.
     * @param {d3.Selection} text - The D3 text selection.
     * @param {number} width - The maximum width for the text.
     * @private
     */
    _wrapText(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.2, // ems
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
                    tspan = text.append("tspan").attr("x", 0).attr("dy", lineHeight + "em").text(word);
                }
            }

            const lineCount = text.selectAll("tspan").size();
            const textBlockHeight = lineCount > 1 ? text.node().getBBox().height : 0;
            const initialY = parseFloat(y);

            if (initialY > 0) {
                text.attr("y", initialY + 5);
            } else {
                text.attr("y", initialY - (textBlockHeight > 0 ? textBlockHeight - 10 : 0));
            }
        });
    }

    /**
     * Opens the details modal.
     * @param {Object} data - The data for the node to display in the modal.
     * @private
     */
    _openModal(data) {
        const modal = document.getElementById('cv-modal');
        if (!modal) return;

        if (!data.company && !data.date && (!data.details || data.details.length === 0)) {
            return;
        }

        document.getElementById('modal-title').textContent = data.name || 'Dettagli';
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
            a.textContent = 'Vedi Progetto Correlato';
            a.className = 'btn btn-primary';
            a.style.marginTop = '1rem';
            a.target = '_blank';
            linkContainer.appendChild(a);
        }

        modal.style.display = "block";
    }
}
