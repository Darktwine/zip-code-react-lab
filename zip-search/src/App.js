import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>
      <h5>{`${props.cityInfo.City}, ${props.cityInfo.State}`}</h5>
      <ul>
        <li>{`State: ${props.cityInfo.State}`}</li>
        <li>{`Location: (${props.cityInfo.Lat}, ${props.cityInfo.Long})`}</li>
        <li>{`Population (estimated): ${props.cityInfo.EstimatedPopulation}`}</li>
        <li>{`Total Wages: ${props.cityInfo.TotalWages}`}</li>
      </ul>
    </div>
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <div>
      <label>Zip Code:</label>
      <input type="text" onChange={onZipChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      citiesInfo:[],
      validZip: false,
    }
  }

  // Passed as a prop to ZipSearchField
  zipChanged(e) {
    // Make GET request for the zip resource
    // then, when you receive the result, store it in state
    fetch('http://ctp-zip-api.herokuapp.com/zip/' + e.target.value)
      .then(res => res.json())
      .then(body => {
        console.log(body);
        for (let i = 0; i < body.length; i++) {
          // console.log(body[i].City);
          this.setState({
            validZip: true,
            citiesInfo : [...this.state.citiesInfo, body[i]],
          });
        }
        // console.log(this.state.cities);
      })
      .catch(err => {
        this.setState({ validZip: false });
        console.log(err)
      })

    this.setState({
      zipCode: e.target.value
    });
    
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        {/* if zip search field has changed, call zipChanged function, and pass event in */}
        <ZipSearchField onZipChange={(e) => this.zipChanged(e)}/>
        <div>
          {/*
            Instead of hardcoding the following 3 cities,
            Create them dynamically from this.state.cities
          */}
          
          {this.state.citiesInfo.map( (eachCity) => (
            <City cityInfo={eachCity}/>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
