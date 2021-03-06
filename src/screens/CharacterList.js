import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
const API_ENDPOINT = '';

export default function CharacterList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Character List Screen", props.movieData)
    setData(props.movieData.characters)


  }, []);

  listItemOnPressHandler = (item) => {
    Actions.characterDetail({ charData: item });
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
            </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginTop: 20 }}
        data={data}
        keyExtractor={item => item.first}
        renderItem={({ item, index }) => (
          <View style={styles.characterSection}>
            <View style={styles.listItem}>

              <View style={styles.metaInfo}>
                <TouchableOpacity onPress={() => this.listItemOnPressHandler(item)}>
                  <Text style={styles.titleText}>Character{index + 1}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  characterSection: {
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  listItem: {
    backgroundColor: '#ADD8E6',
    width: '100%',
    flexDirection: 'column',
    //height: hp('9%'),
    marginBottom: hp('2%'),
    alignItems: 'flex-start',
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  titleText: {
    fontSize: wp('4%'),
    margin: hp('1%'),
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});