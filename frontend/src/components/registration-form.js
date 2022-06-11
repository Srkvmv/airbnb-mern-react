import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ListingDataService from "../services/listing";
import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Table,
  Alert,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

const RegistrationForm = listing => {
  const initialState = {
    formData: {
      confirmationCode: "",
      listing: "",
      checkin: "",
      checkout: "",
      adults: "",
      children: "",
      infants: "",
      nights: "",
      contact: "",
      status: "",
      totalPrice: ""
    }
  };
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [days, setDays] = useState(7);
  const [state, setState] = useState(initialState);
  const [dateRange, setDateRange] = useState({
    start: moment(),
    end: moment().add(1, "week")
  });

  const { start, end } = dateRange;
  const { formData } = state;
  const listingName = listing.listing.name ? listing.listing.name : "";
  const listingPrice =
    listing.listing.price && listing.listing.price.$numberDecimal
      ? listing.listing.price.$numberDecimal
      : 0;
  const label = "$" + listingPrice + " * " + days;
  const totalPrice = listingPrice * days;

  const handleInputChange = e => {
    setState({
      formData: { ...state.formData, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveRegistration();
    }
    setValidated(true);
  };

  const handleApply = (event, picker) => {
    console.log(picker.startDate.toDate().toUTCString());
    console.log(picker.endDate.toDate().toUTCString());
    var diff = picker.endDate.diff(picker.startDate, "days");
    setDays(diff);
    setDateRange({
      start: picker.startDate.toDate().toUTCString(),
      end: picker.endDate.toDate().toUTCString()
    });
  };

  const saveRegistration = () => {
    var data = {
      confirmationCode: "CONF",
      guestName: formData.guestName,
      contact: formData.contact,
      listing: listingName,
      status: "Confirmed",
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      totalPrice: totalPrice,
      checkIn: start,
      checkOut: end,
      nights: days
    };
    console.log(data);
    ListingDataService.createReservation(data)
      .then(response => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {submitted ? (
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>Your booking is confirmed.</p>
          <hr />
          <p className="mb-0">
            Cancellation policy Free cancellation for 48 hours. Cancel before 16
            Jun for a partial refund.
          </p>
        </Alert>
      ) : (
        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Label>Check-in / Checkout</Form.Label>
                <DateRangePicker
                  initialSettings={{ startDate: start, endDate: end }}
                  onApply={handleApply}
                >
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" controlId="validationCustom03">
                <Form.Label>Guest name</Form.Label>
                <Form.Control
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom04">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" controlId="validationCustom05">
                <Form.Label>No. of Adults</Form.Label>
                <Form.Control
                  type="number"
                  name="adults"
                  value={formData.adults}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text id="adultsHelp" muted>
                  Age 13+
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom06">
                <Form.Label>No. of Children</Form.Label>
                <Form.Control
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text id="childrenHelp" muted>
                  Ages 2–12
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom07">
                <Form.Label>No. of Instants</Form.Label>
                <Form.Control
                  type="number"
                  name="infants"
                  value={formData.infants}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text id="infantsHelp" muted>
                  Under 2
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Confirm</Button>
          </Form>
          <br />
          <Table striped bordered hover style={{ width: "50%" }}>
            <tbody>
              <tr>
                <td colSpan={2}>You won't be charged yet</td>
              </tr>
              <tr>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>
                          This helps us run our platform and offer services like
                          24/7 support on your trip.
                        </strong>.
                      </Tooltip>
                    }
                  >
                    <Button variant="link">{label}</Button>
                  </OverlayTrigger>
                </td>
                <td>${totalPrice}</td>
              </tr>
              <tr>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>
                          This helps us run our platform and offer services like
                          24/7 support on your trip.
                        </strong>.
                      </Tooltip>
                    }
                  >
                    <Button variant="link">Service fee</Button>
                  </OverlayTrigger>
                </td>
                <td>$10</td>
              </tr>
              <tr>
                <td>Total before taxes</td>
                <td>${totalPrice + 10}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
