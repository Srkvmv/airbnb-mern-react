import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
const Login = props => {
  const initialUserState = {
    name: "",
    id: ""
  };
  let navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);
  const [validated, setValidated] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.login(user);
      navigate(-1);
    }
    setValidated(true);
  };

  return (
    <div>
      <h3>Welcome to Airbnb</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>User name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="pwd"
              required
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid" />
          </Form.Group>
        </Row>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
