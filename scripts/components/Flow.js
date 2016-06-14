import React, { Component } from 'react';

export default class Flow extends Component {
    constructor(props) {
        super(props);

        this.state = props.flow;
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="box box-widget widget-user">
                    <div className="widget-user-header bg-black" style={{background: 'url("../dist/img/photo1.png") center center'}}>
                        <h3 className="widget-user-username">{ this.state.developerName }</h3>
                        <h5 className="widget-user-desc"><em>{ this.state.developerSummary || 'No description' }</em></h5>
                    </div>
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-sm-6 border-right">
                                <div className="description-block">
                                    <h5 className="description-header" title={ this.state.dateModified }>{ relativeDate(Date.parse(this.state.dateModified)) }</h5>
                                    <span className="description-text">Last Modified</span>
                                </div>
                            </div>
                            <div className="col-sm-6 border-right">
                                <div className="description-block">
                                    <h5 className="description-header">13,000</h5>
                                    <span className="description-text">FOLLOWERS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}