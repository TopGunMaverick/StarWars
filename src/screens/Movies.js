import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FullScreenSpinnerHOC from '../hoc/FullScreenSpinnerHOC';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_ENDPOINT = 'https://swapi.dev/api/films/';
const FullScreenSpinnerView = FullScreenSpinnerHOC(View);

export default class Movies extends Component {
  state = {
    logging: false,
    movieArr: [],
    isFetching: false,
    query: '',
    movieArrMain: []
  };


  componentDidMount() {
    this.callMoviesAPI();

  }
  // get movies  from swapi
  callMoviesAPI() {
    if (!this.state.isFetching) {
      this.setState({ logging: true });
    }
    axios.get(API_ENDPOINT)
      .then((response) => {
        this.setState({ logging: false });
        response.data.results.sort((a, b) => a.episode_id - b.episode_id);
        this.setState({ movieArr: response.data.results, movieArrMain: response.data.results, isFetching: false });

      });

  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.callMoviesAPI(); });
  }

  listItemOnPressHandler = (item) => {
    Actions.characterList({ movieData: item });
  }

  deleteItemHandler = (id) => {

    const filteredData = this.state.movieArr.filter(item => item.episode_id !== id);
    this.setState({ movieArr: filteredData });
    Toast.show("Deleted", Toast.SHORT);

  }

  handleSearch = (text) => {
    let formattedQuery = text.toLowerCase();
    let fullList = this.state.movieArrMain;
    let filteredList = fullList.filter((item) => {
      if (item.title.toLowerCase().match(formattedQuery))
        return item;
    })
    this.setState({ movieArr: filteredList, query: text });

  }

  addNewData = () => {
    Actions.addMovie({
      movieData: this.state.movieArrMain,
      beforeBack: () => { this.loadData() }
    });
  }

  loadData = async () => {


    try {
      const jsonValue = await AsyncStorage.getItem('movie_key')
      console.log('Done Load Data', jsonValue)
      var movObject = JSON.parse(jsonValue);

      var filteredData = this.state.movieArr;
      filteredData.push(movObject);
      this.setState({ movieArr: filteredData });

    } catch (e) {
      // read error
      console.log("AsyncStorage Error", e);
    }



  }



  getMyObject = async () => {
    console.log('Done Load Data 1')
    try {
      const jsonValue = await AsyncStorage.getItem('movie_key')
      console.log('Done Load Data', jsonValue)
      var movObject = JSON.parse(jsonValue);

      var filteredData = this.state.movieArr;
      filteredData.push(movObject);
      this.setState({ movieArr: filteredData });
      // return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // read error
      console.log("AsyncStorage Error", e);
    }

    console.log('Done Load Data')

  }

  render() {
    return (
      <FullScreenSpinnerView
        spinner={this.state.logging}
        style={styles.container}
      >
        <View style={styles.container}>

          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              margin: 10,
              borderRadius: 20,
              height: 60,
              borderWidth: 1,
              borderColor: '#ECF0F3',
              paddingHorizontal: 19
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={this.state.query}
              onChangeText={queryText => this.handleSearch(queryText)}
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>

          <TouchableOpacity
            style={[
              {
                marginEnd: 20,
                alignSelf: 'flex-end',
                backgroundColor: '#11B8FF'

              }
            ]}
            onPress={() => this.addNewData()}>
            <Text style={styles.titleText}>Add new </Text>
          </TouchableOpacity>

          <FlatList style={{ marginTop: 20 }} data={this.state.movieArr}
            renderItem={({ item, index }) => (
              <View style={styles.movieSection}>
                <View style={styles.movieItem}>

                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => this.deleteItemHandler(item.episode_id)}>
                      <Icon name={'trash'} size={wp('12%')} style={styles.closeIcon} />
                    </TouchableOpacity>
                  </View>

                  <Text allowFontScaling={false} style={styles.titleText}>{item.title}</Text>

                  <Text allowFontScaling={false} style={styles.movieText}>EpisodeID: {item.episode_id}</Text>

                  <Text allowFontScaling={false} style={styles.descText}>Opening Crawl: {item.opening_crawl}</Text>

                  <Text allowFontScaling={false} style={styles.movieText}>Director: {item.director}</Text>

                  <Text allowFontScaling={false} style={styles.movieText}>Producer: {item.producer} </Text>

                  <Text allowFontScaling={false} style={styles.movieText}>Release Date: {item.release_date} </Text>
                  <TouchableOpacity onPress={() => this.listItemOnPressHandler(item)}>
                    <Text allowFontScaling={false} style={styles.charText}>Characters: Tap here to see characters... </Text>

                  </TouchableOpacity>
                </View>
              </View>
            )}
            extraData={this.state.movieArr}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}

          />


        </View>
      </FullScreenSpinnerView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20
  },
  movieSection: {
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  movieItem: {
    backgroundColor: '#ADD8E6',
    width: '100%',
    flexDirection: 'column',
    //height: hp('9%'),
    marginBottom: hp('2%'),
    alignItems: 'flex-start',
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
  },
  movieText: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: 'black',
  },
  titleText: {
    fontSize: wp('6%'),
    margin: hp('1%'),
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  charText: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  descText: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: 'black',
    flexShrink: 1
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginTop: hp('5%'),
    alignSelf: 'flex-end'
  },
  closeIcon: {
    marginRight: wp('1%')
  },

});