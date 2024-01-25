import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import GlobalStyle from '../../../reusable/GlobalStyle';
import {EssContext} from '../../../../Context/EssContext';
import {useFocusEffect} from '@react-navigation/native';
import apiUrl from '../../../reusable/apiUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PullToRefresh from '../../../reusable/PullToRefresh';

const Support = ({navigation}) => {
  const [empty, setempty] = useState(false);

  const [complainList, setcomplainList] = useState();
  const [loading, setloading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      get_complains();
    }, []),
  );

  const handleRefresh = async () => {
    // Do something to refresh the data
    get_complains();
  };

  const get_complains = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };

    const body = {};
    // console.log('body1mon----->', body);
    axios
      .post(`${apiUrl}/api/complain`, body, config)
      .then(response => {
        setloading(false);
        // console.log('response', response.data);
        if (response.data.status == 1) {
          try {
            console.log(response.data.content);
            setcomplainList(response.data.content);
            response.data.content.length < 1 ? setempty(true) : setempty(false);
            // setrecentLogs(response.data.content);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(error => {
        setloading(false);
        console.log(error);
      });
  };

  return (
    <>
      {empty && !loading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            style={styles.tinyLogo}
            source={require('../../../images/nothingToShow.gif')}
          />
        </View>
      )}

      {complainList && !loading && (
        <View>
          <View
            style={{
              backgroundColor: '#e3eefb',
              padding: 15,
              paddingTop: 0,
            }}>
            <PullToRefresh onRefresh={handleRefresh}>
              {complainList ? (
                complainList.map((i, index) => (
                  <View
                    key={index}
                    style={[
                      {
                        padding: 15,
                        backgroundColor: 'white',
                        marginTop: 20,
                        marginBottom:
                          index == complainList.length - 1 ? 100 : 0,
                        borderRadius: 5,
                        width: '99.4%',
                      },
                      GlobalStyle.card,
                    ]}>
                    <View style={styles.separator}>
                      <Text style={styles.heading}>Subject:</Text>
                      <Text>{i.subject}</Text>
                    </View>
                    <View style={styles.separator}>
                      <Text style={styles.heading}>Comment:</Text>
                      <Text>{i.comment}</Text>
                    </View>
                    <View style={styles.separator}>
                      <Text style={styles.heading}>Created Date:</Text>
                      <Text>{i.created_date}</Text>
                    </View>
                    <View style={styles.separator}>
                      <Text style={styles.heading}>Status:</Text>
                      <Text>{i.status}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <ActivityIndicator size="small" color="#388aeb" />
              )}
            </PullToRefresh>
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Talk to us')}
                style={{
                  padding: 15,
                  backgroundColor: GlobalStyle.blueDark,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '700'}}>
                  Talk to us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size="small" color="#388aeb" />
        </View>
      )}
    </>
  );
};

export default Support;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 300,
    height: 300,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  heading: {fontWeight: '700'},
});
