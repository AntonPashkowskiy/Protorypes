import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class UserCard extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { username, rating, avatar } = this.props;

		return (
			<div className="user-card">
				<img className="avatar" src={avatar} alt="user"/>
				<div className="user-info">
					<span className="user-name">{username}</span>
					<span className="rating">{rating}</span>
				</div>
			</div>
		);
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