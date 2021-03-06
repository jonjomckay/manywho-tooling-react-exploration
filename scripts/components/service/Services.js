import React, { Component } from 'react';
import EllipsisText  from 'react-ellipsis-text';

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
                    <td className="hidden-xs">
                        <em>
                            <EllipsisText text={ service.developerSummary || 'No description' } length={ 100 } />
                        </em>
                    </td>
                    <td className="hidden-xs">{ service.uri }</td>
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
                                                <th className="hidden-xs">Summary</th>
                                                <th className="hidden-xs">URI</th>
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