import React from "react";
import "../App.css";

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div className="Landing">
          <header className="Landing-header">
            <h1 className="Landing-intro">
              Be better equipped for{" "}
              <span className="Landing-special">Life</span> by learning soft{" "}
              <span className="Landing-special">Skills</span> the fun way.
            </h1>
          </header>
        </div>
      </>
    );
  }
}

export default LandingPage;
