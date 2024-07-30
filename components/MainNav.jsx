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
import {Container, NavDropdown, Nav, Navbar, Form, Button} from 'react-bootstrap'
import { useRouter } from 'next/router';
import { useState } from 'react';
import {useAtom} from "jotai";
import { searchHistoryAtom } from "@/store";
import { useForm } from 'react-hook-form';

function navbar() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const { register, handleSubmit } = useForm();


  //TODO might need more work
  function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);
    let queryString = `/artwork?title=true&q=${searchField}`;
    setSearchHistory(current => [...current, queryString]);
    router.push(queryString);
  }

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  }

  const navLinkClicked = () => {
    setIsExpanded(false);
  }

    return (
        <div>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Thiago Flores</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior onClick={navLinkClicked}>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior onClick={navLinkClicked}>
                <Nav.Link active={router.pathname === "/search"}>Advance Search</Nav.Link>
              </Link>
            </Nav>
            &nbsp;
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
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favorites" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/favorites"} onClick={navLinkClicked}>Favorites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={navLinkClicked}>Search History</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      </div>
    );
  }
  
export default navbar;
