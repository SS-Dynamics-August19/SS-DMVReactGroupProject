import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CustomerCreator } from "../Creators/CustomerCreator";
import { VehicleCreator } from "../Creators/VehicleCreator";
import CustomerDetailsView from "./CustomerDetailsView.js";

/**
 * *Component for quick create / Works for vehicle and for customer
 * @param comp a string to define the type of component being created (ex. "customer" or "vehicle")
 */
export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //component starts closed. If isOpen is set to true it displays the modal and its content
      isOpen: false
    };
    //methods to open or close this component on a button click
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /**
   * sets isOpen to true / opens the modal
   */
  onOpen() {
    this.setState({ isOpen: true });
  }
  /**
   * sets isOpen to false / closes the modal
   */
  onClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;//retrieve isOpen from the state
    return (
      //fragments allow us to add content to the dom without adding extra nodes / I will use it later to append the modal to the body without depending on its own html element
      <Fragment>
        <ModalTrigger onOpen={this.onOpen} text={this.props.text} />
        {isOpen && (
          <ModalContent onClose={this.onClose} comp={this.props.comp} record={this.props.rec}/>
        )}
      </Fragment>
    );
  }
}

/**
 * *Displays the button that handles the onOpen function when clicked
 * @param onOpen function that sets the state of the modal to open
 * @param text text to be displayed on the button
 */
const ModalTrigger = ({ onOpen, text }) => (
  <button className="btn btn-sm btn-outline-primary" onClick={onOpen}>
    {text}
  </button>
);
const ModalContent = ({ onClose, comp, record }) => {
  //Display data
  let componentType = "";
  switch (comp) {//switch on the component type
    case "customer":
      componentType = <CustomerCreator modal={true} />;
      break;
    case "vehicle":
      componentType = <VehicleCreator modal={true} />;
      break;
    case "customerdetail":
      componentType = <CustomerDetailsView customer={record} />;
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
  comp:PropTypes.string.isRequired,
  text:PropTypes.string.isRequired,
  rec:PropTypes.string.isRequired
};
