document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'Frontend', description: 'User logs in via Firebase Auth' },
        { label: 'Firebase', description: 'Returns signed JWT to frontend' },
        { label: 'Backend', description: 'Receives and validates Firebase JWT' },
        { label: 'Database', description: 'Backend queries user roles' },
        { label: 'Backend', description: 'Generates custom JWT' },
        { label: 'Frontend', description: 'Receives custom JWT for session' }
    ];

    const width = 800;
    const height = 500;
    const blockHeight = 60;
    const blockWidth = 180;
    const arrowSpacing = 40;
    const totalHeight = data.length * (blockHeight + arrowSpacing);

    const svg = d3.select('#d3-graph')
        .append('svg')
        .attr('width', width)
        .attr('height', totalHeight)
        .style('display', 'block')
        .style('margin', 'auto');

    const blocks = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${ (width - blockWidth) / 2}, ${i * (blockHeight + arrowSpacing)})`);

    blocks.append('rect')
        .attr('width', blockWidth)
        .attr('height', blockHeight)
        .attr('fill', '#2c2c2c')
        .attr('stroke', '#00ff99')
        .attr('stroke-width', 2)
        .attr('rx', 5)
        .attr('ry', 5);

    const text = blocks.append('text')
        .attr('x', blockWidth / 2)
        .attr('y', blockHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white');

    text.append('tspan')
        .attr('x', blockWidth / 2)
        .attr('dy', '-0.2em')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(d => d.label);

    text.append('tspan')
        .attr('x', blockWidth / 2)
        .attr('dy', '1.2em')
        .style('font-size', '12px')
        .attr('fill', '#cccccc')
        .text(d => d.description);


    // Add arrows between blocks
    const arrows = svg.selectAll('line.arrow')
        .data(data.slice(0, -1))
        .enter()
        .append('line')
        .attr('class', 'arrow')
        .attr('x1', width / 2)
        .attr('y1', (d, i) => (i * (blockHeight + arrowSpacing)) + blockHeight)
        .attr('x2', width / 2)
        .attr('y2', (d, i) => (i * (blockHeight + arrowSpacing)) + blockHeight + arrowSpacing)
        .attr('stroke', '#00ff99')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

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
        .attr('fill', '#00ff99');
});
