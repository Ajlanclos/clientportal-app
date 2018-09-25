// Packages
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';

// Components
import Spinner from '../layout/Spinner';

class ProjectList extends Component {
  truncate = longData => {
    let maxLength = 50;
    let ellipses = '...';

    if (longData.length > maxLength) {
      return longData.substring(0, maxLength - ellipses.length) + ellipses;
    } else {
      return longData;
    }
  };

  render() {

        const { projects, clients } = this.props;

        if(projects) {
            return (
                <div className="content-bg">
                    <div className="row">
                        <div className="col-md-6">
                        <h2 className="float-left">
                            <span className="page">Recents Projects</span>
                        </h2>
                        {/* <h4>
                            <span className="badge-primary m-2 px-2 py-1">{projects.length}</span>
                        </h4> */}
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="bg-c-lt">
                            <tr>
                                <th>Client</th>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Cost</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id}>
                                    {clients.map(client => (
                                        <Fragment key={client.id}>
                                            {client.id === project.client ? (
                                                <td>
                                                    <Link to={`/project/${project.id}`} className="btn btn-link">
                                                        {client.firstName} {client.lastName} ({client.company})
                                                     </Link>
                                                </td>
                                            ) : null}
                                        </Fragment>
                                    ))}
                                    <td>{project.title}</td>
                                    {project.details != null ? (
                                        <td>{this.truncate(project.details)}</td>
                                    ) : null}
                                    <td>
                                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(project.cost)}    
                                    </td>
                                    <td>
                                        
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


ProjectList.propTypes = {
  firestore: PropTypes.object.isRequired,
  projects: PropTypes.array,
  clients: PropTypes.array
};

export default compose(
    firestoreConnect(props => [{ collection: 'projects', limit: 5 }]),
    connect(({firestore: {ordered: { projects }}}, props) => ({
        projects
    })),
    firestoreConnect(props => [{ collection: 'clients'}]),
    connect(({firestore: {ordered: { clients }}}, props) => ({
        clients
    }))
)(ProjectList);
