// Packages
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

// Components
import Spinner from '../layout/Spinner';

class ProjectDetails extends Component {

    onDeleteClick = (e) => {
        e.preventDefault();

        const { firestore } = this.props;

        firestore.delete({ collection: 'projects', doc: this.props.match.params.id });
    }

    render() {

        const { project, client } = this.props;
        
        let clientInfo = '';
        
        if(client) {
            clientInfo = (
                <div>
                    <div className="jumbotron bg-c-md">
                        <h2 className="font-weight-bold">{client.firstName} {client.lastName}</h2>
                        <h3>{client.company}</h3>
                        <hr />
                    </div>
                    <h3><i className="fa fa-envelope m-2 text-primary"></i>{client.email}</h3>
                    <h3><i className="fa fa-phone m-2 text-primary"></i>{client.phone}</h3>
                    <h4><i className="fa fa-globe fa-lg m-2 text-primary"></i><a href={client.website}>{client.website}</a></h4>
                </div>
            );
        } else {
            clientInfo = null;
        }

        // console.log(project);
        if(project && client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-10">
                        <h1>Project Details</h1>
                        <Link to="/" className="btn btn-link">
                            <i className="fa fa-arrow-circle-left m-2" />
                            Back To Dashboard
                        </Link>
                        </div>
                        <div className="col-md-2">
                            <div className="btn-group float-right">
                                <Link
                                to={`/project/edit/${project.id}`}
                                className="btn btn-secondary"
                                >
                                <i className="fa fa-pencil" />
                                </Link>
                                <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onDeleteClick}
                                >
                                <i className="fa fa-trash" />
                                </button>
                            </div>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="content-bg">
                            <div className="jumbotron bg-c-md">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h2>{project.title}</h2>
                                        <h4 className="pl-2">({project.id})</h4>
                                    </div>
                                    <div className="col-md-3">
                                        <h2 className={classnames('font-weight-bold p-2 text-right',{
                                            'text-success': project.cost > 0
                                        })}>
                                            {/* ${parseFloat(project.cost).toFixed(2)} */}
                                            {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(project.cost)}
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mx-4 mt-2">
                                        <h4 className="font-weight-bold">Details:</h4>
                                        <h4>{project.details}</h4>
                                        <hr/>
                                        <h4 className="font-weight-bold">Technologies:</h4>
                                        <ul className="list-inline">
                                            {project.technologies.map((technology, i)  => {  
                                                return (
                                                    <li key={i} className={classnames('list-inline-item pt-2 px-2 text-light', {
                                                        'bg-warning': technology.area == 'Back-end',
                                                        'bg-primary': technology.area == 'Front-end',
                                                        'bg-danger': technology.area == 'Other'
                                                    })}><h4>{technology.tech}</h4>
                                                    </li>
                                                )
                                            })}
                                        </ul> 
                                    </div>

                                </div>
                            </div>
                        </div>
                            
                        </div>
                    
                    <div className="col-md-4">
                        <div className="content-bg">
                            {clientInfo}
                        </div>
                    </div>
                    </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="content-bg mt-4">
                            {/* Add project payments here */}
                        </div>
                    </div>
                </div>
                </div>
            )
        } else {
            return (
                <Spinner size="fa-3x"/>
            )
        }
    }
}

ProjectDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'projects', storeAs: 'project', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        project: ordered.project && ordered.project[0]
    })),
    firestoreConnect(props => {
        const projectData = get(props, 'project');
        if(projectData) {
            return [
                {
                    collection: 'clients',
                    doc : get(props, 'project.client'),
                    storeAs: 'client'
                }
            ]
        } else {
            return [];
        }
    }),
    connect(({ firestore: { ordered }}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ProjectDetails);
