import React, { Component } from 'react';
import update from 'immutability-helper';
import go from 'gojs';
const $ = go.GraphObject.make;

import FlowsSource from '../../sources/FlowsSource';
import FlowGraphSource from '../../sources/FlowGraphSource';

import LoadingSpinner from '../LoadingSpinner';
import EmptyControl from '../controls/EmptyControl';
import StepControl from '../controls/StepControl';
import EventHandler from '../../EventHandler';

export default class FlowGraph extends Component {
    constructor(props) {
        super(props);

        this.renderCanvas = this.renderCanvas.bind(this);

        this.state = {
            model: null,
            diagram: null,
            graph: {
                editingToken: '',
                mapElements: []
            }
        };
    }

    createGraph() {
        let diagram = $(go.Diagram, this.refs.graph, { initialContentAlignment: go.Spot.Center });

        diagram.addDiagramListener('PartCreated', (event) => {
            console.log(event);
        });

        diagram.toolManager.clickCreatingTool.archetypeNodeData = {
            key: "Noooode", text: "yo mamma", color: 'green'
        };
        diagram.toolManager.draggingTool.isGridSnapEnabled = true;

        diagram.nodeTemplate =
            $(go.Node, "Auto",
                new go.Binding("location", "loc", go.Point.parse),
                $(go.Shape, 'RoundedRectangle',
                    { stroke: null },
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    { margin: 15, stroke: 'white' },
                    new go.Binding("text", "name")),
                {
                    doubleClick: (e, obj) => {
                        var data = obj.part.data;

                        var control;

                        switch (data.elementType) {
                            case 'step':
                                control = <StepControl key={ data.key } id={ data.key } editingToken={ this.state.graph.editingToken } flow={ this.state.graph.id.id } />;
                                break;
                            default:
                                control = <EmptyControl key="" />;
                                break;
                        }

                        EventHandler.emit('control.close');
                        EventHandler.emit('control.render', control, this.updateGraph);
                    }
                }
            );

        diagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.AvoidsNodes,
                    corner: 10 },
                $(go.Shape),                           // this is the link shape (the line)
                $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
                $(go.Panel, "Auto",  // this whole Panel is a link label
                    $(go.Shape, "Rectangle", { fill: "white" }),
                    $(go.TextBlock, { margin: 3 },
                        new go.Binding("text", "name"))
                )
            );

        this.setState(update(this.state, { $set: { diagram: diagram }}));
    }

    createNode(mapElement) {
        var elementColor;

        switch (mapElement.elementType.toLowerCase()) {
            case 'start':
                elementColor = 'green';
                break;
            case 'step':
                elementColor = 'cornflowerblue';
                break;
            default:
                elementColor = 'white';
                break;
        }

        return {
            key: mapElement.id,
            name: mapElement.developerName,
            color: elementColor,
            loc: mapElement.x + ' ' + mapElement.y,
            elementType: mapElement.elementType
        };
    }

    renderCanvas() {

        diagram.model = this.state.model;

        this.setState(update(this.state, { $set: { diagram: diagram }}));
    }

    updateGraph() {
        FlowGraphSource.find(this.props.params.id).then(data => {
            this.setState(update(this.state, {
                $set: { graph: data }
            }));

            var nodeData = this.state.graph.mapElements.map(mapElement => {
                return this.createNode(mapElement);
            });

            var linkData = [];

            this.state.graph.mapElements.forEach(function (mapElement) {
                if (mapElement.outcomes) {
                    mapElement.outcomes.forEach(function (outcome) {
                        linkData.push({
                            from: mapElement.id,
                            to: outcome.nextMapElementId,
                            name: outcome.developerName
                        });
                    });
                }
            });

            let model = new go.GraphLinksModel(
                nodeData,
                linkData
            );

            var diagram = this.state.diagram;

            diagram.model = model;

            this.setState(update(this.state, {
                $set: { model: model, diagram: diagram }
            }));
        });
    }

    componentDidMount() {
        FlowsSource.find(this.props.params.id).then(data => {
            this.setState(update(this.state, {
                $set: { flow: data }
            }));

            this.createGraph();

            this.updateGraph();

            this.renderCanvas();
        });
    }

    componentWillUpdate(prevProps) {
        console.log('sup');

        if (this.props.data !== prevProps.data) {
            console.log('Updating');
            const model = this.state.model;
            const diagram = this.state.diagram;
            model.nodeDataArray = this.props.data;
            diagram.model = model;
            this.setState({ model: model, diagram: diagram });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        return <div ref="graph" style={{'width': '100%', 'height': 'calc(100% - 50px)', 'backgroundColor': '#DAE4E4'}}></div>;
    }
}