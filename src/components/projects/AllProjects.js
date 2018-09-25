// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import { firebaseConnect, firestoreConnect, populate } from 'react-redux-firebase';
import classnames from 'classnames';

// Components
import Spinner from '../layout/Spinner';

class ProjectList extends Component {
  render() {

        const { projects } = this.props;
        
 

        if(projects) {
            return (
                <div>
                    <h1>Projects</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fa fa-arrow-circle-left m-2"></i>Back To Dashboard
                            </Link>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="bg-c-lt">
                            <tr>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Client</th>
                                <th>Cost</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id}>
                                    <td>{project.title}</td>
                                    <td>{project.details}</td>
                                    <td>${parseFloat(project.cost).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/projects/${project.id}`} className="btn btn-link btn-sm float-right btn-block">
                                            <i className="fa fa-arrow-circle-right m-2"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <Spinner size="fa-3x"/>
            )
        }
        
    }
}

ProjectList.propTypes ={
    firestore: PropTypes.object.isRequired,
    projects: PropTypes.array
}


export default compose(
    firestoreConnect(props => [{ collection: 'projects' }]),
    connect(({firestore: {ordered: { projects }}}, props) => ({
        projects
    })),
    firestoreConnect((props) => {
        const projectData = get(props, 'projects');
        if(projectData) {
            return (
                projectData.map(project => ({
                    collection: 'clients',
                    doc: project.client,
                    storeAs: 'client-' + project.id
                }))
            )
        } else {
            return [];
        }
    }),
    connect((state, props) => ({
        client: get(state, 'firestore.ordered.projectClient')
    }))
)(ProjectList);
