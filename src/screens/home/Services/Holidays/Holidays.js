import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import GlobalStyle from '../../../../reusable/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../../../reusable/apiUrl';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import PullToRefresh from '../../../../reusable/PullToRefresh';

const Holidays = () => {
  const [holidays, setholidays] = useState(null);
  const [selectedMonth, setselectedMonth] = useState(new Date().getMonth());

  useFocusEffect(
    React.useCallback(() => {
      get_holidays();
    }, []),
  );

  const monthNames = [
    'jan',
    'feb',
    'mar',
    'april',
    'may',
    'june',
    'july',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec',
  ];

  const get_holidays = async () => {
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };

    const body = {};
    // console.log('body1mon----->', body);
    axios
      .post(`${apiUrl}/secondPhaseApi/holiday_list`, body, config)
      .then(response => {
        console.log('response', response.data);
        if (response.data.status === 1) {
          try {
            // console.log(response.data.data);
            setholidays(response.data.data);
          } catch (e) {
            alert(e);
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleRefresh = async () => {
    // Do something to refresh the data

    setselectedMonth(new Date().getMonth());
    get_holidays();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GlobalStyle.blueLight,
        padding: 15,
        paddingBottom: 0,
      }}>
      <PullToRefresh onRefresh={handleRefresh}>
        <Calendar
          theme={{
            arrowColor: GlobalStyle.blueDark,
            selectedDayBackgroundColor: GlobalStyle.blueDark,
          }}
          onMonthChange={month => {
            console.log('month changed', month.month);
            setselectedMonth(month.month);
          }}
        />
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 19, fontWeight: '700'}}>
            Holidays of the Month
          </Text>
          {holidays ? (
            Object.values(holidays)[selectedMonth - 1]?.map((i, index) => (
              <View key={index} style={styles.holiday_box}>
                <Text style={{fontSize: 17, fontWeight: '600'}}>
                  {i.occasion}
                </Text>
                <Text>{i.date}</Text>
              </View>
            ))
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="small" color="#388aeb" />
            </View>
          )}
        </View>
      </PullToRefresh>
    </View>
  );
};

export default Holidays;

const styles = StyleSheet.create({
  holiday_box: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GlobalStyle.blueDark,
    backgroundColor: 'white',
  },
});
