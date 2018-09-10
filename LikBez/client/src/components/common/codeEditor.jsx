import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import brace from "brace";

import * as randomHelper from "../../helpers/randomHelper";

import "brace/mode/javascript";
import "brace/mode/python";
import "brace/mode/java";
import "brace/mode/c_cpp";

import "brace/theme/monokai";
import "brace/theme/xcode";

export const CODE_EDITOR_THEME = {
	DARK: "dark",
	LIGHT: "light"
};

export const PROGRAMMING_LANGUAGE = {
	JS: "javascript",
	C_CPP: "c_cpp",
	PYTHON: "python",
	JAVA: "java"
};

export default class CodeEditor extends PureComponent {
	constructor(props) {
		super(props);

		this.uniqueName = randomHelper.generateGUID();
	}

	render() {
		const { uniqueName } = this;
		const { theme, language, width, height } = this.props;
		const toPluginTheme = {
			[CODE_EDITOR_THEME.DARK]: "monokai",
			[CODE_EDITOR_THEME.LIGHT]: "xcode"
		};

		return (
			<AceEditor
				width={`${width}px`}
				height={`${height}px`}
				name={uniqueName}
				mode={language}
				theme={toPluginTheme[theme]}
				fontSize={14}
			/>
		);
	}
}

CodeEditor.defaultValues = {
	theme: CODE_EDITOR_THEME.DARK,
	language: PROGRAMMING_LANGUAGE.C_CPP
};

CodeEditor.propTypes = {
	theme: PropTypes.string,
	language: PropTypes.string
};
