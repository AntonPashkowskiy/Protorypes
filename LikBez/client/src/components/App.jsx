import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CodeBattleField from "./battles/codeBattleField.jsx";
import { ATTEMPT } from "../constants";

import "./Reset.less";
import "./App.less";

export default class App extends Component {
    render() {
        const taskPanelData = {
            userCard: {
                username: "Jafar Referenso",
                rating: 12.2,
                avatar: "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100"
            },
            tasks: [
                {
                    taskName: "TASK 1",
                    spendTime: 1000,
                    attempts: [ ATTEMPT.SUCCESS, ATTEMPT.UNUSED, ATTEMPT.UNUSED ],
                    existingCode: ""
                },
                {
                    taskName: "TASK 2",
                    spendTime: 1000,
                    attempts: [ ATTEMPT.FAILED, ATTEMPT.SUCCESS, ATTEMPT.UNUSED ],
                    existingCode: ""
                },
                {
                    taskName: "TASK 3",
                    spendTime: 1000,
                    attempts: [ ATTEMPT.FAILED, ATTEMPT.FAILED, ATTEMPT.FAILED ],
                    existingCode: ""
                }
            ]
        };

        return (
            <CodeBattleField
                currentUserTasksPanel={taskPanelData}
                opponentTasksPanel={taskPanelData}
            />
        );
    }
}
