import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export class Person extends React.Component {
  constructor(props) {
    super(props);
    this.details = {
      id: props.ID,
      firstName: props.firstName,
      lastName: props.lastName,
      street1: props.street1,
      street2: props.street2,
      city: props.city,
      state: props.state,
      zipcode: props.zip,
      bday: props.bday,
      email: props.email,
      fullName: props.firstName + " " + props.lastName
    };
  }

  render() {
    return (
      <tr key={this.details.id}>
        <td> {this.details.fullName} </td>
        <td> {this.details.bday} </td>
        <td> {this.details.email} </td>
        <td>
          <Modal {...this.details} />{" "}
        </td>
      </tr>
    );
  }
}

// ~~! Set proptypes / built in prop validation
Person.propTypes = {
  ID: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  street1: PropTypes.string,
  street2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  bday: PropTypes.string
};
//---AND---
// ~~! Set default prop values
Person.defaultProps = {
  ID: "",
  firstName: "",
  lastName: "",
  email: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  bday: ""
};

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen() {
    this.setState({ isOpen: true });
  }
  onClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <ModalTrigger onOpen={this.onOpen} text="View" />
        {isOpen && <ModalContent onClose={this.onClose} info={this.props} />}
      </Fragment>
    );
  }
}

const ModalTrigger = ({ onOpen, text }) => (
  <button
    className="btn btn-warning btn-sm float-right btn-outline-primary"
    onClick={onOpen}
  >
    {text}
  </button>
);
const ModalContent = ({ onClose, info }) => {
  //Display data
  return ReactDOM.createPortal(
    <aside className="c-modal-cover">
      <div className="c-modal">
        <div className="c-modal__body">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              type="text"
              value={info.firstName}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              value={info.lastName}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Email</span>
            </div>
            <input
              type="email"
              value={info.email}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Street 1</span>
            </div>
            <input
              type="text"
              value={info.street1}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Street 2</span>
            </div>
            <input
              type="text"
              value={info.street2}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">City</span>
            </div>
            <input
              type="text"
              value={info.city}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">State</span>
            </div>
            <input
              type="text"
              value={info.state}
              className="form-control"
              disabled
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Zip Code</span>
            </div>
            <input
              type="text"
              value={info.zipcode}
              className="form-control"
              disabled
            />
          </div>
          <hr />
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary btn-lg btn-block"
          >
            Close
          </button>
        </div>
      </div>
    </aside>,
    document.body
  );
};

ModalTrigger.propTypes = {
  onOpen: PropTypes.func,
  text: PropTypes.string
};
