import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class TasksPanel extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return null;
	}
}

TasksPanel.propTypes = {
	data: PropTypes.shape({
		userCard: PropTypes.object,
		tasks: PropTypes.arrayOf(PropTypes.object)
	})
};