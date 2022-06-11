import React, { useState, useEffect } from "react";
import ListingDataService from "../services/listing";
import { useParams } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
import RegistrationForm from "./registration-form";

const Listing = props => {
  const initialListingState = {
    id: null,
    name: "",
    address: {},
    reviews: []
  };
  let { id } = useParams();
  const [listing, setListing] = useState(initialListingState);

  const getListing = id => {
    ListingDataService.get(id)
      .then(response => {
        setListing(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(
    () => {
      getListing(id);
    },
    [id]
  );
  return (
    <div>
      {listing ? (
        <ReactBootstrap.Tabs
          defaultActiveKey="description"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <ReactBootstrap.Tab eventKey="description" title="Description">
            <p className="card-text">
              <strong>Name: </strong>
              {listing.name}
              <br />
              <span>
                {listing.accommodates} guests . {listing.bedrooms} bedrooms .{" "}
                {listing.beds} beds
              </span>
              <br />
              <strong>Summary: </strong>
              {listing.summary}
              <br />
              <br />
              {listing.description}
            </p>
          </ReactBootstrap.Tab>
          <ReactBootstrap.Tab eventKey="profile" title="Profile">
            {listing.host && (
              <p className="card-text">
                <strong>Hosted by: </strong>
                {listing.host.host_name}
                <br />
                {listing.host.host_identity_verified && (
                  <div>
                    <strong>Identity verified</strong>
                    <br />
                  </div>
                )}
                {listing.host.host_about}
                <br />
                <strong>Response rate: </strong>
                {listing.host.host_response_rate}
                <br />
                <strong>Response time: </strong>
                {listing.host.host_response_time}
                <br />
              </p>
            )}
          </ReactBootstrap.Tab>
          <ReactBootstrap.Tab eventKey="amenities" title="Amenities">
            {listing.amenities &&
              listing.amenities.sort((a, b) => {
                let x = a.toLowerCase();
                let y = b.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              }) &&
              listing.amenities.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
          </ReactBootstrap.Tab>
          <ReactBootstrap.Tab eventKey="confirm" title="Confirm & Pay">
            {props.user && props.user.name ? (
              <RegistrationForm listing={listing} />
            ) : (
              <h3>Login to continue</h3>
            )}
          </ReactBootstrap.Tab>
        </ReactBootstrap.Tabs>
      ) : (
        <div>
          <br />
          <p>No listing selected.</p>
        </div>
      )}
    </div>
  );
};

export default Listing;
