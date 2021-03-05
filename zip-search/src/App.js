import React, { Component } from 'react';
import './App.css';

function City({data}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        { data.City }
      </div>
      <div className="card-body">
        <ul>
          <li>State: {data.state}</li>
          <li>Location: ({data.Lat}, {data.Long})</li>
        </ul>
      </div>
    </div>
  );
}
function ZipSearchField({zipCode, onChange}) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>Zip Code:</label>
        <input
          type="text"
          className="form-control ml-2"
          value={zipCode}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      zipCode: '',
    }
  }
  zipChanged(event) {
    let zip = event.target.value;
    console.log(zip);
    if (zip.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          this.setState({
            cities: body,
          })
        })
        .catch((err) => {
          console.log(err);
          this.setState({cities: []})
        })
    } else {
      this.setState({
        cities: []
      })
    }

    this.setState({
      zipCode: event.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <ZipSearchField
                zipCode={this.state.zipCode}
                onChange={(e) => this.zipChanged(e)}
              />
            </div>
          </div>
          {
            this.state.cities.length === 0
              ? <h1>No Results</h1>
              : this.state.cities.map((c, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col">
                      <City data={c} />
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    );
  }
}

export default App;
/*
npm install -g npm@latest
TODO:
- Display more data about each city
- remove results when extra characters are typed
- display "no results" if the zip is incorrect instead of empty
- add checks to prevent multiple requests if we know zip is invalid format
*/