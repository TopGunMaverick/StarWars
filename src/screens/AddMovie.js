import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';




export default class AddMovie extends Component {
  state = {
        title:'',
        openingCrawl:'',
        producer:'',
        director:'',
        episode_id:''
  };

  componentDidMount() {
  
    var dataArr=this.props.movieData;
    var id = dataArr[dataArr.length-1].episode_id +1;
    this.setState({episode_id:id});
  }

  validate(text, type) {

    if (type == 'title') {
        this.setState({ title: text })
    }

    if (type == 'crawl') {
        this.setState({ openingCrawl: text })
    }

    if (type == 'director') {
        this.setState({ director: text })
    }

    if (type == 'producer') {
        this.setState({ producer: text })
    }
}
  
  saveData = () => {

    if (this.state.title === '') {
        Toast.show("Please add title.", Toast.SHORT);
        return;
    }

    if (this.state.openingCrawl === '') {
        Toast.show("Please add opening crawl.", Toast.SHORT);
        return;
    }

    if (this.state.director === '') {
        Toast.show("Please add director.", Toast.SHORT);
        return;
    }

    if (this.state.producer === '') {
        Toast.show("Please add producer.", Toast.SHORT);
        return;
    }
    var movie = {
        ['title']: this.state.title,
        ['episode_id']: this.state.episode_id,
        ['opening_crawl']: this.state.openingCrawl,
        ['director']: this.state.director,
        ['producer']: this.state.producer,
       
        
      }

      console.log("Movie",movie);
      Actions.popTo('movies'); setTimeout(() => Actions.refresh({ movieObj: movie }));
  }

  render() {
    return (
     
        <View style={styles.container}>
            <ScrollView>
            <TextInput placeholder="Title"  style={[styles.textInput]} 
            onChangeText={(text) => this.validate(text, 'title')}/>
            <TextInput placeholder="Opening Crawl"   style={[styles.textInput]}
            onChangeText={(text) => this.validate(text, 'crawl')}/>
            <TextInput placeholder="Director"   style={[styles.textInput]} 
            onChangeText={(text) => this.validate(text, 'director')}/>
            <TextInput placeholder="Producer"  style={[styles.textInput]}
            onChangeText={(text) => this.validate(text, 'producer')} />

            <TouchableOpacity
          onPress={() => {
            this.saveData();
          }}
          style={[styles.button]}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            Add
          </Text>
        </TouchableOpacity>
            

            </ScrollView>

        </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19,
    margin:20
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center',
    margin:20
  }
  
});