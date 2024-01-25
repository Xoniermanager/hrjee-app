import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../../reusable/Button';

const Services = ({navigation}) => {
  return (
    <View style={{flex: 1, padding: 15, backgroundColor: 'white'}}>
      <Button
        label={'Attendence'}
        onPress={() => navigation.navigate('Select Attendence')}
      />
      <Button
        label={'Leave'}
        onPress={() => navigation.navigate('Applied Leaves')}
      />
      <Button
        label={'Holidays'}
        onPress={() => navigation.navigate('Holidays')}
      />
      <Button
        label={'Payslip'}
        onPress={() => navigation.navigate('Payslip')}
      />
      <Button
        label={'Document'}
        onPress={() => navigation.navigate('Document')}
      />
      <Button label={'Forms'} onPress={() => navigation.navigate('Forms')} />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
