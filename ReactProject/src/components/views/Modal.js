import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CustomerCreator } from "../Creators/CustomerCreator";
import { VehicleCreator } from "../Creators/VehicleCreator";

export class Modal extends Component {
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
        {isOpen && (
          <ModalContent onClose={this.onClose} comp={this.props.comp} />
        )}
      </Fragment>
    );
  }
}

const ModalTrigger = ({ onOpen, text }) => (
  <button className="btn btn-sm btn-outline-primary" onClick={onOpen}>
    {text}
  </button>
);
const ModalContent = ({ onClose, comp }) => {
  //Display data
  let componentType = "";
  switch (comp) {
    case "customer":
      componentType = <CustomerCreator modal={true} />;
      break;
    case "vehicle":
      componentType = <VehicleCreator modal={true} />;
      break;
  }

  return ReactDOM.createPortal(
    <aside className="c-modal-cover">
      <div className="c-modal">
        <div className="c-modal__body card-header">
          {componentType}
          <button type="button" onClick={onClose} className="btn btn-danger">
            CANCEL
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


Modal.propTypes = {
  comp:PropTypes.string.isRequired
};
