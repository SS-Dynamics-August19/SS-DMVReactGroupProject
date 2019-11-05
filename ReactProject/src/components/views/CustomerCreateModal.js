import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CustomerCreator } from "../Creators/CustomerCreator";

export class CustomerCreateModal extends Component {
  constructor(props) {
    super(props);
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
        <ModalTrigger onOpen={this.onOpen} text="Create New" />
        {isOpen && <ModalContent onClose={this.onClose} />}
      </Fragment>
    );
  }
}

const ModalTrigger = ({ onOpen, text }) => (
  <button className="btn btn-sm btn-outline-primary" onClick={onOpen}>
    {text}
  </button>
);
const ModalContent = ({ onClose }) => {
  //Display data

  return ReactDOM.createPortal(
    <aside className="c-modal-cover">
      <div className="c-modal">
        <div className="c-modal__body card-header">
          <CustomerCreator />
          <div className="btn-group">
            <button
              type="button"
              onClick={onClose}
              className="btn pull-left btn-success"
            >
              Create
            </button>
            <span className="text-white">|</span>
            <button
              type="button"
              onClick={onClose}
              className="btn pull-right btn-danger"
            >
              Close
            </button>
          </div>
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
