import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import MultilayerMap from "./MultilayerMap.jsx";

import "./Reset.less";
import "./App.less";

export default class App extends Component {
    render() {
        return (
            <div style={{width: "600px", height: "600px"}}>
                <MultilayerMap/>
            </div>
        );
    }
}
