import React, { Component } from 'react';
import './App.css';

function CitySearchField({cityName, onChange}) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>City Name:</label>
        <input
          type="text"
          className="form-control ml-2"
          value={cityName}
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
      zipCodes: [],
      cityName: '',
      states: [],
    }
  }
  
  cityChanged(event) {
    let city = event.target.value;
    let cityUpper = city.toUpperCase();
    console.log(cityUpper);
    if (city.length > 0) {
      fetch(`http://ctp-zip-api.herokuapp.com/city/${cityUpper}`)
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          this.setState({
            zipCodes: body,
          })
        })
        .catch((err) => {
          console.log(err);
          this.setState({zipCodes: []})
        })
    } else {
      this.setState({
        zipCodes: []
      })
    }

    this.setState({
      cityName: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Zip Search</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <CitySearchField
                cityName={this.state.cityName}
                onChange={(e) => this.cityChanged(e)}
              />
            </div>
          </div>
          {
            this.state.zipCodes.length === 0
              ? <h1>No Results</h1>
              : this.state.zipCodes.map( (zipCode) => {
                return <p>{zipCode}</p>
              }) 
          }
        </div>
      </div>
    );
  }
}

export default App;