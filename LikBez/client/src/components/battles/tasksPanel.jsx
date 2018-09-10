import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import UserCard from "./userCard.jsx";
import Task from "./task.jsx";

export default class TasksPanel extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { isUserSide, data: { userCard, tasks } } = this.props;

		return (
			<section className="task-panel">
				<UserCard {...userCard}/>
				{isUserSide &&
					<div className="control-panel">
						<button type="button">Skip task</button>
						<button type="button">
							Optimize <span className="underlined-text">(+ additional time)</span>
						</button>
					</div>}
				<ul className="task-list">
					{_.map(tasks, (task, index) => <Task key={index} {...task}/>)}
				</ul>
			</section>
		);
	}
}

TasksPanel.propTypes = {
	isUserSide: PropTypes.bool,
	data: PropTypes.shape({
		userCard: PropTypes.object,
		tasks: PropTypes.arrayOf(PropTypes.object)
	})
};