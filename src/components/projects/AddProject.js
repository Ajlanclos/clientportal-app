import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// Components
import InputGroup from '../layout/formElements/FormInputGroup';
import ButtonSubmit from '../layout/formElements/FormButton';
import FormTextAreaGroup from '../layout/formElements/FormTextAreaGroup';

class AddProject extends Component {
  state = {
    title: '',
    client: '',
    details: '',
    technologies: [
      {
        area: '',
        tech: ''
      }
    ]
  };

  componentDidMount() {
    if(this.props.match.params.id) {
      this.setState({
        client: this.props.match.params.id
      })
    }
  }

  onFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAreaChange = (item) => (e) => {

     let technologies = [...this.state.technologies];

     let technology = {...technologies[item]};

     technology.area = e.target.value;

     technologies[item] = technology;

     this.setState({technologies});
  };

  handleTechChange = (item) => (e) => {

    let technologies = [...this.state.technologies];

    let technology = {...technologies[item]};

    technology.tech = e.target.value;

    technologies[item] = technology;

    this.setState({technologies});

 }

  onFormSubmit = e => {
    e.preventDefault();

    const newProject = this.state;

    const { firestore } = this.props;

    const { client } = this.state;

    firestore.add({ collection: 'projects'}, newProject)
        .then((project) => {
 
          let clientProjectId = {
            projects: [project.id]
          }

          firestore.update({ collection: 'clients', doc: client}, clientProjectId);
            
          this.props.history.push(`/client/${client}`);
        });

        
    
  }

  addNewTech = e => {
    e.preventDefault();

    let technology = this.state.technologies.concat({ area: '', tech: '' });

    console.log(technology);

    this.setState({
      technologies: technology
    });
  };

  removeTech = index => e => {
    e.preventDefault();

    let technologies = this.state.technologies;

   technologies = [
      ...technologies.slice(0, index),
      ...technologies.slice((index + 1))
   ];

   e.target.value = '';

    this.setState({
      technologies
    });
  };

  render() {
    const { title, client, details, technologies, cost } = this.state;

    const { clients } = this.props;


    if(clients) {
      return (
        <div>
          <h1>Add Project</h1>
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
                <InputGroup
                  label="Project Title"
                  className="form-control"
                  name="title"
                  onFormChange={this.onFormChange}
                  value={title}
                />
                {this.props.match.params.id ? (
                  <InputGroup
                    label="Client"
                    className="form-control"
                    name="client"
                    onFormChange={this.onFormChange}
                    value={client}
                    disabled={true}
                  />
                ) : 
                <div className="form-group">
                  <label htmlFor="client">Project Client</label>
                  <select
                    className="form-control"
                    name="client"
                    value={client}
                    onChange={this.onFormChange}
                  >
                    <option value="">Select A Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName} ({client.company})
                      </option>
                    ))}
                </select>
                </div>
                }
                
                <FormTextAreaGroup
                  label="Details"
                  className="form-control"
                  name="details"
                  onFormChange={this.onFormChange}
                  value={details}
                />
                <label>
                  Technology
                  <i
                    className="fa fa-plus m-2 text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={this.addNewTech}
                  />
                </label>
                {technologies.map((technology, i) => (
                  <div key={i} className="form-inline">
                    <label className="m-2">Area of Focus</label>
                    <select
                      value={technology.area}
                      onChange={this.handleAreaChange(i)}
                      name="area"
                      className="form-control mr-3"
                    >
                      <option value="Front-end">Front-end</option>
                      <option value="Back-end">Back-end</option>
                      <option value="Other">Other</option>
                    </select>
  
                    <InputGroup
                      label="Tech"
                      className="form-control m-2"
                      name="tech"
                      onFormChange={this.handleTechChange(i)}
                      value={technology.tech}
                    />
  
                    <i
                      className="fa fa-times-circle m-2 text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={this.removeTech(i)}
                    />
                  </div>
                ))}
  
                <InputGroup
                  label="Cost"
                  className="form-control"
                  name="cost"
                  onFormChange={this.onFormChange}
                  value={cost}
                />
                <ButtonSubmit
                  type="Submit"
                  label="Add Project"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return null
    }
    
  }
}

AddProject.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [{ collection: 'clients' }]),
  connect(({firestore:{ordered:{clients}}}, props) => ({
    clients
  }))
)(AddProject);
