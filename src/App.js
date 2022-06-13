import React, { Component } from "react";
import './App.css';




const STATUS_FETCHING = "fetching";
const STATUS_FETCHED = "fetched";
const STATUS_LOADED = "loaded";


class App extends Component {

  componentDidMount() {
    this.fetchNewCat();
  }

  state = {
      image: null,
      loadingState: STATUS_FETCHING
  }

   fetchNewCat = async() => {
      fetch('https://api.thecatapi.com/v1/images/search',
      {
        headers: {
          "Content-type": "application/json",
          "x-api-key": "8973db4c-99fc-4f9a-9c24-123de62f622d"
        }
      })
      .then(data => data.json())
      .then(data => {
          const { url} = data[0];
          this.setState({image: url, loadingState: STATUS_FETCHED})
          console.log(data)
      })
      
    }
    render(){
      return (
      <div className="container" >
        <div>
          <button className="button" onClick={this.fetchNewCat}>GET CAT!</button>   
          </div>
          <div>
          {this.state.loadingState !== STATUS_LOADED && (
            <div className="loader">
              LOADING...
            </div>
          )}
          {this.state.loadingState !== STATUS_FETCHING && this.state.image ? (
            <img className="catpic"
              onLoad={() => {
                this.setState({
                  loadingState: STATUS_LOADED
                });
              }}
              style={{
                display:
                  this.state.loadingState === STATUS_LOADED ? "inline" : "none"
              }}
              key={this.state.image}
              src={this.state.image}
              alt="Random cat image"
            />
          ) : null}
          </div>
      </div>
      )
  }
};


export default App;
