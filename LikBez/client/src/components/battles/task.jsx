import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { ATTEMPT } from "../../constants";


const Task = ({ taskName, attempts }) => {
	const attemptToClass = {
		[ATTEMPT.SUCCESS]: "success",
		[ATTEMPT.FAILED]: "failed",
		[ATTEMPT.UNUSED]: "unused"
	};

	return (
		<React.Fragment>
			<li className="task">
				<span className="task-name">{taskName}</span>
				<ul className="attempts">
					<li className={attemptToClass[attempts[0]]}></li>
					<li className={attemptToClass[attempts[1]]}></li>
					<li className={attemptToClass[attempts[2]]}></li>
				</ul>
			</li>
		</React.Fragment>
	);
};

Task.defaultProps = {
	spendedTime: 0
};

Tasks.propTypes = {
	taskName: PropTypes.string.isRequired,
	spendedTime: PropTypes.number,
	attempts: PropTypes.arrayOf(PropTypes.bool),
	existingCode: PropTypes.string
};

export default Task;