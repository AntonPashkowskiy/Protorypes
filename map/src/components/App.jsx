import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import MultilayerMap from "./MultilayerMap.jsx";

import "./Reset.less";
import "./App.less";

const RegularNodePopup = ({ information }) => {
    return <span>{information}</span>;
};

const LeafNodePopup = ({ information }) => {
    return (
        <div>
            Longtitude: {information.longtitude},
            Latitude: {information.latitude}
        </div>
    );
};

export default class App extends Component {
    render() {
        const config = {
            token: "pk.eyJ1IjoiYW50b24tcGFzaGtvdXNraSIsImEiOiJjam1hYjduZnUwOGphM3BvZ3Vwc3hsM3NrIn0.uP22N1el75_qWLJnCtAJXg",
            regularNodeStyle: {
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
                            [-94.665559, 39.215697],
                            [-94.365559, 39.315697],
                            [-94.865559, 39.815697],
                        ],
                        subLayers: []
                    },
                    {
                        entryPoint: [-90.199402, 38.627003],
                        coordinates: [
                            [-90.899402, 38.927003],
                            [-90.399402, 38.827003],
                            [-90.199402, 38.227003]
                        ],
                        subLayers: []
                    },
                    {
                        entryPoint: [-93.258133, 44.986656],
                        coordinates: [
                            [-93.458133, 44.186656],
                            [-93.258133, 44.586656],
                            [-93.858133, 44.986656]
                        ],
                        subLayers: []
                    }
                ]
            },
            regularNodesInformation: [
                {
                    coordinate: [-94.565559, 39.015697],
                    information: "Kansas City"
                },
                {
                    coordinate: [-90.199402, 38.627003],
                    information: "St. Louis"
                },
                {
                    coordinate: [-93.258133, 44.986656],
                    information: "Minneapolis"
                },
            ],
            leafNodesInformation: [
                {
                    coordinate: [-94.665559, 39.215697],
                    information: {
                        longtitude: 1,
                        latitude: 2
                    }
                },
                {
                    coordinate: [-94.365559, 39.315697],
                    information: {
                        longtitude: 3,
                        latitude: 4
                    }
                },
                {
                    coordinate: [-94.865559, 39.815697],
                    information: {
                        longtitude: 5,
                        latitude: 6
                    }
                },
                {
                    coordinate: [-90.899402, 38.927003],
                    information: {
                        longtitude: 7,
                        latitude: 8
                    }
                },
                {
                    coordinate: [-90.399402, 38.827003],
                    information: {
                        longtitude: 9,
                        latitude: 10
                    }
                },
                {
                    coordinate: [-90.199402, 38.227003],
                    information: {
                        longtitude: 11,
                        latitude: 12
                    }
                },
                {
                    coordinate: [-93.458133, 44.186656],
                    information: {
                        longtitude: 13,
                        latitude: 14
                    }
                },
                {
                    coordinate: [-93.258133, 44.586656],
                    information: {
                        longtitude: 15,
                        latitude: 16
                    }
                },
                {
                    coordinate: [-93.858133, 44.986656],
                    information: {
                        longtitude: 17,
                        latitude: 18
                    }
                }
            ],
            regularNodeInfoRender: regularNodeInfo => {
                return null;
            },
            regularNodePopup: RegularNodePopup,
            leafNodePopup: LeafNodePopup
        };

        return (
            <div style={{width: "600px", height: "600px"}}>
                <MultilayerMap config={config}/>
            </div>
        );
    }
}
