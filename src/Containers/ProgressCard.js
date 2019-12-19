import React from "react";
import "../styles/ProgressCard.css";

import { ProgressBar, Button } from "react-bootstrap";

class MyProgress extends React.Component {

  render = props => {
    console.log(this.props.fave);

    const { name, points } = this.props.fave;

    return (
      <>
        <div className="Progress">
          <div className="Progress-wrapper">
            <ProgressBar
              variant="info"
              animated
              now={(this.props.accumulated_score / points) * 100}
            />
            {/* <img src={image} /> */}
            <p className="Progress-name">{name}</p>
            <h4>{`${this.props.accumulated_score} out of ${points}`}</h4>
            <Button variant="warning">Apply</Button>
          </div>
        </div>
      </>
    );
  };
}

export default MyProgress;
