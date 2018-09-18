import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../actions/actions';
import SongList from '../components/songList';

const headingStyle = {
  fontFamily: 'New Rocker',
  fontSize: '50px',
  textAlign: 'center'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleTextInput = event => {
    this.setState({
      input: event.target.value
    });
  };

  componentDidMount() {
    this.props.fet();
  }

  render() {
    let arr = this.props.albums.filter(
      el =>
        el.artist.toLowerCase().indexOf(this.state.input.toLowerCase()) !==
          -1 ||
        el.song.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1
    );

    return (
      <div style={headingStyle}>
        <h1>{this.props.date === null ? 'connecting to Billboard...' : ''}</h1>
        <h3 className="f2" style={headingStyle}>
          {this.props.date === null ? '' : `Billboard Hot 100 for week ending `}
          {this.props.date}
        </h3>
        <form fontFamily="Helvetica">
          <label>
            <input
              onChange={this.handleTextInput}
              type="text"
              placeholder="search..."
              name="text"
            />
          </label>
        </form>
        <SongList list={arr} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albumReducer.albums,
  date: state.albumReducer.date
});

const mapDispatchToProps = dispatch => ({
  fet: () => dispatch(fetchAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
