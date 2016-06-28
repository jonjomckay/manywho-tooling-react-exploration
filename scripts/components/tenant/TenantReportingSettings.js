import React, { Component } from 'react';

export default class TenantReportingSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="example-modal">
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span></button>
                                <h4 className="modal-title">Edit Tenant Reporting Settings</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="tenant-reporting-endpoint" className="col-sm-2 control-label">Endpoint</label>
                                        <div className="col-sm-9">
                                            <div className="input-group">
                                                <span className="input-group-addon">https://</span>
                                                <input type="text" className="form-control" id="tenant-reporting-endpoint" placeholder="example.com/api/reporting/1" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}