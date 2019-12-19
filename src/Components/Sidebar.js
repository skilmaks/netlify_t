import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/StudentProfile.css";

const Sidebar = props => {
	return (
		<Col sm='3'>
			<Row> 
				<Link to="/">Student</Link>
			</Row>
			<Row>
				<Link to="/">My Profile</Link>
			</Row>
			<Row> 
				<Link to="/">Leaderboards</Link>
			</Row>
			<Row> 
				<Link to="/">Give Points</Link>
			</Row>
		</Col>
	)
}

export default Sidebar