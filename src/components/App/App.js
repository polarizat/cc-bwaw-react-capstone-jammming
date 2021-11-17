import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [
        {name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water', id: 123},
        {name: 'Tiny Dancer - Live Album Version', artist: 'Ben Folds', album: 'Ben Folds Live', id: 124},
        {name: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story', id: 125},
        {name: 'Tiny Dancer2', artist: 'Elton John', album: 'Madman Across The Water', id: 126},
        {name: 'Tiny Dancer3 - Live Album Version', artist: 'Ben Folds', album: 'Ben Folds Live', id: 127},
        {name: 'Tiny Dancer4', artist: 'Tim McGraw2', album: 'Love Story', id: 128},
        {name: 'Tiny Dancer444444', artist: 'Tim McGraw2', album: 'Love Story', id: 129}
      ],
      playlistName: "It's Not Right But It's Okay",
      playlistTracks: [
        {name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water', id: 123},
        {name: 'Tiny Dancer - Live Album Version', artist: 'Ben Folds', album: 'Ben Folds Live', id: 124},
        {name: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story', id: 125}
      ]
  };
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  }

  removeTrack(removedTrack) {
      this.setState({playlistTracks: this.state.playlistTracks.filter(track => track.id !== removedTrack.id)});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
