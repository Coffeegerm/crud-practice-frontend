import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DataTable from "./components/tables/DataTable";
import ModalForm from "./components/modals/Modal";
import { CSVLink } from "react-csv";

const App = () => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    fetch("http://localhost:3000/crud")
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err));
  };

  const addItemToState = item => {
    setItems([...items, item]);
  };

  const updateState = item => {
    const itemIndex = items.findIndex(data => data.id === item.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...items.slice(itemIndex + 1)
    ];
    setItems(newArray);
  };

  const deleteItemFromState = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>CRUD Database</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={items}
            updateState={updateState}
            deleteItemFromState={deleteItemFromState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}
          >
            Download CSV
          </CSVLink>
          <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
