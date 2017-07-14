import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart.js';

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

class Searchbar extends Component {

  constructor() {
    super();
    this.state = {
      searchString : null
    }
    this.handleFilterStringChange = this.handleFilterStringChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleFilterStringChange(e)
  {
    console.log("Search bar changed to: " + e.target.value);
    this.setState({searchString : e.target.value});
    this.props.tweetDataChange(e.target.value);
  }

  handleKeyPress(event)
  {
    console.log("Event: " + event.key);
    if (event.key === "Enter")
    {
      console.log("Got ENTER event");
      this.props.tweetDataChange(this.props.searchString);
    }
  }

  render() {
    return (
    <form>
      <input 
        type = "text" placeholder = "Search twitter handle.." 
        onChange = {this.handleFilterStringChange}
        onKeyPress = {(e) => this.handleKeyPress(e)}
         />
    </form>
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
      favCount : Array(10).fill(null)
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

  getTweetData(searchString) 
  {
    console.log("searchString is: " + searchString);
    if (searchString == null)
    {
      searchString = 'TeslaMotors';

    }

    console.log("getTweetData called with: " + searchString);
    
    fetch("http://localhost:5000/v1/tweet/list?queryString=" + searchString)
    .then(function(response){
      let r = response.json();
      console.log("Tweet list from server: " + r);
      return r;
    })
    .then(function(processedData){
      var rows = processedData;
      var processedRow = [];
      var tweetFavCount = [];
      console.log("Second level processor: " + rows);

        rows.forEach(function(entry, i){
          console.log("Each entry: " + entry.date + " ||| " + entry.text);
          processedRow.push(<TweetRow key={entry.text} tDate={entry.date} tText={entry.text}/>);
          tweetFavCount.push(entry.favorite_count);
          console.log("Each date: " + entry.date + " fav #: " + entry.favorite_count + " retweet #: " + entry.retweet_count);
        }, this);
        this.setState({favCount : tweetFavCount});
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
    return (<div>
            <table>
              <thead>
                <tr>
                  <th> Date</th>
                  <th> Tweet</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rowArray}
              </tbody>
              </table>
              <div>
              <Searchbar tweetDataChange = {(e) => this.getTweetData(e)} />
              <GetButton handleOnClick={() => this.getTweetData(null)} />
              </div>
              <div>
              <BarChart data={this.state.favCount} size={[500, 500]} />
              </div>
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
