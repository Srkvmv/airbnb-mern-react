import React, { useState, useEffect } from "react";
import ListingDataService from "../services/listing";
import { Link } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
const Listings = props => {
  const [listings, setListings] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveListings();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveListings = () => {
    ListingDataService.getAll()
      .then(response => {
        console.log(response.data);
        setListings(response.data.listings);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const find = (query, by) => {
    ListingDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setListings(response.data.listings);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const refreshList = () => {
    setSearchName(null);
    retrieveListings();
  };

  return (
    <div>
      <ReactBootstrap.Stack direction="horizontal" gap={3}>
        <ReactBootstrap.Form.Control
          xs={3}
          className="me-auto"
          value={searchName}
          onChange={onChangeSearchName}
          placeholder="Search by property name..."
        />
        <ReactBootstrap.Button onClick={findByName} variant="secondary">
          Search
        </ReactBootstrap.Button>
        <div className="vr" />
        <ReactBootstrap.Button onClick={refreshList} variant="outline-danger">
          Reset
        </ReactBootstrap.Button>
      </ReactBootstrap.Stack>
      <br />
      <h1>Listings</h1>
      <div className="row pb-2">
        <div className="input-group col-lg-4" />
        <div className="input-group col-lg-4" />
        <div className="input-group col-lg-4" />
        <div className="row">
          {listings.map(listing => {
            const address = `${listing.address.suburb}, ${
              listing.address.country
            }`;
            return (
              <div key={listing._id} className="col-lg-4 pb-1">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{listing.property_type}</h4>
                    <img
                      className="d-block w-100 responsive"
                      src={listing.images.picture_url}
                      alt={listing.name}
                    />
                    <p className="card-text">
                      <strong>Name: </strong>
                      {listing.name}
                      <br />
                      <strong>Address: </strong>
                      {address}
                      <br />
                      <strong>{listing.price.$numberDecimal}</strong> per night
                      <br />
                    </p>
                    <div className="row">
                      <Link
                        to={"/listings/" + listing._id}
                        className="btn btn-primary col-lg-5 mx-1 mb-1"
                      >
                        Reserve
                      </Link>
                      <a
                        target="_blank"
                        href={"https://www.google.com/maps/place/" + address}
                        className="btn btn-primary col-lg-5 mx-1 mb-1"
                      >
                        View Map
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Listings;
