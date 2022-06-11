import React, { useState } from "react";
import { Form, Row, Modal } from "react-bootstrap";
import { Button, Icon } from "semantic-ui-react";
const Popup = props => {
  const initialState = {
    formData: {}
  };
  const [show, setShow] = useState(false);
  const [rowData, setRowData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const handleSave = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setShow(true);
    } else {
      setShow(false);
      props.addNew(rowData.formData);
    }
    setValidated(true);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleInputChange = e => {
    setRowData({
      formData: { ...rowData.formData, [e.target.name]: e.target.value }
    });
  };

  return (
    <>
      <Button onClick={handleShow} icon labelPosition="right" size="small">
        Add popup <Icon name="add" />
      </Button>

      <Modal scrollable centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter values</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSave}>
            <Row className="mb-3">
              {props.headers.map((header, index) => {
                return (
                  <Form.Group key={index}>
                    <Form.Label>{header}</Form.Label>
                    <Form.Control
                      required
                      name={header}
                      id={index}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a value.
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              })}
            </Row>
            <Row className="mb-3">
              <Button size="small" type="submit">
                Save Changes
              </Button>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};

export default Popup;
