import React from "react";
import { ColumnChart } from "react-chartkick";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import "chart.js";

class PointsWeekly extends React.Component {
  // state = {[]};
  render() {
    return (
      <div style={{ height: "40%", width: "40%" }}>
        <ColumnChart
          data={[
            ["Creativity", this.props.creativity_score],
            ["Leadership", this.props.leadership_score],
            ["Respect", this.props.respect_score],
            ["Total", this.props.accumulated_score]
          ]}
        />
      </div>
    );
  }
}

export default PointsWeekly;
