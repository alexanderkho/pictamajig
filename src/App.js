import React, { Component } from 'react';
import Gallery from './Gallery';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      activePictures: [],
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
      },
      username: '',
      filterVal: null
    }
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.checkTags = this.checkTags.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.filterPics = this.filterPics.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get('/pictures');
    this.setState({
      pictures: response.data,
      activePictures: response.data
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const tags = this.checkTags();
    if (this.state.file === null) {
      alert('Please select a file!');
      return;
    }
    if (this.validateFile() === false) {
      alert('Invalid file type');
      return;
    }
    if (tags === null) {
      alert('Please select at least one tag!');
      return;
    }
    if (this.state.username === '') {
      alert('Please enter a username!');
      return;
    }
    const data = new FormData();
    data.append('file', this.state.file);
    data.append('tags', JSON.stringify(tags));
    data.append('username', this.state.username);
    const options = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    await axios.post('/upload', data, options)
    alert('image uploaded!');
    window.location.reload();
  }

  handleFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  toggleCheckbox(tag) {
    const oldVals = this.state.tags
    this.setState({
      tags: { ...oldVals, [tag]: !this.state.tags[tag] }
    });
  }

  checkTags() {
    const tags = [];
    for (let tag in this.state.tags) {
      if (this.state.tags[tag]) {
        tags.push(tag)
      }
    }
    return tags.length > 0 ? tags : null;
  }

  changeUsername(e) {
    this.setState({ username: e.target.value })
  }

  filterPics() {
    const { filterVal } = this.state;
    let filteredPictures;
    if (filterVal === "null") {
      filteredPictures = this.state.pictures;
    } else {
      filteredPictures = [...this.state.pictures].filter(picture => picture.tags.includes(filterVal));
    }
    this.setState({ activePictures: filteredPictures });
  }

  updateFilter(e) {
    this.setState({ filterVal: e.target.value }, this.filterPics);
  }

  validateFile() {
    const fileTypes = /jpeg|jpg|png|gif/;
    const ext = this.state.file.name.split('.').pop();
    return fileTypes.test(ext.toLowerCase());
  }

  render() {
    return (
      <div className="App">
        <h1>picta-majig</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Enter your name:</p>
          <input type="text" value={this.state.username} onChange={this.changeUsername} />
          <p>Upload a file!</p>
          <input type="file" onChange={this.handleFileChange} />
          <button type="submit">Submit!</button>
          <p>Select tags for your image</p>
          <div className="tags-container">
            {Object.keys(this.state.tags).map((tag, i) => {
              return (
                <div key={i} className="btn-group-toggle tag" >
                  <label className={`btn btn-secondary ${this.state.tags[tag] ? 'active': ''}`}>
                    <input
                      type="checkbox"
                      name={tag}
                      checked={this.state.tags[tag]}
                      onChange={() => this.toggleCheckbox(tag)}
                    /> {tag}
                  </label>
                </div>
              )
            })}
          </div>
        </form>
        <hr/>
        <h1>Gallery</h1>
        <p>Sort By:</p>
        <select name="tag" onChange={this.updateFilter}>
          <option value="null"></option>
          {Object.keys(this.state.tags).map((tag, i) => {
            return (
              <option key={i} value={tag}>{tag}</option>
            )
          })}
        </select>
        <br></br>
        <br></br>
        <Gallery pictures={this.state.activePictures} />
      </div>
    )
  }
}

export default App;
