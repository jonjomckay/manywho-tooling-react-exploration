import React, { Component } from 'react';
import update from 'immutability-helper';

import LoadingSpinner from '../LoadingSpinner';
import TypesSource from "../../sources/TypesSource";

export default class Type extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: {
                id: '',
                developerName: ''
            },
            loading: true
        };
    }

    componentDidMount() {
        TypesSource.find(this.props.params.id).then(data => {
            this.setState(update(this.state, {
                type: { $set: data },
                loading: { $set: false }
            }));
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <div>
                <section className="content-header">
                    <h1>{ this.state.type.developerName } <small>{ this.state.type.serviceElementId }</small></h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-aqua"><i className="fa fa-tags"/></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Properties</span>
                                    <span className="info-box-number">{ this.state.type.properties.length }</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-green"><i className="fa fa-database"/></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Bindings</span>
                                    <span className="info-box-number">{ this.state.type.bindings.length }</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-yellow"><i className="fa fa-files-o"/></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Uploads</span>
                                    <span className="info-box-number">13,648</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-red"><i className="fa fa-star-o"/></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Likes</span>
                                    <span className="info-box-number">93,139</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}