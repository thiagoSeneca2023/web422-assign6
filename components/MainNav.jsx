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
import { useAtom } from "jotai";
import { addToHistory } from '@/lib/userData';
import { searchHistoryAtom } from "@/store";
import { useForm } from 'react-hook-form';
import { removeToken, readToken } from '@/lib/authenticate';



function navbar() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const { register, handleSubmit } = useForm();


  let token = readToken();
  console.log(`THIS IS TOKEN ${token}`)


  function logout() {
      setIsExpanded(false);
      removeToken();
      router.push('/login');
  }

  //TODO might need more work
  async function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);
    let queryString = `/artwork?title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(`title=true&q=${queryString}`));
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
              {token &&
              <Link href="/search" passHref legacyBehavior onClick={navLinkClicked}>
                <Nav.Link active={router.pathname === "/search"}>Advance Search</Nav.Link>
              </Link>
              }
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
            {token && <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favorites" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/favorites"} onClick={navLinkClicked}>Favorites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={navLinkClicked}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav> }

            {!token && <Nav>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/login"} onClick={navLinkClicked}>LogIn</Nav.Link>
                  </Link>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/register"} onClick={navLinkClicked}>Register</Nav.Link>
                  </Link>
              </Nav> }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      </div>
    );
  }
  
export default navbar; 