import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CodeBattleField from "./battles/codeBattleField.jsx";

import "./Reset.less";
import "./App.less";

export default class App extends Component {
    render() {
        return (
            <CodeBattleField
                currentUserTasksPanel={{}}
                opponentTasksPanel={{}}
            />
        );
    }
}
