import React, { Component } from 'react';

import AdminSource from '../../sources/AdminSource';
import LoadingSpinner from '../LoadingSpinner';

export default class Tenant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tenant: {
                id: '',
                developerName: '',
                developerSummary: '',
                securitySettings: {
                    authorizedAdminIPRanges: [],
                    authorizedDrawIPRanges: [],
                    authorizedPackagingIPRanges: [],
                    authorizedRunIPRanges: [],
                    isAdminRestrictedByIPRange: false,
                    isDrawRestrictedByIPRange: false,
                    isPackagingRestrictedByIPRange: false,
                    isRunRestrictedByIPRange: false,
                    userRegistrationSettings: {
                        type: ''
                    }
                },
                stateSettings: {
                    endpoint: ''
                },
                subTenants: []
            }
        }
    }

    componentWillMount() {
        AdminSource.fetchTenant().then(data => {
            this.setState({
                loading: false,
                tenant: data
            });
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        var securitySettings = this.state.tenant.securitySettings;

        var flowRestrictions = <span>No flow restrictions set</span>;

        if (securitySettings != null) {
            if (securitySettings.authorizedRunIPRanges && securitySettings.isRunRestrictedByIPRange) {
                flowRestrictions = <span>{ securitySettings.authorizedRunIPRanges.length } flow restrictions are set and <span className="text-green">enabled</span></span>
            } else if (securitySettings.authorizedRunIPRanges) {
                flowRestrictions = <span>{ securitySettings.authorizedRunIPRanges.length } flow restrictions are set but <span className="text-red">disabled</span></span>
            }
        }

        var toolingRestrictions = <span>No tooling restrictions set</span>;

        if (securitySettings) {
            if (securitySettings.authorizedDrawIPRanges && securitySettings.isDrawRestrictedByIPRange) {
                toolingRestrictions = <span>{ securitySettings.authorizedDrawIPRanges.length } tooling restrictions are set and <span className="text-green">enabled</span></span>
            } else if (securitySettings.authorizedDrawIPRanges) {
                toolingRestrictions = <span>{ securitySettings.authorizedDrawIPRanges.length } tooling restrictions are set but <span className="text-red">disabled</span></span>
            }
        }

        var administrationRestrictions = <span>No administration restrictions set</span>;

        if (securitySettings) {
            if (securitySettings.authorizedAdminIPRanges && securitySettings.isAdminRestrictedByIPRange) {
                administrationRestrictions = <span>{ securitySettings.authorizedAdminIPRanges.length } administration restrictions are set and <span className="text-green">enabled</span></span>
            } else if (securitySettings.authorizedAdminIPRanges) {
                administrationRestrictions = <span>{ securitySettings.authorizedAdminIPRanges.length } administration restrictions are set but <span className="text-red">disabled</span></span>
            }
        }

        var packagingRestrictions = <span>No packaging restrictions set</span>;

        if (securitySettings) {
            if (securitySettings.authorizedPackagingIPRanges && securitySettings.isPackagingRestrictedByIPRange) {
                packagingRestrictions = <span>{ securitySettings.authorizedPackagingIPRanges.length } packaging restrictions are set and <span className="text-green">enabled</span></span>
            } else if (securitySettings.authorizedPackagingIPRanges) {
                packagingRestrictions = <span>{ securitySettings.authorizedPackagingIPRanges.length } packaging restrictions are set but <span className="text-red">disabled</span></span>
            }
        }

        var registration = <span>No registration settings are set</span>;

        if (securitySettings && securitySettings.userRegistrationSettings) {
            if (securitySettings.userRegistrationSettings.type === "MANUAL") {
                registration = <span>Registration is set to <span className="text-yellow">MANUAL</span>, so new users can only be provisioned by another builder user.</span>;
            } else if (securitySettings.userRegistrationSettings.type === "REQUEST") {
                registration = <span>Registration is set to <span className="text-yellow">REQUEST</span>, so new users are able to request access but can only be provisioned by another builder user.</span>;
            } else if (securitySettings.userRegistrationSettings.type === "SELF") {
                registration = <span>Registration is set to <span className="text-yellow">SELF</span>, so new users can self-provision if their email and username match with the existing tenant.</span>;
            }
        }

        var reportingEndpoint = <span>Reporting is disabled</span>;

        if (this.state.tenant.stateSettings.endpoint) {
            reportingEndpoint = <span><p>Reporting is enabled with the endpoint:</p> <ul><li>{ this.state.tenant.stateSettings.endpoint }</li></ul></span>;
        }

        var subTenants = [];

        if (this.state.tenant.subTenants) {
            subTenants = this.state.tenant.subTenants.map(subTenant => {
                return <li>{ subTenant.developerName }</li>;
            });
        }

        return (
            <div>
                <section className="content-header">
                    <h1>Tenant</h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="box box-primary">
                                <div className="box-body box-profile">
                                    <h3 className="profile-username">{ this.state.tenant.developerName }</h3>
                                    <p className="text-muted">{ this.state.tenant.id }</p>
                                    <em className="text-muted">{ this.state.tenant.developerSummary }</em>
                                </div>
                            </div>

                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <span><h3 className="box-title">Settings</h3></span>
                                    <span><a className="pull-right"><i className="fa fa-edit" /> Edit</a></span>
                                </div>

                                <div className="box-body">
                                    <h4><i className="fa fa-shield margin-r-5" /> Security</h4>
                                    <ul className="text-muted">
                                        <li>{ flowRestrictions }</li>
                                        <li>{ toolingRestrictions }</li>
                                        <li>{ administrationRestrictions }</li>
                                        <li>{ packagingRestrictions }</li>
                                    </ul>
                                    <hr />
                                    <h4><i className="fa fa-user-plus margin-r-5" /> Registration</h4>
                                    <p className="text-muted">{ registration }</p>
                                    <hr />

                                    <h4><i className="fa fa-bar-chart margin-r-5" /> Reporting</h4>

                                    <p className="text-muted">{ reportingEndpoint }</p>

                                    <hr />

                                    <h4><i className="fa fa-group margin-r-5" /> Subtenants</h4>

                                    <p className="text-muted">This tenant has { subTenants.length } subtenants</p>

                                    <ul className="text-muted">
                                        { subTenants }
                                    </ul>
                                </div>
                            </div>
                            {/* /.box */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-9">
                            <div className="box box-primary">
                                <div className="box-body">
                                    {/* The timeline */}
                                    <ul className="timeline timeline-inverse">
                                        {/* timeline time label */}
                                        <li className="time-label">
                      <span className="bg-red">
                        10 Feb. 2014
                      </span>
                                        </li>
                                        {/* /.timeline-label */}
                                        {/* timeline item */}
                                        <li>
                                            <i className="fa fa-envelope bg-blue" />
                                            <div className="timeline-item">
                                                <span className="time"><i className="fa fa-clock-o" /> 12:05</span>
                                                <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>
                                                <div className="timeline-body">
                                                    Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                                    weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                                    jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                                    quora plaxo ideeli hulu weebly balihoo...
                                                </div>
                                                <div className="timeline-footer">
                                                    <a className="btn btn-primary btn-xs">Read more</a>
                                                    <a className="btn btn-danger btn-xs">Delete</a>
                                                </div>
                                            </div>
                                        </li>
                                        {/* END timeline item */}
                                        {/* timeline item */}
                                        <li>
                                            <i className="fa fa-user bg-aqua" />
                                            <div className="timeline-item">
                                                <span className="time"><i className="fa fa-clock-o" /> 5 mins ago</span>
                                                <h3 className="timeline-header no-border"><a href="#">Sarah Young</a> accepted your friend request
                                                </h3>
                                            </div>
                                        </li>
                                        {/* END timeline item */}
                                        {/* timeline item */}
                                        <li>
                                            <i className="fa fa-comments bg-yellow" />
                                            <div className="timeline-item">
                                                <span className="time"><i className="fa fa-clock-o" /> 27 mins ago</span>
                                                <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                                                <div className="timeline-body">
                                                    Take me to your leader!
                                                    Switzerland is small and neutral!
                                                    We are more like Germany, ambitious and misunderstood!
                                                </div>
                                                <div className="timeline-footer">
                                                    <a className="btn btn-warning btn-flat btn-xs">View comment</a>
                                                </div>
                                            </div>
                                        </li>
                                        {/* END timeline item */}
                                        {/* timeline time label */}
                                        <li className="time-label">
                      <span className="bg-green">
                        3 Jan. 2014
                      </span>
                                        </li>
                                        {/* /.timeline-label */}
                                        {/* timeline item */}
                                        <li>
                                            <i className="fa fa-camera bg-purple" />
                                            <div className="timeline-item">
                                                <span className="time"><i className="fa fa-clock-o" /> 2 days ago</span>
                                                <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>
                                                <div className="timeline-body">
                                                    <img src="http://placehold.it/150x100" alt="..." className="margin" />
                                                    <img src="http://placehold.it/150x100" alt="..." className="margin" />
                                                    <img src="http://placehold.it/150x100" alt="..." className="margin" />
                                                    <img src="http://placehold.it/150x100" alt="..." className="margin" />
                                                </div>
                                            </div>
                                        </li>
                                        {/* END timeline item */}
                                        <li>
                                            <i className="fa fa-clock-o bg-gray" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </section>
            </div>
        );
    }
}