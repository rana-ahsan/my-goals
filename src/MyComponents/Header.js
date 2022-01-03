import React from "react";
import PropTypes from 'prop-types'
import {Navbar, Container, Nav} from 'react-bootstrap'
export const Header = (props) => {
  return(
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/myGoals">My Goals</Nav.Link>
        <Nav.Link href="/About">About</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  )
}

Header.defaultProps = {
  title: "Goals"
}

Header.prototype = {
 title: PropTypes.string
}