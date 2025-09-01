/**
 * =================================================================================
 * portfolio-backend-graph.js - D3.js script for the architecture visualization
 * =================================================================================
 *
 * This script uses D3.js to generate an SVG block diagram that visualizes the
 * authentication flow of the portfolio's backend.
 *
 * It dynamically adjusts the size of the blocks to fit the text content and
 * adds labels to the arrows to describe the actions at each step.
 *
 */
document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'Frontend', description: 'User initiates login with GitHub account.', arrow_label: 'Sends OAuth Request', icon: '../../assets/images/icons/GitHub.png' },
        { label: 'Firebase', description: 'Authenticates user and returns a signed JWT.', arrow_label: 'Sends Firebase JWT', icon: '../../assets/images/icons/Firebase.png' },
        { label: 'Backend', description: 'Receives and validates the Firebase JWT.', arrow_label: 'Queries for User Role', icon: '../../assets/images/icons/Spring.png' },
        { label: 'Database', description: 'Returns the user role to the backend.', arrow_label: 'Returns Role', icon: '../../assets/images/icons/PostgreSQL.png' },
        { label: 'Backend', description: 'Generates a custom JWT with user roles.', arrow_label: 'Sends Custom JWT', icon: '../../assets/images/icons/Spring.png' },
        { label: 'Frontend', description: 'Receives and stores the custom JWT for authenticated API calls.', arrow_label: 'Session Authenticated', icon: '../../assets/images/icons/HTML5.png' }
    ];

    const width = 800;
    const initialBlockWidth = 250;
    const arrowSpacing = 60;
    const padding = 30; // Increased padding

    const svg = d3.select('#d3-graph')
        .append('svg')
        .attr('width', width)
        .style('display', 'block')
        .style('margin', 'auto');

    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy") || 0),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    const blocks = svg.selectAll('g.block')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'block');

    const rects = blocks.append('rect')
        .attr('fill', '#f0f0f0')
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8);

    const textLabels = blocks.append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('fill', '#333')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(d => d.label);

    const textDescriptions = blocks.append('text')
        .attr('class', 'description')
        .attr('dy', 0)
        .attr('text-anchor', 'middle')
        .attr('fill', '#555')
        .style('font-size', '12px')
        .text(d => d.description)
        .call(wrap, initialBlockWidth - padding);

    const icons = blocks.append('image')
        .attr('xlink:href', d => d.icon)
        .attr('width', 30)
        .attr('height', 30);

    blocks.each(function(d) {
        const block = d3.select(this);
        const label = block.select('.label');
        const description = block.select('.description');
        const rect = block.select('rect');
        const icon = block.select('image');

        const labelBBox = label.node().getBBox();
        const descriptionBBox = description.node().getBBox();

        const rectWidth = Math.max(labelBBox.width, descriptionBBox.width) + 2 * padding + 40; // Add space for icon
        const rectHeight = Math.max(60, labelBBox.height + descriptionBBox.height + padding);

        rect.attr('width', rectWidth)
            .attr('height', rectHeight);

        label.attr('x', rectWidth / 2)
             .attr('y', rectHeight / 2 - 10);

        description.attr('x', rectWidth / 2)
                   .attr('y', rectHeight / 2 + 10);

        icon.attr('x', padding / 2)
            .attr('y', (rectHeight - 30) / 2);

        block.attr('transform', `translate(${ (width - rectWidth) / 2}, 0)`);
    });

    let yOffset = 0;
    blocks.each(function(d, i) {
        const block = d3.select(this);
        const rectHeight = block.select('rect').attr('height');
        block.attr('transform', function() {
            const currentTransform = d3.select(this).attr('transform');
            const newTransform = currentTransform.replace(/, 0\)/, `, ${yOffset})`);
            yOffset += parseFloat(rectHeight) + arrowSpacing;
            return newTransform;
        });
    });

    svg.attr('height', yOffset);

    const arrows = svg.selectAll('g.arrow-group')
        .data(data.slice(0, -1))
        .enter()
        .append('g')
        .attr('class', 'arrow-group');

    arrows.append('line')
        .attr('x1', width / 2)
        .attr('y1', (d, i) => {
            const block = blocks.nodes()[i];
            const y = parseFloat(d3.select(block).attr('transform').split(',')[1].replace(')', ''));
            const h = parseFloat(d3.select(block).select('rect').attr('height'));
            return y + h;
        })
        .attr('x2', width / 2)
        .attr('y2', (d, i) => {
            const block = blocks.nodes()[i+1];
            const y = parseFloat(d3.select(block).attr('transform').split(',')[1].replace(')', ''));
            return y;
        })
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

    arrows.append('text')
        .attr('x', width / 2 + 15)
        .attr('y', (d, i) => {
            const block1 = blocks.nodes()[i];
            const y1 = parseFloat(d3.select(block1).attr('transform').split(',')[1].replace(')', ''));
            const h1 = parseFloat(d3.select(block1).select('rect').attr('height'));
            const block2 = blocks.nodes()[i+1];
            const y2 = parseFloat(d3.select(block2).attr('transform').split(',')[1].replace(')', ''));
            return (y1 + h1 + y2) / 2;
        })
        .attr('text-anchor', 'start')
        .attr('fill', '#007bff')
        .style('font-size', '12px')
        .style('font-style', 'italic')
        .text(d => d.arrow_label);

    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#007bff');
});
