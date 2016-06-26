import React, { Component } from 'react';
import EllipsisText  from 'react-ellipsis-text';
import update from 'immutability-helper';
import { Link } from 'react-router';

import ServicesSource from "../../sources/ServicesSource";
import TypesSource from "../../sources/TypesSource";

import LoadingSpinner from '../LoadingSpinner';
import RelativeDate from '../RelativeDate';

export default class Types extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [],
            types: [],
            loading: true
        };
    }

    componentWillMount() {
        ServicesSource.findAll().then(data => {
            this.setState(update(this.state, {
                services: { $set: data }
            }));
        });

        TypesSource.findAll().then(data => {
            this.setState(update(this.state, {
                types: { $set: data },
                loading: { $set: false }
            }));
        });
    }

    findServiceName(id) {
        var service = this.state.services.find(function (service) {
            return service.id === id;
        });

        if (service) {
            return service.developerName;
        }

        return 'Unknown';
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        var types = [];

        this.state.types.forEach(type => {
            types.push(
                <tr key={ type.id }>
                    <td>
                        <Link to={`/types/${type.id}`}>
                            { type.developerName }
                        </Link>
                    </td>
                    <td className="hidden-xs">
                        <em>
                            <EllipsisText text={ type.developerSummary || 'No description' } length={ 100 } />
                        </em>
                    </td>
                    <td>{ this.findServiceName(type.serviceElementId) }</td>
                    <td><RelativeDate date={ type.dateModified } /></td>
                </tr>
            );
        });

        return (
            <div>
                <section className="content-header">
                    <h1>Types</h1>
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
                                            <th>Service</th>
                                            <th>Last Updated</th>
                                        </tr>

                                        { types }
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