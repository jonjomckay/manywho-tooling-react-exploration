import React, { Component } from 'react';

import ServicesSource from "../../sources/ServicesSource";

import LoadingSpinner from '../LoadingSpinner';

export default class Services extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [],
            loading: true
        };
    }

    componentWillMount() {
        ServicesSource.findAll().then(data => {
            this.setState({ services: data, loading: false });
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        var services = [];

        this.state.services.forEach(function (service) {
            services.push(
                <tr key={ service.id }>
                    <td>{ service.developerName }</td>
                    <td>{ service.developerSummary || <em>No description</em> }</td>
                    <td>{ service.uri }</td>
                    <td title={ service.dateModified }>{ relativeDate(Date.parse(service.dateModified)) }</td>
                </tr>
            );
        });

        return (
            <div>
                <section className="content-header">
                    <h1>Services</h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-body no-padding">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <th>Summary</th>
                                                <th>URI</th>
                                                <th>Last Updated</th>
                                            </tr>

                                            { services }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}