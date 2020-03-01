import React from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../modals/Modal";

const DataTable = props => {
  const deleteItem = id => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:3000/crud", {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Hobby</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {props.items.map(item => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.first}</td>
            <td>{item.last}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.location}</td>
            <td>{item.hobby}</td>
            <td>
              <div style={{ width: "110px" }}>
                <ModalForm
                  buttonLabel="Edit"
                  item={item}
                  updateState={props.updateState}
                />{" "}
                <Button color="danger" onClick={() => deleteItem(item.id)}>
                  Del
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
