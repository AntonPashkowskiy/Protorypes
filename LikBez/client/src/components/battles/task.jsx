import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Task extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return null;
	}
}

Task.defaultProps = {
	spendedTime: ""
};

Tasks.propTypes = {
	taskName: PropTypes.string.isRequired,
	spendedTime: PropTypes.string,
	attempts: PropTypes.arrayOf(PropTypes.object)
};