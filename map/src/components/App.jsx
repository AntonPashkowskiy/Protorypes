import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import MultilayerMap from "./MultilayerMap.jsx";

import "./Reset.less";
import "./App.less";

export default class App extends Component {
    render() {
        const config = {
            nodeStyle: {
                type: "circle",
                properties: {
                    radius: 12,
					color: "#D71920",
					strokeWidth: 5,
                    strokeColor: "#000000",
                    strokeOpacity: 0.5
                }
            },
            leafNodeStyle: {
                type: "circle",
                properties: {
                    radius: 12,
					color: "#34689A",
					strokeWidth: 4,
                    strokeColor: "#000000",
                    strokeOpacity: 0.5
                }
            },
            rootLayer: {
                coordinates: [
                    [-94.565559, 39.015697],
                    [-90.199402, 38.627003],
                    [-93.258133, 44.986656]
                ],
                subLayers: [
                    {
                        entryPoint: [-94.565559, 39.015697],
                        coordinates: [
                            [-94.565559, 39.015697],
                            [-90.199402, 38.627003],
                            [-93.258133, 44.986656]
                        ],
                        subLayers: []
                    },
                    {
                        entryPoint: [-90.199402, 38.627003],
                        coordinates: [
                            [-94.565559, 39.015697],
                            [-90.199402, 38.627003],
                            [-93.258133, 44.986656]
                        ],
                        subLayers: []
                    },
                    {
                        entryPoint: [-93.258133, 44.986656],
                        coordinates: [
                            [-94.565559, 39.015697],
                            [-90.199402, 38.627003],
                            [-93.258133, 44.986656]
                        ],
                        subLayers: []
                    }
                ]
            },
            leafInfo: [
                {
                    coordinate: [-94.565559, 39.015697],
                    info: {
                        longtitude: 80,
                        latitude: 90
                    }
                }
            ],
            leafInfoRender: (listInfo) => {
                return (
                    <div>
                        Longtitude: {listInfo.longtitude},
                        Latitude: {listInfo.latitude}
                    </div>
                );
            }
        };

        return (
            <div style={{width: "600px", height: "600px"}}>
                <MultilayerMap config={config}/>
            </div>
        );
    }
}
