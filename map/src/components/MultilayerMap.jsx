import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ParentSize } from "@vx/responsive";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import "./MultilayerMap.less";

export default class MultilayerMap extends PureComponent {
	constructor(props) {
		super(props);
		this.renderMap = this.renderMap.bind(this);
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	renderMap(width, height, config) {
		const Map = ReactMapboxGl({
			accessToken: "pk.eyJ1IjoiYW50b24tcGFzaGtvdXNraSIsImEiOiJjam1hYjduZnUwOGphM3BvZ3Vwc3hsM3NrIn0.uP22N1el75_qWLJnCtAJXg"
		});

		return (
			<Map
			style="mapbox://styles/mapbox/streets-v9"
			containerStyle={{
				width: `${width}px`,
				height: `${height}px`
			}}>
				<Layer
					type="symbol"
					id="marker"
					layout={{ "icon-image": "marker-15" }}>
					<Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
				</Layer>
			</Map>
		);
	}

	render() {
		const { config } = this.props;

		return (
			<ParentSize>
				{parent => this.renderMap(parent.width, parent.height, config)}
			</ParentSize>
		);
	}
}

MultilayerMap.propTypes = {
	config: PropTypes.object
};