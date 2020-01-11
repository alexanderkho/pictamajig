import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const server = 'http://localhost:8080/'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null,
      tags: {
        'cool': false,
        'funny': false,
        'sad': false, 
        'ducks': false,
        'pizza': false,
        'dogs': false,
        'trains': false,
        'TOP SECRET KEEP OUT': false,
        'slam dunks': false
      }
    }
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.file);
    const options = {
      headers: {'content-type': 'multipart/form-data'}
    };
    const response = await axios.post(server + 'upload', data, options)
    console.log('we done did it fellas', response.data)
  }

  handleFileChange(e) {
    this.setState({file: e.target.files[0]}, () => console.log(this.state));
  }

  toggleCheckbox (tag) {
    const oldVals = this.state.tags
    this.setState({
      tags: {...oldVals, [tag]: !this.state.tags[tag]}
    });
  }

  render () {
    return (
      <div>
        <h1>picta-majig</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange}/>
          <button type="submit">Submit!</button>
          <p>Select tags for your image</p>
          {Object.keys(this.state.tags).map((tag, i) => {
            return (
              <div key={i}>
                <span>{tag}</span>
                <input 
                  type="checkbox" 
                  name={tag} 
                  checked={this.state.tags[tag]}
                  onChange={() => this.toggleCheckbox(tag)}
                />
              </div>
            )
          })}
        </form>
      </div>
    )
  }
}

export default App;
