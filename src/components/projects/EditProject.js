import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import InputGroup from '../layout/formElements/FormInputGroup';
import ButtonSubmit from '../layout/formElements/FormButton';
import FormTextAreaGroup from '../layout/formElements/FormTextAreaGroup';

class AddProject extends Component {

    constructor(props) {
        super(props);

        this.titleInput = React.createRef();
        this.clientInput = React.createRef();
        this.detailsInput = React.createRef();
        this.technologiesInput = React.createRef();
        this.costInput = React.createRef();
    }

    state = {
        technologies: [
          {
            area: '',
            tech: ''
          }
        ]
    }

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

    const { firestore, project } = this.props;

    const { client, technologies } = this.state;

    const updateProject = {
        title: this.titleInput.current.value,
        client: this.clientInput.current.value,
        details: this.detailsInput.current.value,
        technologies,
        cost:  this.costInput.current.value === ''
        ? 0
        : this.costInput.current.value
    }

    if (updateProject.cost === '') {
      updateProject.cost = 0;
    }

    firestore.update({ collection: 'projects', doc: project.id}, updateProject)
        .then(() => { this.props.history.push(`/project/${project.id}`);});

  }

  addNewTech = e => {
    e.preventDefault();

    const { firestore, project } = this.props;

    const { technologies } = this.state;

    let technology = technologies.concat({ area: '', tech: '' });

    this.setState({
      technologies: technology
    });

    const addTechnologies = {
        technologies: technology
    }

    // firestore.update({ collection: 'projects', doc: this.props.match.params.id}, addTechnologies);
    
  };

  removeTech = index => e => {
    e.preventDefault();

    const { firestore } = this.props;

    let technologies = this.state.technologies;

    technologies = [
        ...technologies.slice(0, index),
        ...technologies.slice((index + 1))
    ];

    const removeTechnologies = {
        technologies: technologies
    }

    this.setState({
      technologies
    })
    
  };

  render() {
    const { clients, project } = this.props;

    const { technologies } = this.state;

    if(project) {
      return (
        <div>
          <h1>Edit Project</h1>
          <div className="row">
            <div className="col-md-6">
              <Link to={`/project/${project.id}`} className="btn btn-link">
                <i className="fa fa-arrow-circle-left m-2" />
                Back To Project Details
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
                  reff={this.titleInput}
                  value={project.title}
                />
                {this.props.match.params.id ? (
                  <InputGroup
                    label="Client"
                    className="form-control"
                    name="client"
                    reff={this.clientInput}
                    value={project.client}
                    disabled={true}
                  />
                ) : 
                <div className="form-group">
                  <label htmlFor="client">Project Client</label>
                  <select
                    className="form-control"
                    name="client"
                    value={project.client}
                    ref={this.clientInput}
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
                  reff={this.detailsInput}
                  value={project.details}
                />
                <label>
                  Technology
                  <i
                    className="fa fa-plus m-2 text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={this.addNewTech}
                  />
                </label>
                <ul>
                  {project.technologies.map((technology, i) => (
                    <li key={i} className={classnames('list-inline-item pt-2 px-2 text-light', {
                        'bg-warning': technology.area == 'Back-end',
                        'bg-primary': technology.area == 'Front-end',
                        'bg-danger': technology.area == 'Other'
                    })}><h4>{technology.tech}</h4>
                    </li>
                  ))}
                  
                </ul>
                {technologies.map((technology, i) => (
                  <div key={i} className="form-inline">
                    <label className="m-2">Area of Focus</label>
                    <select
                      defaultValue={technology.area}
                      onChange={this.handleAreaChange}
                      // ref={this.technologyAreaInput}
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
                        // ref={this.technologyTechInput}
                        // onChange={this.handleTechChange}
                        defaultValue={technology.tech}
                    />
  
                    <i
                      className="fa fa-times-circle m-2 text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={this.removeTech(i)}
                    />
                  </div>
                ))}
  
                <InputGroup
                  type="number"
                  label="Cost"
                  className="form-control"
                  name="cost"
                  reff={this.costInput}
                  value={project.cost}
                />
                <ButtonSubmit
                  type="Submit"
                  label="Edit Project"
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
  })),
  firestoreConnect(props => [{
      collection: 'projects', doc: props.match.params.id, storeAs: 'project'
  }]),
  connect(({firestore: {ordered}}, props) => ({
      project: ordered.project && ordered.project[0]
  }))
)(AddProject);
