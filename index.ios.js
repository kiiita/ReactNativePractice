/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
//var MOCKED_MOVIES_DATA = [
//  {title: 'kiiita', year: 'with React', posters: {thumbnail: 'https://avatars.githubusercontent.com/u/5590142?v=2'}},
//];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var AwesomeProject = React.createClass({
  //getInitialState: function() {
  //  return {
  //    movies: null,
  //  };
  //},
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  //fetchData: function() {
  //  fetch(REQUEST_URL)
  //    .then((response) => response.json())
  //    .then((responseData) => {
  //      this.setState({
  //        movies: responseData.movies,
  //      });
  //    })
  //    .done();
  //},
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  //render: function() {
  //  if (!this.state.movies) {
  //    return this.renderLoadingView();
  //  }

  //  var movie = this.state.movies[1];
  //  return this.renderMovie(movie);
  //},
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#538AC6',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
  },
  year: {
    textAlign: 'left',
    color: '#fff',
  },
  thumbnail: {
    width: 81,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
