document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'User', description: 'Provides a prompt and send it to Agent', arrow_label: 'Send Prompt', icon: '../../assets/images/icons/User.png' },
        { label: 'Agent Ollama', description: 'Prepare the prompt and send it to Ollama', arrow_label: 'Interact with Model', icon: '../../assets/images/icons/Ollama.png' },
        { label: 'LLM Model', description: 'Receives prompt and generates a response.', arrow_label: 'Generate Response', icon: '../../assets/images/icons/AI.png' },
        { label: 'Agent Ollama', description: 'Formats the response and sends it back to the user.', arrow_label: 'Format Response', icon: '../../assets/images/icons/Ollama.png' },
        { label: 'User', description: 'Read response and continue the conversation.', arrow_label: 'Receive Response', icon: '../../assets/images/icons/User.png' }
    ];

    const svgWidth = 600;
    const boxWidth = 380;
    const boxHeight = 80;
    const arrowSpacing = 50;

    const svg = d3.select('#d3-graph-ollama-container')
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

    // Add loop arrow from last box to first box
    const lastBoxY = (data.length - 1) * (boxHeight + arrowSpacing) + boxHeight / 2;
    const firstBoxY = boxHeight / 2;
    const curveOffset = 100; // How far to the right the curve goes

    const loopGroup = svg.append('g').attr('class', 'loop-arrow-group');

    // Create curved path for the loop arrow
    const pathData = `M ${svgWidth / 2 + boxWidth / 2} ${lastBoxY} 
                      Q ${svgWidth / 2 + boxWidth / 2 + curveOffset} ${(lastBoxY + firstBoxY) / 2} 
                      ${svgWidth / 2 + boxWidth / 2} ${firstBoxY}`;

    loopGroup.append('path')
        .attr('d', pathData)
        .attr('fill', 'none')
        .attr('stroke', '#28a745')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead-loop)');

    // Add label for the loop arrow
    loopGroup.append('text')
        .attr('x', svgWidth / 2 + boxWidth / 2 + curveOffset + 10)
        .attr('y', (lastBoxY + firstBoxY) / 2)
        .attr('text-anchor', 'start')
        .attr('fill', '#28a745')
        .style('font-size', '12px')
        .style('font-style', 'italic')
        .text('Continue Loop');

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

    // Add arrowhead for loop arrow
    svg.select('defs').append('marker')
        .attr('id', 'arrowhead-loop')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#28a745');
});