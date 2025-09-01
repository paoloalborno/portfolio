document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'Frontend', description: 'User initiates login with GitHub account.', arrow_label: 'Sends OAuth Request', icon: '../../assets/images/icons/GitHub.png' },
        { label: 'Firebase', description: 'Authenticates user and returns a signed JWT.', arrow_label: 'Sends Firebase JWT', icon: '../../assets/images/icons/Firebase.png' },
        { label: 'Backend', description: 'Receives and validates the Firebase JWT.', arrow_label: 'Queries for User Role', icon: '../../assets/images/icons/Spring.png' },
        { label: 'Database', description: 'Returns the user role to the backend.', arrow_label: 'Returns Role', icon: '../../assets/images/icons/PostgresSQL.png' },
        { label: 'Backend', description: 'Generates a custom JWT with user roles.', arrow_label: 'Sends Custom JWT', icon: '../../assets/images/icons/Spring.png' },
        { label: 'Frontend', description: 'Stores the custom JWT and use it for auth API calls.', arrow_label: 'Session Authenticated', icon: '../../assets/images/icons/HTML5.png' }
    ];

    const svgWidth = 600;
    const boxWidth = 380;    // Larghezza fissa
    const boxHeight = 80;   // Altezza fissa
    const arrowSpacing = 50;

    const svg = d3.select('#d3-graph')
        .append('svg')
        .attr('width', svgWidth)
        .style('display', 'block')
        .style('margin', 'auto');

    const blocks = svg.selectAll('g.block')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'block')
        .attr('transform', (d, i) => `translate(${(svgWidth - boxWidth)/2}, ${i * (boxHeight + arrowSpacing)})`);

    // Rettangolo fisso
    blocks.append('rect')
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('fill', '#f0f0f0')
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8);

    // Label
    blocks.append('text')
        .attr('x', boxWidth/2)
        .attr('y', boxHeight/2 - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.label);

    // Descrizione
    blocks.append('text')
        .attr('x', boxWidth/2)
        .attr('y', boxHeight/2 + 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#555')
        .text(d => d.description);

    // Icona
    const iconSize = 30;
    const iconPadding = 10; // distanza tra icona e testo

    blocks.append('image')
        .attr('xlink:href', d => d.icon)
        .attr('x', 20) // bordo sinistro
        .attr('y', (boxHeight - iconSize)/2)
        .attr('width', iconSize)
        .attr('height', iconSize);

    // Altezza SVG
    svg.attr('height', data.length * (boxHeight + arrowSpacing));

    // Frecce
    const arrows = svg.selectAll('g.arrow-group')
        .data(data.slice(0, -1))
        .enter()
        .append('g')
        .attr('class', 'arrow-group');

    arrows.append('line')
        .attr('x1', svgWidth/2)
        .attr('y1', (d, i) => i * (boxHeight + arrowSpacing) + boxHeight)
        .attr('x2', svgWidth/2)
        .attr('y2', (d, i) => (i+1) * (boxHeight + arrowSpacing))
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

    arrows.append('text')
        .attr('x', svgWidth / 2 + 10) // 10px a destra della linea
        .attr('y', (d, i) => i * (boxHeight + arrowSpacing) + boxHeight + arrowSpacing / 2) // metà tra i due blocchi
        .attr('text-anchor', 'start') // centra orizzontalmente
        .attr('fill', '#007bff')
        .style('font-size', '12px')
        .style('font-style', 'italic')
        .text(d => d.arrow_label);

    // Marker freccia
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