import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import TasksPanel from "./tasksPanel.jsx";
import ParentSize from "../responsive/ParentSize.jsx";
import CodeEditor, { CODE_EDITOR_THEME, PROGRAMMING_LANGUAGE } from "../common/codeEditor.jsx";

import "./codeBattleField.less";

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
						<TasksPanel isUserSide={true} data={currentUserTasksPanel}/>
					</div>
					<div className="code-editor-container">
						<ParentSize>
							{props => (
								<CodeEditor
									{...props}
									theme={CODE_EDITOR_THEME.DARK}
									language={PROGRAMMING_LANGUAGE.C_CPP}/>
							)}
						</ParentSize>
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
