import React from 'react';
import {scaleLinear} from 'd3-scale';
import {max} from 'd3-array';
import {select} from 'd3-selection';

class BarChart extends React.Component {
	constructor() {
		super();
		this.createBarChart = this.createBarChart.bind(this);
	}

	componentDidMount()
	{
		this.createBarChart();
	}

	componentDidUpdate()
	{
		this.createBarChart();
	}

	createBarChart() {
		const node = this.node;
		const dataMax = max(this.props.data);
		const xScale = scaleLinear().domain([0, dataMax])
						.range([0, this.props.size[0]]);

		var dataSel = select(node).selectAll('rect')
						.data(this.props.data);

		dataSel.enter().append('rect');

		dataSel.exit().remove();

		dataSel.style('fill', '#f9cb57')
				.attr('y' , (d, i) => i * 25)
				.attr('height', 25)
				.attr('x', 0)
				.attr('width', (d) => xScale(d));
	}



	createBarChartx() {
		const node = this.node;
		const dataMax = max(this.props.data);
		const yScale = scaleLinear().domain([0, dataMax])
						.range([0, this.props.size[1]]);

		var selection = select(node)
			.selectAll('rect')
			.data(this.props.data);

			selection
			.enter()
			.append('rect');

		selection
			.exit()
			.remove();

		selection
			.style('fill', '#f9cb57')
			.attr('x', (d, i) => i * 25)
			.attr('y', d => this.props.size[1] - yScale(d))
			.attr('height', d => yScale(d))
			.attr('width', 25);
	}

	render() {
		return (
			<svg className="barchart" ref={node => this.node = node} width={500} height={500}>
			</svg>
			);
	}
}

class BoxText extends React.Component {

	render() {
		return (
			<g>
				<rect 
			</g>
		);
	}
}
export default BarChart;