import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import TasksPanel from "./tasksPanel.jsx";
import CodeEditor from "./codeEditor.jsx";
import { CODE_EDITOR_THEME, PROGRAMMING_LANGUAGE } from "./constants";

export default class CodeBattlesField extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { currentUserTasksPanel, opponentTasksPanel } = this.props;

		return (
			<React.Fragment>
				<div className="toolbar-container">

				</div>
				<div className="workspace">
					<div className="task-panel-container">
						<TasksPanel data={currentUserTasksPanel}/>
					</div>
					<div className="code-editor-container">
						<CodeEditor
							theme={CODE_EDITOR_THEME.LIGHT}
							language={PROGRAMMING_LANGUAGE.C_CPP}/>
					</div>
					<div className="task-panel-container">
						<TasksPanel data={opponentTasksPanel}/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

CodeBattlesField.propTypes = {
	currentUserTasksPanel: PropTypes.object.isRequired,
	opponentTasksPanel: PropTypes.object.isRequired
};
