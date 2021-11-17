import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state.SearchResults = [];
    this.state.playlistName = "It's Not Right But It's Okay";
    this.state.playlistTracks = [
      {name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water', id: 123},
      {name: 'Tiny Dancer - Live Album Version', artist: 'Ben Folds', album: 'Ben Folds Live', id: 124},
      {name: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story', id: 125}
    ]
    
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack === track.id)) {
      return;
    } else {
      this.setState(this.state.playlistTracks.push(track));
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
