import React, { Component } from 'react';
import update from 'immutability-helper';
import ReactQuill from 'react-quill';

import ElementSource from "../../sources/ElementSource";

import ActionButtons from './ActionButtons';

export default class StepControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            element: {
                developerName: '',
                id: '',
                userContent: ''
            }
        };
    }

    componentDidMount() {
        ElementSource.find(this.props.id, this.props.flow, this.props.editingToken).then(data => {
            this.setState(update(this.state, {
                element: { $set: data }
            }));
        });
    }

    handleNameChange(event) {
        this.setState(update(this.state, {
            element: {
                developerName: { $set: event.target.value }
            }
        }));
    }

    handleUserContentChange(value) {
        this.setState(update(this.state, {
            element: {
                userContent: { $set: value }
            }
        }));
    }

    handleSubmit() {
        console.log('fffff');

        return ElementSource.update(this.props.flow, this.props.editingToken, this.state.element).then(data => {
            this.setState(update(this.state, {
                element: { $set: data }
            }));
        });
    }

    render() {
        return (
            <div>
                <div className="box-body">
                    <div className="col-sm-offset-2">
                        <h2>Edit Step</h2>
                    </div>

                    <br />

                    <div className="form-group">
                        <label htmlFor="flow-name" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="element-name" placeholder="Name"
                                   value={ this.state.element.developerName }
                                   onChange={ this.handleNameChange.bind(this) } />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="flow-summary" className="col-sm-2 control-label">Content</label>
                        <div className="col-sm-9">
                            <ReactQuill value={ this.state.element.userContent }
                                        onChange={ this.handleUserContentChange.bind(this) }
                                        theme="snow" />
                        </div>
                    </div>
                </div>

                <ActionButtons onSubmit={ this.handleSubmit.bind(this) } />
            </div>
        );
    }
}