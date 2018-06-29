import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class UserCard extends PureComponent {
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
	username: PropTypes.string.isRequired,
	rating: PropTypes.string.isRequired,
	avatar: PropTypes.object.isRequired
};