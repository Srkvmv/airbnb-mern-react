import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./airbnb_logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import Listings from "./components/listings-list";
import Listing from "./components/listings";
import Login from "./components/login";
import DataTable from "./components/data-table";
import React from "react";
import "./app.css";
import { Container, Navbar, Nav } from "react-bootstrap";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            airbnb
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to={"/listings"} className="nav-link">
                Listings
              </Link>
              <Nav.Link href="/table">Registration table</Nav.Link>
              <Nav.Link href="#" disabled>
                Become a host
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
            {user &&
              user.name && (
                <Navbar.Text>
                  Signed in as: <a href="#login">{user.name}</a>
                </Navbar.Text>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Listings />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<Listing user={user} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/table" element={<DataTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
