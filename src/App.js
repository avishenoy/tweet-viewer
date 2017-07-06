import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <TweetTable />
      </div>
    );
  }
}

class GetButton extends Component {

  render() {
    return (
      <button className="getbutton" onClick={() => this.props.handleOnClick()}>
        Refresh Tweet
      </button>
    );
  }
}

class TweetTable extends Component {

  constructor() {
    super();
    this.state = {
      rowArray : Array(10).fill(null),
    }
  }

  addLoggin(d) {
    console.log("This logging is called with param: " + d);
  }

  setRowArrayValue(index, value)
  {
    console.log("Setting rowArray at index " + index + " with value: " + value);
    const rowArrayClone = this.state.rowArray.slice();
    rowArrayClone[index] = value;
    this.setState({rowArray : rowArrayClone});
  }

  renderTweetRows(d, t) {
    return (
      <TweetRow 
          tDate={d}
          tText={t}
      />
    );
  }

  getTweetData() 
  {
    fetch("http://localhost:5000/v1/tweet/list")
    .then(function(response){
      let r = response.json();
      console.log("Tweet list from server: " + r);
      return r;
    })
    .then(function(processedData){
      var rows = processedData;
      var processedRow = [];
      console.log("Second level processor: " + rows);

        rows.forEach(function(entry, i){
          console.log("Each entry: " + entry.date + " ||| " + entry.text);
          //tRows.push(<TweetRow key={entry.date} tDate={entry.date} tText={entry.text}/>);
          processedRow.push(<TweetRow key={entry.text} tDate={entry.date} tText={entry.text}/>);
        }, this);
        return processedRow;
    }.bind(this))
    .then(function(processedTweetRows){
      processedTweetRows.forEach(function(e, i)
      {
        this.setRowArrayValue(i, e);
      }, this);
    }.bind(this))
    .catch((error) => {
      console.log("Error on fetch: " + error);
    });
  }

  render() {
    //var rows = [{ date : '23', text : 'a'}, { date: '24', text : 'b'} ];
    var tRows = [];
    var myFunc = this.addLoggin;
    this.addLoggin("Test");
    myFunc("Test2");

    

    return (<div>
            <table>
              <thead>
                <tr>
                  <th> Date</th>
                  <th> Tweet</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rowArray[0]}
                {this.state.rowArray[1]}
                {this.state.rowArray[2]}
                {this.state.rowArray[3]}
                {this.state.rowArray[4]}
                {this.state.rowArray[5]}
                {this.state.rowArray[6]}
                {this.state.rowArray[7]}
                {this.state.rowArray[8]}
                {this.state.rowArray[9]}
              </tbody>
              </table>
              <GetButton handleOnClick={() => this.getTweetData()} />
              </div>
            );
    


    
  }

}

class TweetRow extends Component {

  render() {
    return(
    <tr>
      <td>{this.props.tDate}</td>
      <td>{this.props.tText}</td>
    </tr>
    );
  }
}

export default App;
