import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
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
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Cargando tareas...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>

        <View style={styles.rightContainer}>
          <Text style={styles.year}>{movie.year}</Text>
          <Text style={styles.title}>{movie.title}</Text>
        </View>

        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0068C3', //el que hay que cambiar
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left',
    color: 'white',
  },
  year: {
    textAlign: 'left',
    fontSize: 10,
    color: '#CBF7F7',
  },
  listView: {
    paddingTop: 20,
    color: 'white',
    backgroundColor: '#F5FCFF', //barrita de arriba
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
