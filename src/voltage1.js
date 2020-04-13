import React, { Component } from "react";
import "./App.css";
import alasql from "alasql";
import { Chart } from "react-google-charts";

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <h2>Voltage Graphs</h2>
      </div>
    );
  }
}

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      dt: "",
    };
  }

  async componentDidMount() {
    // const rqstDate = this.props.title;
    const url = "http://118.185.27.157:5000/energygrid1";
    // const url = url1.concat(rqstDate, "/");
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // console.log(items["_items"]);
      var it = items["_items"];
      var dataArray = [];
      var x;
      for (x = 3; x < 25; x++)
        dataArray.push({
          time: it[x].Time_Stamp.substr(11, 2),
          voltage: it[x].voltage,
        });

      console.log(dataArray);

      var res = alasql(
        "SELECT time, SUM(voltage) AS voltage \
         FROM ? \
         GROUP BY time",
        [dataArray]
      );

      var dataArray1 = [["time", "voltage"]];
      for (let step = 0; step < 24; step++) {
        dataArray1.push([0, 0]);
      }
      for (x in res) dataArray1[res[x].time] = [res[x].time, res[x].voltage];

      const options = {
        title: "Voltage vs Time comparison",
        hAxis: {
          title: "Time",
          viewWindow: { min: 0, max: 24 },
          ticks: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
          ],
        },
        vAxis: { title: "Voltage" },
        legend: "none",
      };

      console.log(dataArray1);
      return (
        <Chart
          chartType="ColumnChart"
          data={dataArray1}
          options={options}
          width="80%"
          height="400px"
          legendToggle
        />
      );
    }
  }
}

class voltage1 extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Graphs title={"2019-11-15/2019-11-16"} />
      </div>
    );
  }
}

export default voltage1;
