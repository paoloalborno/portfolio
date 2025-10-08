document.addEventListener('DOMContentLoaded', function() {
    const graphData = {
        nodes: [
            { id: 1, label: 'MCP Client', description: 'Interactive user interface', icon: '../../assets/images/icons/MCP.png', x: 300, y: 50 },
            { id: 2, label: 'MCP Server', description: 'JSON-RPC entry point', icon: '../../assets/images/icons/MCP.png', x: 300, y: 175 },
            { id: 3, label: 'Tools', description: 'Individual analysis tools', icon: '../../assets/images/icons/cli.png', x: 100, y: 425 },
            { id: 4, label: 'Agent', description: 'Processes the entire pipeline', icon: '../../assets/images/icons/AI.png', x: 500, y: 425 },
            { id: 5, label: 'Vector Database', description: 'ChromaDB for semantic search', icon: '../../assets/images/icons/ChromaDB.png', x: 300, y: 550 },
            { id: 6, label: 'Handler.py', description: 'Routes calls to tools/agent', icon: '../../assets/images/icons/python.png', x: 300, y: 300 }
        ],
        links: [
            { source: 1, target: 2, label: 'JSON-RPC' },
            { source: 2, target: 6, label: 'Routes to' },
            { source: 6, target: 3, label: 'Invokes' },
            { source: 6, target: 4, label: 'Invokes' },
            { source: 3, target: 5, label: 'Uses' },
            { source: 4, target: 5, label: 'Uses' }
        ]
    };

    const svgWidth = 600;
    const svgHeight = 620;
    const boxWidth = 260;
    const boxHeight = 80;
    const iconSize = 30;

    const svg = d3.select('#d3-graph-ollama-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', svgHeight)
        .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

    // Define arrowhead marker
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 15) // Adjust this value for arrowhead positioning
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#007bff');

    // Draw links
    const links = svg.selectAll('g.link-group')
        .data(graphData.links)
        .enter()
        .append('g')
        .attr('class', 'link-group');

    links.append('line')
        .attr('x1', d => graphData.nodes.find(n => n.id === d.source).x)
        .attr('y1', d => graphData.nodes.find(n => n.id === d.source).y)
        .attr('x2', d => graphData.nodes.find(n => n.id === d.target).x)
        .attr('y2', d => graphData.nodes.find(n => n.id === d.target).y)
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

    // Draw link labels
    links.append('text')
        .attr('x', d => (graphData.nodes.find(n => n.id === d.source).x + graphData.nodes.find(n => n.id === d.target).x) / 2)
        .attr('y', d => (graphData.nodes.find(n => n.id === d.source).y + graphData.nodes.find(n => n.id === d.target).y) / 2 - 20)
        .attr('text-anchor', 'middle')
        .attr('fill', '#007bff')
        .style('font-size', '12px')
        .style('font-style', 'italic')
        .text(d => d.label);

    // Draw nodes
    const nodes = svg.selectAll('g.node')
        .data(graphData.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x - boxWidth / 2}, ${d.y - boxHeight / 2})`);

    nodes.append('rect')
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('fill', '#f0f0f0')
        .attr('stroke', '#007bff')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8);

    nodes.append('image')
        .attr('xlink:href', d => d.icon)
        .attr('x', 10)
        .attr('y', (boxHeight - iconSize) / 2)
        .attr('width', iconSize)
        .attr('height', iconSize);

    nodes.append('text')
        .attr('x', boxWidth / 2 + 10)
        .attr('y', boxHeight / 2 - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.label);

    nodes.append('text')
        .attr('x', boxWidth / 2 + 10)
        .attr('y', boxHeight / 2 + 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .attr('fill', '#555')
        .text(d => d.description);
});