import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import InputGroup from '../layout/formElements/FormInputGroup';
import { Link } from 'react-router-dom';

class MakePaymentForm extends Component {
  state = {
    amount: '',
    date: '',
    clientID: '',
    projectID: '',
    disableProjects: true,
    clientsWithProjects: [],
    currentClientProjects: []
  };

  static getDerivedStateFromProps(props, state) {
    const { clients, projects } = props;

    // let clientsWithProjects = [];
    if (clients && projects) {
      return {
        clientsWithProjects: clients.filter(client => {
          //   return client.projects.length > 0;
          if (client.projects) {
            return client.projects.length > 0;
          }
        })
      };

      //   for (let i = 0; i < clients.length; i++) {
      //     for (let j = 0; j < projects.length; j++) {
      //       if (
      //         clients[i].id === projects[j].client &&
      //         !clientsWithProjects.includes(clients[i])
      //       )
      //         clientsWithProjects.unshift(clients[i]);
      //     }
      //   }
      //   console.log(clientsWithProjects);
      //   return {
      //     clientsWithProjects: clientsWithProjects
      //   };
    } else {
      return null;
    }
  }

  onClientChange = e => {
    if (e.target.value !== '') {
      const { projects } = this.props;

      this.setState({
        disableProjects: false,
        [e.target.name]: e.target.value,
        currentClientProjects: projects.filter(project => {
          return project.client === e.target.value;
        })
      });
    } else {
      this.setState({
        disableProjects: true,
        clientID: e.target.value
      });
    }
  };

  onFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { amount, clientID, projectID, date } = this.state;
    const { projects, firestore } = this.props;

    let projectSelected = projects.filter(project => {
      return project.id === projectID;
    });

    let calcBalance = projectSelected[0].cost - amount;

    const updateProjectBalance = {
      cost: parseFloat(calcBalance)
    };

    const newPayment = {
      amount: amount,
      client: clientID,
      project: projectID,
      date: date
    };

    firestore.add({ collection: 'payments' }, newPayment).then(payment => {
      // let updatePaymentOnClient = {
      //   payments: [payment.id]
      // };
      // firestore.update(
      //   { collection: 'clients', doc: clientID },
      //   updatePaymentOnClient
      // );
      firestore.update(
        { collection: 'projects', doc: projectID },
        updateProjectBalance
      );
      this.props.history.push(`/client/${clientID}`);
    });
  };

  render() {
    const { clients, projects } = this.props;
    const {
      amount,
      date,
      clientID,
      projectID,
      disableProjects,
      currentClientProjects,
      clientsWithProjects
    } = this.state;
    if (clients && projects) {
      return (
        <div>
          <h1>Make Payment</h1>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-circle-left m-2" />
                Back To Dashboard
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <label>Client</label>

                  <select
                    className="form-control"
                    name="clientID"
                    value={clientID}
                    onChange={this.onClientChange}
                  >
                    <option value="">Select A Client</option>
                    {clientsWithProjects.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Project</label>
                  <select
                    className="form-control"
                    name="projectID"
                    value={projectID}
                    disabled={disableProjects}
                    onChange={this.onFormChange}
                  >
                    <option value="" />
                    {currentClientProjects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.title} ($
                        {parseFloat(project.cost).toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
                <InputGroup
                  type="text"
                  label="Amount"
                  className="form-control"
                  name="amount"
                  required="required"
                  onFormChange={this.onFormChange}
                  value={amount}
                  disabled={disableProjects}
                />
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    onChange={this.onFormChange}
                    value={date}
                    disabled={disableProjects}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success float-right"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default compose(
  firestoreConnect(props => [{ collection: 'clients' }]),
  connect(({ firestore: { ordered } }, props) => ({
    clients: ordered.clients
  })),
  firestoreConnect(props => [{ collection: 'projects' }]),
  connect(({ firestore: { ordered } }, props) => ({
    projects: ordered.projects
  }))
)(MakePaymentForm);
