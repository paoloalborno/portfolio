document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'Frontend', description: 'User initiates login with GitHub account.', arrow_label: 'Sends OAuth Request' },
        { label: 'Firebase', description: 'Authenticates user and returns a signed JWT.', arrow_label: 'Sends Firebase JWT' },
        { label: 'Backend', description: 'Receives and validates the Firebase JWT signature and expiration.', arrow_label: 'Queries for User Role' },
        { label: 'Database', description: 'Returns the user role (e.g., ADMIN) to the backend.', arrow_label: 'Returns Role' },
        { label: 'Backend', description: 'Generates a custom, lightweight JWT containing user roles and permissions.', arrow_label: 'Sends Custom JWT' },
        { label: 'Frontend', description: 'Receives the custom JWT and stores it for subsequent authenticated API calls.', arrow_label: 'Session Authenticated' }
    ];

    const width = 800;
    const blockHeight = 80;
    const blockWidth = 220;
    const arrowSpacing = 60;
    const totalHeight = data.length * (blockHeight + arrowSpacing);

    const svg = d3.select('#d3-graph')
        .append('svg')
        .attr('width', width)
        .attr('height', totalHeight)
        .style('display', 'block')
        .style('margin', 'auto');

    // Function to wrap text
    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = 0, // Initial dy is 0
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
                }
            }
        });
    }

    const blocks = svg.selectAll('g.block')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'block')
        .attr('transform', (d, i) => `translate(${ (width - blockWidth) / 2}, ${i * (blockHeight + arrowSpacing)})`);

    blocks.append('rect')
        .attr('width', blockWidth)
        .attr('height', blockHeight)
        .attr('fill', '#f0f0f0')
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8);

    const text = blocks.append('text')
        .attr('x', blockWidth / 2)
        .attr('y', blockHeight / 2 - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#333');

    text.append('tspan')
        .attr('x', blockWidth / 2)
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(d => d.label);

    blocks.append('text')
        .attr('x', blockWidth / 2)
        .attr('y', blockHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#555')
        .style('font-size', '12px')
        .text(d => d.description)
        .call(wrap, blockWidth - 20);

    // Add arrows and labels
    const arrows = svg.selectAll('g.arrow-group')
        .data(data.slice(0, -1))
        .enter()
        .append('g')
        .attr('class', 'arrow-group');

    arrows.append('line')
        .attr('x1', width / 2)
        .attr('y1', (d, i) => (i * (blockHeight + arrowSpacing)) + blockHeight)
        .attr('x2', width / 2)
        .attr('y2', (d, i) => (i * (blockHeight + arrowSpacing)) + blockHeight + arrowSpacing)
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

    arrows.append('text')
        .attr('x', width / 2 + 15)
        .attr('y', (d, i) => (i * (blockHeight + arrowSpacing)) + blockHeight + arrowSpacing / 2)
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
