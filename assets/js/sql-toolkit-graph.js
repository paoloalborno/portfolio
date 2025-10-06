document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'User via CLI', description: 'Executes a command via the CLI.', arrow_label: 'Input Command', icon: '../../assets/images/icons/cli.png' },
        { label: 'SQL Toolkit', description: 'Parses the command and generates a SQL query.', arrow_label: 'Generate SQL', icon: '../../assets/images/icons/Python.png' },
        { label: 'Database', description: 'Executes the SQL query and returns the result.', arrow_label: 'Return Result', icon: '../../assets/images/icons/MySQL.png' },
        { label: 'SQL Toolkit', description: 'Formats the result into a table view.', arrow_label: 'Format Table', icon: '../../assets/images/icons/Python.png' },
        { label: 'User via CLI', description: 'Views the formatted output in the console.', arrow_label: 'Display Output', icon: '../../assets/images/icons/cli.png' }
    ];

    const svgWidth = 600;
    const boxWidth = 380;
    const boxHeight = 80;
    const arrowSpacing = 50;

    const svg = d3.select('#d3-graph-sql-toolkit-container')
        .append('svg')
        .attr('width', svgWidth)
        .style('display', 'block')
        .style('margin', 'auto');

    const blocks = svg.selectAll('g.block')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'block')
        .attr('transform', (d, i) => `translate(${(svgWidth - boxWidth) / 2}, ${i * (boxHeight + arrowSpacing)})`);

    blocks.append('rect')
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('fill', '#f0f0f0')
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8);

    blocks.append('text')
        .attr('x', boxWidth / 2)
        .attr('y', boxHeight / 2 - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.label);

    blocks.append('text')
        .attr('x', boxWidth / 2)
        .attr('y', boxHeight / 2 + 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#555')
        .text(d => d.description);

    const iconSize = 30;
    blocks.append('image')
        .attr('xlink:href', d => d.icon)
        .attr('x', 20)
        .attr('y', (boxHeight - iconSize) / 2)
        .attr('width', iconSize)
        .attr('height', iconSize);

    svg.attr('height', data.length * (boxHeight + arrowSpacing));

    const arrows = svg.selectAll('g.arrow-group')
        .data(data.slice(0, -1))
        .enter()
        .append('g')
        .attr('class', 'arrow-group');

    arrows.append('line')
        .attr('x1', svgWidth / 2)
        .attr('y1', (d, i) => i * (boxHeight + arrowSpacing) + boxHeight)
        .attr('x2', svgWidth / 2)
        .attr('y2', (d, i) => (i + 1) * (boxHeight + arrowSpacing))
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

    arrows.append('text')
        .attr('x', svgWidth / 2 + 10)
        .attr('y', (d, i) => i * (boxHeight + arrowSpacing) + boxHeight + arrowSpacing / 2)
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
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#007bff');
});