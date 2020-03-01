import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEditForm from "../forms/AddEditForm";

const ModalForm = props => {
  const [showModal, setModalState] = useState(false);

  const toggle = () => {
    setModalState(!showModal);
  };

  return (
    <div>
      <Button
        color={props.buttonLabel === "Edit" ? "warning" : "success"}
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {props.buttonLabel}
      </Button>

      <Modal isOpen={showModal} toggle={toggle} className={props.className}>
        <ModalHeader
          toggle={toggle}
          close={
            <button className="close" onClick={toggle}>
              &times;
            </button>
          }
        >
          {props.buttonLabel === "Edit" ? "Edit Item" : "Add New Item"}
        </ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            toggle={toggle}
            item={props.item}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalForm;
