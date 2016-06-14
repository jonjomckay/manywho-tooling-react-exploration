import React, { Component } from 'react';

import { Link } from 'react-router';

export default class Flow extends Component {
    constructor(props) {
        super(props);

        this.state = props.flow;
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="box box-widget widget-flow">
                    <div className="widget-flow-header bg-black" style={{background: 'url("../dist/img/photo1.png") center center'}}>
                        <h3 className="widget-flow-name"><Link to={`/flows/${this.state.id.id}`}>{ this.state.developerName }</Link></h3>
                        <h5 className="widget-flow-desc"><em>{ this.state.developerSummary || 'No description' }</em></h5>
                    </div>
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-sm-2 border-right">
                                <Link to={`/flows/${this.state.id.id}`}>
                                    <div className="description-block">
                                        <h5 className="description-header"><i className="fa fa-folder-open"/></h5>
                                        <span className="description-text">OPEN</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-2 border-right">
                                <Link to={`/flows/${this.state.id.id}/edit`}>
                                    <div className="description-block">
                                        <h5 className="description-header"><i className="fa fa-pencil"/></h5>
                                        <span className="description-text">EDIT</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-2 border-right">
                                <div className="description-block text-red">
                                    <h5 className="description-header"><i className="fa fa-trash"/></h5>
                                    <span className="description-text">DELETE</span>
                                </div>
                            </div>
                            <div className="col-sm-6 border-right">
                                <div className="description-block">
                                    <h5 className="description-header" title={ this.state.dateModified }>
                                        { relativeDate(Date.parse(this.state.dateModified)) }
                                    </h5>
                                    <span className="description-text">Last Modified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}