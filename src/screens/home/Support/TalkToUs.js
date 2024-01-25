import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import GlobalStyle from '../../../reusable/GlobalStyle';
import {EssContext} from '../../../../Context/EssContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../../reusable/apiUrl';
import axios from 'axios';

const TalkToUs = ({navigation}) => {
  const {location, user} = useContext(EssContext);
  const [subject, setsubject] = useState('');
  const [comment, setcomment] = useState('');
  const [loading, setloading] = useState(false);

  const add_complain = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userData = await AsyncStorage.getItem('UserData');
    const UserLocation = await AsyncStorage.getItem('UserLocation');

    const config = {
      headers: {Token: token},
    };

    const body = {
      mall_name: JSON.parse(UserLocation).address1,
      email_address: JSON.parse(userData).useremail,
      region: JSON.parse(userData).REGION,
      phone_no: JSON.parse(userData).phone_no,
      subject: subject,
      comment: comment,
    };
    console.log('body1mon----->', body);
    if (subject && comment) {
      setloading(true);
      axios
        .post(`${apiUrl}/api/addcomplain`, body, config)
        .then(response => {
          console.log('response', response.data);
          if (response.data.status == 1) {
            try {
              setloading(false);
              alert(response.data.msg);
              navigation.goBack();
            } catch (e) {
              setloading(false);
              console.log(e);
            }
          } else {
            setloading(false);
            console.log(response.data);
          }
        })
        .catch(error => {
          setloading(false);
          console.log(error);
        });
    } else if (subject == '') {
      alert('write a subject');
    } else if (comment == '') {
      alert('write a comment');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyle.blueLight,
        padding: 20,
      }}>
      <View
        style={{
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 5,
          width: '100%',
          margin: 10,
        }}>
        <View style={{}}>
          <Text style={styles.input_title}>Subject</Text>
          <TextInput
            style={styles.input}
            onChangeText={setsubject}
            placeholder="Please enter subject"
          />
        </View>
        <View style={styles.input_top_margin}>
          <Text style={styles.input_title}>Comment</Text>
          <TextInput
            onChangeText={setcomment}
            multiline
            style={[
              styles.input,
              {
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
                height: 150,
              },
            ]}
            placeholder="Put your comment here....."
          />
        </View>
        <Text style={{marginVertical: 20}}>
          * You will get an email after submission
        </Text>
        <TouchableOpacity
          onPress={add_complain}
          style={{
            padding: 15,
            backgroundColor: GlobalStyle.blueDark,
            borderRadius: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '700', marginRight: 5}}>
            Done
          </Text>
          {loading ? <ActivityIndicator color="white" /> : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TalkToUs;

const styles = StyleSheet.create({
  input_title: {marginBottom: 10, fontSize: 14, fontWeight: '500'},

  input: {
    height: 45,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  input_top_margin: {marginTop: 30},
});
