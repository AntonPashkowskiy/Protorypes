import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class TimeCounter extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return "12:22";
	}
}

TimeCounter.propTypes = {
	tiksInSeconds: PropTypes.number
};