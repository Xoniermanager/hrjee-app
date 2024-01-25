import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../../../reusable/apiUrl';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {EssContext} from '../../../../../Context/EssContext';
import PullToRefresh from '../../../../reusable/PullToRefresh';

const LeaveDetails = ({navigation, route}) => {
  const {user} = useContext(EssContext);

  const [leaveDetails, setleaveDetails] = useState();
  const [approvalHist, setapprovalHist] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      get_leaveDetails();
    }, []),
  );

  const get_leaveDetails = async () => {
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };

    const body = {
      leaveid: route.params.leave_id,
    };
    // console.log('body1mon----->', body);
    axios
      .post(`${apiUrl}/secondPhaseApi/leave_detail_by_leave_id`, body, config)
      .then(response => {
        // console.log('response', response.data);
        if (response.data.status == 1) {
          try {
            console.log(response.data.data);
            // setrecentLogs(response.data.content);
            setleaveDetails(response.data.data);
            setapprovalHist(response.data.data.approval_history);
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
    get_leaveDetails();
  };

  const cancelLeave = async () => {
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };

    const body = {
      leave_id: leaveDetails.leaveid,
      leave_wfstage_id: 9,
      current_approver_eno: user.EMPLOYEE_NUMBER,
      stage_actor_eno: user.EMPLOYEE_NUMBER,
    };
    // console.log(body);
    leaveDetails
      ? axios
          .post(`${apiUrl}/secondPhaseApi/leave_action`, body, config)
          .then(response => {
            // console.log('response', response.data);
            if (response.data.status == 1) {
              try {
                alert(response.data.message);
                navigation.goBack();
              } catch (e) {
                alert(e);
              }
            } else {
              alert(response.data.message);
            }
          })
          .catch(error => {
            alert(error);
          })
      : null;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e3eefb'}}>
      {leaveDetails ? (
        <>
          <PullToRefresh onRefresh={handleRefresh}>
            <View style={{backgroundColor: 'white'}}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#0043ae',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 17}}>
                  Employee Details
                </Text>
              </View>
              <View style={{padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Leave ID:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {leaveDetails.leaveid}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Employee ID:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {leaveDetails.userid}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>Name:</Text>
                  <Text style={[styles.value, {marginTop: 0, width: 150}]}>
                    {leaveDetails.user_name}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>Balance:</Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {leaveDetails.leave_balance}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{backgroundColor: 'white', marginTop: 15}}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#0043ae',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 17}}>
                  Leave Details
                </Text>
              </View>
              <View style={{padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Leave Type:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {leaveDetails.leavetype_data.leave_type}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Current Status:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {approvalHist &&
                      approvalHist[approvalHist.length - 1]?.status}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Leave start day:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {new Date(leaveDetails.leave_start_dt).toLocaleDateString(
                      'en-GB',
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Leave end day:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {new Date(leaveDetails.leave_end_dt).toLocaleDateString(
                      'en-GB',
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    No. of Days:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {leaveDetails.number_of_days}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>Note:</Text>
                  <Text style={[styles.value, {marginTop: 0, width: 170}]}>
                    {leaveDetails.notes}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 15,
                marginBottom: 120,
              }}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#0043ae',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 17}}>
                  Emergency Contacts
                </Text>
              </View>
              <View style={{padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>Name:</Text>
                  <Text style={[styles.value, {marginTop: 0, width: 150}]}>
                    {leaveDetails.emergency_contact_name}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>Address:</Text>
                  <Text style={[styles.value, {marginTop: 0, width: 150}]}>
                    {leaveDetails.emergency_contact_address}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.heading, {marginTop: 0}]}>
                    Telephone:
                  </Text>
                  <Text style={[styles.value, {marginTop: 0}]}>
                    {leaveDetails.emergency_contact_phone}
                  </Text>
                </View>
              </View>
            </View>
          </PullToRefresh>

          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: 15,
              backgroundColor: 'white',
              borderTopWidth: 0.5,
              borderTopColor: '#00000030',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => cancelLeave()} style={styles.btn}>
              <Text style={{color: 'white', fontWeight: '700'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btn}>
              <Text style={{color: 'white', fontWeight: '700'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#0043ae" />
        </View>
      )}
    </View>
  );
};

export default LeaveDetails;

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  heading: {fontWeight: '700', marginTop: 20},
  value: {marginTop: 20, textAlign: 'right'},
  btn: {
    padding: 13,
    backgroundColor: '#0043ae',
    borderRadius: 5,
    alignItems: 'center',
    width: '40%',
  },
});
