import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../../reusable/GlobalStyle';
import axios from 'axios';
import apiUrl from '../../reusable/apiUrl';

const ForgotPassword = ({navigation}) => {
  const [email, setemail] = useState('');

  const [loading, setloading] = useState(false);

  const resetPassword = () => {
    setloading(true);
    axios
      .post(`${apiUrl}/users/reset_password`, {
        email: email,
      })
      .then(response => {
        if (response.data.status === 1) {
          try {
            setloading(false);
            alert('Please check your email for new password');
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', padding: 15}}>
      <View style={{padding: 25}}>
        <View style={{marginTop: 0}}>
          <Text style={{fontSize: 22, fontWeight: '600'}}>
            Type your E-mail Address
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'grey',
              marginTop: 5,
            }}>
            Help us find your account
          </Text>
          <View style={{alignItems: 'center'}}>
            <Image
              style={[
                styles.tinyLogo,
                {height: 250, width: 270, marginTop: 20},
              ]}
              source={require('../../images/forgotPassword_photo.png')}
            />
          </View>
          <View>
            <View style={styles.input_top_margin}>
              <Text style={styles.input_title}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="abc@gmail.com"
                onChangeText={text => setemail(text.toLowerCase())}
              />
            </View>
            <TouchableOpacity
              onPress={resetPassword}
              style={[styles.btn_style]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 15,
                  marginRight: 10,
                }}>
                Send
              </Text>
              {loading ? <ActivityIndicator /> : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: 20, alignItems: 'flex-end'}}>
              <Text>Login ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
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
  tinyLogo: {
    width: 45,
    height: 45,
    marginRight: 0,
    borderWidth: 1,
    borderColor: 'white',
    resizeMode: 'contain',
  },
});
