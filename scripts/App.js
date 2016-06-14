import React, { Component } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar />

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                            Blank page
                            <small>it all starts here</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                            <li><a href="#">Examples</a></li>
                            <li className="active">Blank page</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        {/* Default box */}
                        <div className="box">
                            <div className="box-header with-border">
                                <h3 className="box-title">Title</h3>
                                <div className="box-tools pull-right">
                                    <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                                        <i className="fa fa-minus" /></button>
                                    <button type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                                        <i className="fa fa-times" /></button>
                                </div>
                            </div>
                            <div className="box-body">
                                Start creating your amazing application!
                            </div>
                            {/* /.box-body */}
                            <div className="box-footer">
                                Footer
                            </div>
                            {/* /.box-footer*/}
                        </div>
                        {/* /.box */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
            </div>
        );
    }
}
