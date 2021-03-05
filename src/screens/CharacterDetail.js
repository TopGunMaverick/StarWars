import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
const API_ENDPOINT = '';

export default function CharacterDetail(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Character Detail Screen", props.charData);
        // setData(props.movieData.characters)
        setIsLoading(true);
        axios.get(props.charData)
            .then((response) => {
                console.log("Character Detail Data", response.data)
                setData(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err);
            });


    }, []);

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
        backgroundColor: '#fff'
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
        marginBottom: hp('2%'),
        alignItems: 'flex-start',
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'),
    },
    titleText: {
        fontSize: wp('4%'),
        margin: hp('1%'),
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    movieText: {
        fontSize: wp('4%'),
        marginBottom: hp('1%'),
        color: 'black',
    },
});