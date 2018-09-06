import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import TasksPanel from "./tasksPanel.jsx";
import CodeEditor from "./codeEditor.jsx";
import ParentSize from "../responsive/ParentSize.jsx";
import { CODE_EDITOR_THEME, PROGRAMMING_LANGUAGE } from "./constants";

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
						<TasksPanel data={currentUserTasksPanel}/>
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
