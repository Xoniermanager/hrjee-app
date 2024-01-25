import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import GlobalStyle from '../../reusable/GlobalStyle';
import {Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../reusable/apiUrl';
import axios from 'axios';
import {EssContext} from '../../../Context/EssContext';
import messaging from '@react-native-firebase/messaging';

const Login = ({navigation}) => {
  const {setuser, setlocation} = useContext(EssContext);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [fcmtoken, setfcmtoken] = useState();

  const login = () => {
    setloading(true);
    axios
      .post(`${apiUrl}/users/login`, {
        email: email,
        password: password,
        device_id: fcmtoken,
      })
      .then(response => {
        if (response.data.status == 1) {
          try {
            setloading(false);
            // console.log('token####>', response.data.token);
            AsyncStorage.setItem('Token', response.data.token);
            AsyncStorage.setItem(
              'UserData',
              JSON.stringify(response.data.data),
            );
            setuser(response.data.data);
            AsyncStorage.setItem(
              'UserLocation',
              JSON.stringify(response.data.location),
            );
            setlocation(response.data.location);
            navigation.reset({
              index: 0,
              routes: [{name: 'home'}],
            });
          } catch (e) {
            setloading(false);
            alert(e);
          }
        } else {
          setloading(false);
          alert('Please enter correct credentials');
        }
      })
      .catch(error => {
        setloading(false);
        alert(error);
      });
  };

  async function getFCMToken() {
    const token = await messaging().getToken();
    // console.log(token);
    setfcmtoken(token);
  }

  getFCMToken();

  console.log('new token', fcmtoken);

  const phoneNumber = '8989777878';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{padding: 30}}>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>Sign In</Text>
            <Text style={{fontSize: 14, marginTop: 5}}>
              Hi there! Nice to see you again.
            </Text>
            <View style={{alignItems: 'center'}}>
              <Image
                style={[
                  styles.tinyLogo,
                  {height: 250, width: 270, marginTop: 20},
                ]}
                source={require('../../images/signIn_photo.png')}
              />
            </View>

            <View style={styles.input_top_margin}>
              <Text style={styles.input_title}>Employee Id</Text>
              <TextInput
                style={styles.input}
                placeholder="xyz@gmail.com"
                onChangeText={text => setemail(text.toLowerCase())}
              />
            </View>
            <View style={styles.input_top_margin}>
              <Text style={styles.input_title}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="**********"
                onChangeText={text => setpassword(text.toLowerCase())}
              />
            </View>
            <TouchableOpacity style={[styles.btn_style]} onPress={login}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 15,
                  marginRight: 10,
                }}>
                Sign In
              </Text>
              {loading ? <ActivityIndicator /> : null}
            </TouchableOpacity>
            <View style={{alignItems: 'center', marginTop: 40}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Forgot Password')}>
                <Text style={styles.text}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
                <Text style={styles.text}>Contact HR for any login issue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {fontSize: 13, marginTop: 10},
  tinyLogo: {
    width: 45,
    height: 45,
    marginRight: 0,
    borderWidth: 1,
    borderColor: 'white',
    resizeMode: 'contain',
  },
  input_title: {marginBottom: 3, fontSize: 14, fontWeight: '500'},
  input_top_margin: {marginTop: 20},
  input: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  btn_style: {
    width: '100%',
    marginTop: 30,
    backgroundColor: GlobalStyle.blueDark,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
