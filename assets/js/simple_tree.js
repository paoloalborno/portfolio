/**
 * @class SimpleTree
 * A D3.js collapsible tree chart with smooth animations and enhanced visuals.
 *
 * This class creates an interactive, hierarchical tree graph. It is designed to be
 * easily maintainable and customizable. To modify the tree's content (i.e., add,
 * remove, or change nodes), you only need to edit the structured data in `cv_data.js`.
 * The tree will automatically update based on the data provided.
 *
 * Key features:
 * - Smooth expand/collapse animations using D3's enter/update/exit pattern.
 * - Curved links for a more polished look.
 * - Improved label readability with text halos and strategic positioning.
 * - Well-commented code to facilitate future modifications.
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
            duration: 750, // Animation duration in milliseconds
            colorScale: d3.scaleOrdinal()
                .domain(["root", "section_experience", "experience_item", "section_education", "education_item", "section_certifications", "certification_item", "section_skills", "skill_area", "skill"])
                .range(["#2d3748", "#E53E3E", "#C53030", "#D69E2E", "#D69E2E", "#319795", "#2C7A7B", "#4A5568", "#2B6CB0", "#4299E1"])
        };

        this.options = { ...defaults, ...options };
        this.container = container;
        this.rawData = initialData;
        this.nodeCounter = 0; // Used to assign unique IDs to nodes
    }

    _setupTreeLayout() {
        // Creates a new tree layout with a given node size.
        this.tree = d3.tree().nodeSize([this.options.nodeWidth, this.options.nodeHeight]);
    }

    /**
     * Transforms the flat CV data into a hierarchical structure suitable for D3.
     * @param {object} data - The raw data from cv_data.js.
     * @returns {object} A hierarchical root node.
     */
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

    /**
     * Main rendering function. Sets up the SVG and starts the D3 visualization.
     */
    render() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Clear any existing SVG to ensure a clean slate.
        d3.select(this.container).select("svg").remove();

        // Create the main SVG container.
        this.svg = d3.select(this.container).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("font", "12px sans-serif")
            .style("user-select", "none");

        // Create a group element to hold the tree, and center it.
        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.width / 2},${this.options.margin.top})`);

        // Transform the raw data into a D3 hierarchy.
        const hierarchicalData = this._transformData(this.rawData);
        this.root = d3.hierarchy(hierarchicalData, d => d.children);
        this.root.x0 = 0;
        this.root.y0 = 0;

        // Start with all children collapsed.
        if (this.root.children) {
            this.root.children.forEach(this._collapse.bind(this));
        }

        this._update(this.root);
    }

    /**
     * Recursively collapses all children of a given node.
     * @param {object} d - The node to collapse.
     */
    _collapse(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
            d._children.forEach(this._collapse.bind(this));
        }
    }

    /**
     * Handles click events on nodes.
     * - If the node has children, it toggles their visibility.
     * - If the node is a leaf, it opens a modal with details.
     * @param {object} event - The click event.
     * @param {object} d - The clicked node.
     */
    _handleNodeClick(event, d) {
        // Toggle children's visibility on click.
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        } else {
            // If it's a leaf node with details, open the modal.
            this._openModal(d.data);
            return;
        }
        this._update(d); // Pass the clicked node as the source for animations.
    }

    /**
     * The core update function that handles rendering and animating the tree.
     * @param {object} source - The node that was clicked, used as the origin for animations.
     */
    _update(source) {
        const duration = this.options.duration;
        const treeLayout = this.tree(this.root);
        const nodes = treeLayout.descendants();
        const links = treeLayout.links();

        // Normalize for fixed-depth.
        nodes.forEach(d => { d.y = d.depth * this.options.nodeHeight; });

        // --- NODES ---
        // 1. Data-join: Bind the nodes data to the '.node' elements.
        const node = this.g.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++this.nodeCounter));

        // 2. ENTER selection: Create new nodes at the parent's previous position.
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('transform', `translate(${source.x0},${source.y0})`)
            .on('click', this._handleNodeClick.bind(this));

        nodeEnter.append('circle')
            .attr('r', 1e-6) // Start with a tiny radius for animation
            .style('fill', d => this.options.colorScale(d.data.category))
            .attr("stroke", "#ccc") // Default stroke for all nodes
            .attr("stroke-width", 1.5);

        nodeEnter.append('text')
            .attr('dy', '.31em')
            // Position label below for leaf nodes, above for others.
            .attr('y', d => d.children || d._children ? -20 : 20)
            .attr('text-anchor', 'middle')
            .text(d => d.data.name)
            .call(this._wrapText.bind(this), this.options.nodeWidth - 20)
            .clone(true).lower() // Create a clone for the "halo" effect
            .attr('stroke-linejoin', 'round')
            .attr('stroke-width', 3)
            .attr('stroke', 'white');

        // 3. UPDATE selection: Transition nodes to their new position.
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration)
            .attr('transform', d => `translate(${d.x},${d.y})`);

        // Update the circle attributes
        nodeUpdate.select('circle')
            .transition()
            .duration(duration)
            .attr('r', 8) // Increase radius for better visibility
            .style('fill', d => this.options.colorScale(d.data.category))
            // Make border thicker and darker for collapsed nodes to indicate they are clickable.
            .attr("stroke", d => d._children ? "#2d3748" : "#ccc")
            .attr("stroke-width", d => d._children ? 3 : 1.5);

        // Update the text position
        nodeUpdate.select('text')
            .transition()
            .duration(duration)
            .attr('y', d => d.children || d._children ? -20 : 20);

        // 4. EXIT selection: Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition()
            .duration(duration)
            .attr('transform', `translate(${source.x},${source.y})`)
            .remove();

        nodeExit.select('circle').attr('r', 1e-6);
        nodeExit.select('text').style('fill-opacity', 1e-6);

        // --- LINKS ---
        // 1. Data-join: Bind the links data to the '.link' elements.
        const link = this.g.selectAll('path.link')
            .data(links, d => d.target.id);

        // 2. ENTER selection: Create new links from the parent's previous position.
        const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr("fill", "none")
            .attr("stroke", "#B0B0B0")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5)
            .attr('d', d => {
                const o = { x: source.x0, y: source.y0 };
                return d3.linkVertical()({ source: o, target: o });
            });

        // 3. UPDATE selection: Transition links to their new position.
        linkEnter.merge(link).transition()
            .duration(duration)
            .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y));

        // 4. EXIT selection: Transition exiting links to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr('d', d => {
                const o = { x: source.x, y: source.y };
                return d3.linkVertical()({ source: o, target: o });
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    /**
     * Wraps long text labels into multiple lines.
     * @param {object} textSelection - The D3 text selection.
     * @param {number} width - The maximum width for the text.
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
     * Opens a modal window with details about a specific CV item.
     * @param {object} data - The data for the selected item.
     */
    _openModal(data) {
        const modal = document.getElementById('cv-modal');
        if (!modal) return;
        // Do not open modal for nodes without details (like skill categories)
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