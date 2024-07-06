/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Thiago Flores Student ID: 150237220 Date: 2024-07-05
*
********************************************************************************/ 

import Link from 'next/link';
import {Container, Nav, Navbar, Form, Button} from 'react-bootstrap'
import { useRouter } from 'next/router';
import { useState } from 'react';

function navbar() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');

  function submitForm(e) {
    e.preventDefault();

    router.push(`/artwork?title=true&q=${searchField}`);
  }

    return (
        <div>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Thiago Flores</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advance Search</Nav.Link>
              </Link>
            </Nav>
            <Form onSubmit={submitForm} className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField} onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type='submit' variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      </div>
    );
  }
  
export default navbar;
