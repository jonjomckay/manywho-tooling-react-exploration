import React, { Component } from 'react';

import ServicesSource from '../../sources/ServicesSource';
import Sort from '../../utils/Sort';

import LoadingSpinnerForm from '../LoadingSpinnerForm';

export default class ServiceSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [
                {
                    id: '',
                    developerName: 'Loading...'
                }
            ],
            loading: true
        };
    }

    refresh() {
        this.setState({
            services: [
                {
                    id: '',
                    developerName: 'Loading...'
                }
            ],
            loading: true
        });

        ServicesSource.findAll().then(data => {
            this.setState({ services: data, loading: false });
        });
    }

    componentWillMount() {
        this.refresh();
    }

    render() {
        var spinner = <span></span>;
        if (this.state.loading) {
            spinner = <LoadingSpinnerForm />;
        }

        var services = this.state.services.sort(Sort.byDeveloperName).map(function (service) {
            return (<option key={ service.id } value={ service.id }>{ service.developerName }</option>);
        });

        return (
            <div>
                <div className="col-sm-3 col-xs-12">
                    <div className="input-group">
                        <select className="form-control" value={ this.props.selected } onChange={ this.props.onChange.bind(this) }>
                            { services }
                        </select>

                        <a className="input-group-addon" onClick={ this.refresh.bind(this) }><i className="fa fa-refresh" /></a>
                    </div>
                </div>
                <div className="col-sm-1 hidden-xs">
                    { spinner }
                </div>
            </div>
        );
    }
}