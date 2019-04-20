import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ParentSize } from "@vx/responsive";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";

import "./MultilayerMap.less";

export default class MultilayerMap extends PureComponent {
	constructor(props) {
		super(props);

		this.getInitialStateObject = this.getInitialStateObject.bind(this);
		this.renderMap = this.renderMap.bind(this);
		this.getSubLayer = this.getSubLayer.bind(this);
		this.isLeafNode = this.isLeafNode.bind(this);
		this.onRegularNodeClick = this.onRegularNodeClick.bind(this);
		this.onZoomControlClick = this.onZoomControlClick.bind(this);
		this.goToSublayer = this.goToSublayer.bind(this);
		this.goToParentLayer = this.goToParentLayer.bind(this);
		this.onMouseEnterOnNode = this.onMouseEnterOnNode.bind(this);
		this.onMouseLeaveNode = this.onMouseLeaveNode.bind(this);
		this.splitCoordinatesOnRegularAndLeaf = this.splitCoordinatesOnRegularAndLeaf.bind(this);

		const { config } = this.props;
		this.state = this.getInitialStateObject(this.props.config);

		this.mapComponent = ReactMapboxGl({
			accessToken: config.token,
			scrollZoom: false,
			doubleClickZoom: false
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getInitialStateObject(nextProps.config));
	}

	splitCoordinatesOnRegularAndLeaf(layer) {
		return {
			regularNodeCoordinates: _.filter(layer.coordinates, coordinate => !this.isLeafNode(layer, coordinate)),
			leafNodeCoordinates: _.filter(layer.coordinates, coordinate => this.isLeafNode(layer, coordinate)),
		};
	}

	getInitialStateObject(config) {
		const rootLayer = config.rootLayer;
		const { regularNodeCoordinates, leafNodeCoordinates } = this.splitCoordinatesOnRegularAndLeaf(rootLayer);

		return {
			currentLayer: rootLayer,
			regularNodeStyle: this.transformStyleFormat(config.regularNodeStyle),
			leafNodeStyle: this.transformStyleFormat(config.leafNodeStyle),
			regularNodeCoordinates,
			leafNodeCoordinates,
			parentLayers: [],
			popupInformation: null
		};
	}

	goToSublayer(currentLayer, subLayer) {
		let parentLayers = this.state.parentLayers || [];
		const { regularNodeCoordinates, leafNodeCoordinates } = this.splitCoordinatesOnRegularAndLeaf(subLayer);

		parentLayers.push(currentLayer);

		this.setState({
			parentLayers,
			currentLayer: subLayer,
			regularNodeCoordinates,
			leafNodeCoordinates,
			popupInformation: null
		});
	}

	goToParentLayer() {
		let parentLayers = this.state.parentLayers || [];
		let parentLayer = parentLayers.pop();
		const { regularNodeCoordinates, leafNodeCoordinates } = this.splitCoordinatesOnRegularAndLeaf(parentLayer);

		if (parentLayer) {
			this.setState({
				parentLayers,
				currentLayer: parentLayer,
				regularNodeCoordinates,
				leafNodeCoordinates,
				popupInformation: null
			});
		}
	}

	transformStyleFormat(apiFormattedStyle) {
		const properties = apiFormattedStyle.properties;

		return {
			type: apiFormattedStyle.type,
			paint: {
				"circle-radius": properties.radius,
				"circle-color": properties.color,
				"circle-stroke-width": properties.strokeWidth,
				"circle-stroke-color": properties.strokeColor,
				"circle-stroke-opacity": properties.strokeOpacity
			}
		};
	}

	getBoundsCoordinates(coordinates) {
		const precision = 0.1;

		const maxLongtitude = _.max(_.map(coordinates, coordinate => coordinate[0]));
		const minLongtitude = _.min(_.map(coordinates, coordinate => coordinate[0]));
		const longtitudePadding = (maxLongtitude - minLongtitude) * precision;

		const maxLatitude = _.max(_.map(coordinates, coordinate => coordinate[1]));
		const minLatitude = _.min(_.map(coordinates, coordinate => coordinate[1]));
		const latitudePadding = (maxLatitude - minLatitude) * precision;

		return [
			[maxLongtitude + longtitudePadding, maxLatitude + latitudePadding],
			[minLongtitude - longtitudePadding, minLatitude - latitudePadding]
		];
	}

	isCoordinatesEqual(firstCoordinate, secondCoordinate) {
		return firstCoordinate[0] === secondCoordinate[0] &&
			firstCoordinate[1] === secondCoordinate[1];
	}

	getSubLayer(layer, coordinate) {
		return _.find(layer.subLayers, subLayer => this.isCoordinatesEqual(subLayer.entryPoint, coordinate));
	}

	isLeafNode(layer, coordinate) {
		return !this.getSubLayer(layer, coordinate);
	}

	onRegularNodeClick(coordinate) {
		const { currentLayer } = this.state;
		const subLayer = this.getSubLayer(currentLayer, coordinate);

		if (subLayer) {
			this.goToSublayer(currentLayer, subLayer);
		}
	}

	onZoomControlClick(map, zoomDiff) {
		if (zoomDiff < 0) {
			this.goToParentLayer();
		}
	}

	onMouseEnterOnNode(coordinate) {
		const { currentLayer } = this.state;
		const isLeafNode = this.isLeafNode(currentLayer, coordinate);
		let nodesInformation = isLeafNode ?
			this.props.config.leafNodesInformation :
			this.props.config.regularNodesInformation;

		if (nodesInformation && nodesInformation.length) {
			const nodeInformation = _.find(nodesInformation, info => this.isCoordinatesEqual(info.coordinate, coordinate));

			if (nodeInformation) {
				this.setState({
					popupInformation: {
						coordinate: nodeInformation.coordinate,
						information: nodeInformation.information,
						isLeafNode: isLeafNode
					}
				});
			}
		}
	}

	onMouseLeaveNode() {
		this.setState({ popupInformation: null });
	}

	onMapStyleLoad(currentBoundCoordinates, map) {
		map.resize();
		map.fitBounds(currentBoundCoordinates);
	}

	renderMap(width, height) {
		let LeafNodePopup = this.props.config.leafNodePopup;
		let RegularNodePopup = this.props.config.regularNodePopup;
		const {
			currentLayer,
			regularNodeStyle,
			regularNodeCoordinates,
			leafNodeStyle,
			leafNodeCoordinates,
			popupInformation,
			parentLayers
		} = this.state;

		const currentBoundCoordinates = this.getBoundsCoordinates(currentLayer.coordinates);
		const Map = this.mapComponent;
		const mapContainerStyle = {
			width: `${width}px`,
			height: `${height}px`
		};

		// Empty component if not specified
		RegularNodePopup = RegularNodePopup || (() => null);
		const PopupInformationControl = (popupInformation && popupInformation.isLeafNode) ? LeafNodePopup : RegularNodePopup;

		return (
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				fitBounds={currentBoundCoordinates}
				onStyleLoad={this.onMapStyleLoad.bind(this, currentBoundCoordinates)}
				containerStyle={mapContainerStyle}>

					{regularNodeCoordinates.length &&
						<Layer type={regularNodeStyle.type} id="regularNodesLayer" paint={regularNodeStyle.paint}>
							{regularNodeCoordinates.map((coordinate, index) => (
								<Feature
									key={index}
									coordinates={coordinate}
									onClick={this.onRegularNodeClick.bind(this, coordinate)}
									onMouseEnter={this.onMouseEnterOnNode.bind(this, coordinate)}
									onMouseLeave={this.onMouseLeaveNode}/>
							))}
						</Layer>
					}

					{leafNodeCoordinates.length &&
						<Layer type={leafNodeStyle.type} id="leafNodesLayer" paint={leafNodeStyle.paint}>
							{leafNodeCoordinates.map((coordinate, index) => (
								<Feature
									key={index}
									coordinates={coordinate}
									onMouseEnter={this.onMouseEnterOnNode.bind(this, coordinate)}
									onMouseLeave={this.onMouseLeaveNode}/>
							))}
						</Layer>
					}

					{parentLayers.length && <ZoomControl onControlClick={this.onZoomControlClick}/>}

					{popupInformation &&
						<Popup
							coordinates={popupInformation.coordinate}
							anchor="bottom"
							offset={{"bottom": [0, -this.props.config.leafNodeStyle.properties.radius]}}>
							<PopupInformationControl information={popupInformation.information}/>
						</Popup>
					}
			</Map>
		);
	}

	render() {
		return (
			<ParentSize>
				{parent => this.renderMap(parent.width, parent.height)}
			</ParentSize>
		);
	}
}

MultilayerMap.propTypes = {
	config: PropTypes.object.isRequired
};