import React from "react";
import { Nav } from "react-bootstrap";

const PointsNavBar = props => {
  return (
    <>
      <Nav
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="#" onClick={e => this.props.toggleView(e)}>
            Weekly
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="#" onClick={e => this.props.toggleView(e)}>
            Yearly
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default PointsNavBar;
