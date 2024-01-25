import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useIsDrawerActive,
} from '@react-navigation/drawer';
import Profile from '../src/screens/profile/Profile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  useFocusEffect,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const Drawer = createDrawerNavigator();
import GlobalStyle from '../src/reusable/GlobalStyle';
import apiUrl from '../src/reusable/apiUrl';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetLocation from 'react-native-get-location';
import ProfileNavigator from './ProfileNavigator';
import {EssContext} from '../Context/EssContext';
import Zocial from 'react-native-vector-icons/Zocial';

function CustomDrawerContent(props) {
  const [isModalVisible, setIsModalVisible] = useState(false); // state to control modal visibility
  const [Userdata, setUserdata] = useState({
    EMPLOYEE_NUMBER: '',
    name: '',
    email: '',
    phone: '',
    atWorkfor: '',
    attendence: '',
    leave: '',
    awards: '',
    fatherName: '',
    dob: '',
    gender: '',
    image: '',
    permanentAddress: '',
    department: '',
    joining_date: '',
    status: '',
    salary: '',
    location: {},
  });
  const [location, setlocation] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setshow] = useState('');
  const [showInput, setshowInput] = useState(false);
  const [addressTitle, setaddressTitle] = useState('');
  const [loading, setloading] = useState(false);
  const [address, setaddress] = useState('');
  const [showUpdate, setshowUpdate] = useState(false);
  const [updateId, setupdateId] = useState('');
  const [activeItem, setActiveItem] = useState('');

  const handleItemPress = item => {
    setModalVisible(!modalVisible);
    setshow(item);
    setActiveItem(item);
  };

  const isItemActive = item => {
    return item === activeItem;
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        get_employee_detail();
        get_address();
      })();
    }, []),
  );

  const get_employee_detail = async () => {
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };
    axios
      .post(`${apiUrl}/api/get_employee_detail`, {}, config)
      .then(response => {
        if (response.data.status === 1) {
          try {
            setUserdata({
              EMPLOYEE_NUMBER: response.data.data.EMPLOYEE_NUMBER,
              name: response.data.data.FULL_NAME,
              email: response.data.data.email,
              phone: response.data.data.mobile_no,
              atWorkfor: response.data.data.at_work_for,
              attendence: response.data.data.attendence,
              leave: response.data.data.leave,
              awards: response.data.data.awards,
              fatherName: response.data.data.father_name,
              dob: response.data.data.dob,
              gender: response.data.data.SEX,
              permanentAddress: response.data.data.permanent_address,
              image: response.data.data.image,
              department: response.data.data.department,
              joining_date: response.data.data.joining_date,
              status: response.data.data.status,
              salary: `${response.data.data.total_salary}`,
            });
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('some error occured');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const get_address = async () => {
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };
    axios
      .post(`${apiUrl}/api/get_location_list`, {}, config)
      .then(response => {
        if (response.data.status === 1) {
          try {
            console.log(response.data.data);
            setlocation(response.data.data);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('some error occured');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const add_address = async () => {
    setloading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        var lat = parseFloat(location.latitude);
        var long = parseFloat(location.longitude);
        setloading(true);
        const token = await AsyncStorage.getItem('Token');
        const config = {
          headers: {Token: token},
        };
        const body = {
          location_name: addressTitle,
          address1: address,
          latitude: lat,
          longitude: long,
        };
        console.log('add adrs=>', body);
        axios
          .post(`${apiUrl}/api/add_user_location`, body, config)
          .then(response => {
            setloading(false);
            if (response.data.status == 1) {
              try {
                setaddressTitle('');
                setaddress('');
                get_address();
                setshowInput(false);
                alert('Address added successfully, wait for admin approval');
              } catch (e) {
                alert(e);
              }
            } else if (response.data.status == 2) {
              setloading(false);
              alert(response.data.msg);
            } else {
              alert(response.data.msg);
            }
          })
          .catch(error => {
            setloading(false);
            alert(error);
          });
      })
      .catch(error => {
        setloading(false);
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const delete_address = async id => {
    setloading(true);
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };
    const body = {
      location_id: id,
    };

    // console.log('first--', body);

    axios
      .post(`${apiUrl}/api/delete_location`, body, config)
      .then(response => {
        if (response.data.status == 1) {
          setloading(false);
          try {
            alert(response.data.msg);
            get_address();
          } catch (e) {
            alert(e);
          }
        } else if (response.data.status == 2) {
          setloading(false);
          alert(response.data.msg);
        } else {
          alert(response.data.msg);
        }
      })
      .catch(error => {
        setloading(false);
        alert(error);
      });
  };

  const update_address = async id => {
    setloading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        var lat = parseFloat(location.latitude);
        var long = parseFloat(location.longitude);
        setloading(true);
        const token = await AsyncStorage.getItem('Token');
        const config = {
          headers: {Token: token},
        };
        const body = {
          location_id: id,
          location_name: addressTitle,
          address1: address,
          latitude: lat,
          longitude: long,
        };
        console.log('update adrs-->>', body);
        axios
          .post(`${apiUrl}/api/update_user_location`, body, config)
          .then(response => {
            setloading(false);
            if (response.data.status == 1) {
              setloading(false);
              try {
                setaddressTitle('');
                setaddress('');
                alert(response.data.msg);
                get_address();
                setshowInput(false);
              } catch (e) {
                alert(e);
              }
            } else if (response.data.status == 2) {
              setloading(false);
              alert(response.data.msg);
            } else {
              alert(response.data.msg);
            }
          })
          .catch(error => {
            setloading(false);
            alert(error);
          });
      })
      .catch(error => {
        setloading(false);
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const makeActive = async id => {
    const token = await AsyncStorage.getItem('Token');
    const config = {
      headers: {Token: token},
    };
    const body = {
      location_id: id,
    };
    // console.log('first-->>>>', body);

    axios
      .post(`${apiUrl}/api/active_user_location_request`, body, config)
      .then(response => {
        if (response.data.status == 1) {
          try {
            alert(response.data.msg);
            get_address();
          } catch (e) {
            alert(e);
          }
        } else if (response.data.status == 2) {
          alert(response.data.msg);
        } else {
          alert(response.data.msg);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const renderDetails = show => {
    if (show == 'PersonalDetails') {
      return (
        <View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Profile Photo</Text>
            <View style={{}}>
              <Image
                style={styles.tinyLogo}
                source={
                  Userdata.image
                    ? {uri: Userdata.image}
                    : require('../src/images/profile_pic.webp')
                }
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Father's Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Father's Name"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.fatherName}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>DOB</Text>
            <TextInput
              style={styles.input}
              placeholder="Date Of Birth"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.dob}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.gender}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Email ID</Text>
            <TextInput
              style={styles.input}
              placeholder="email address"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.email}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.phone}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Local Address</Text>
            <TextInput
              multiline
              style={[styles.input, {height: 60}]}
              placeholder="Local Address"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.permanentAddress}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Permanent Address</Text>
            <TextInput
              multiline
              style={[styles.input, {height: 60}]}
              placeholder="Permanent Address"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.permanentAddress}
            />
          </View>
        </View>
      );
    } else if (show == 'CompanyDetails') {
      return (
        <View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Employee Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Employee Number"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.EMPLOYEE_NUMBER}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Department</Text>
            <TextInput
              style={styles.input}
              placeholder="Department"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.department}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Date of Joining</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of Joining"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.joining_date}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Status</Text>
            <TextInput
              style={styles.input}
              placeholder="Status"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.status ? 'active' : 'inactive'}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.heading_modal}>Salary</Text>
            <TextInput
              style={styles.input}
              placeholder="Salary"
              editable={false}
              selectTextOnFocus={false}
              value={Userdata.salary}
            />
          </View>
        </View>
      );
    } else if (show == 'OfficeAddress') {
      return (
        <View>
          {location
            ? location.map(
                (i, index) =>
                  i.location_id != 209 && (
                    <TouchableOpacity
                      Key={index}
                      onPress={() =>
                        makeActive(i.location_id, i.location_name, i.address1)
                      }
                      style={{
                        marginTop: index > 0 ? 20 : 10,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Entypo
                            name="location-pin"
                            size={18}
                            style={{marginRight: 3, color: '#cd181f'}}
                          />
                          <View>
                            <Text style={{fontSize: 16, fontWeight: '500'}}>
                              {i.location_name}
                            </Text>
                            <Text
                              style={{
                                marginTop: 3,
                                color: 'grey',
                                width: width / 1.5,
                              }}>
                              {i.address1}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                              }}>
                              <TouchableOpacity
                                style={{marginRight: 20}}
                                onPress={() => delete_address(i.location_id)}>
                                <Text
                                  style={{
                                    color: GlobalStyle.blueDark,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                  }}>
                                  Delete
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{}}
                                onPress={() => {
                                  setshowInput(true),
                                    setshowUpdate(true),
                                    setupdateId(i.location_id);
                                  setaddressTitle(i.location_name);
                                  setaddress(i.address1);
                                }}>
                                <Text
                                  style={{
                                    color: GlobalStyle.blueDark,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                  }}>
                                  Edit
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        {i.active_status == 1 ? (
                          <Fontisto
                            name="checkbox-active"
                            size={17}
                            style={{marginRight: 3, color: '#0e664e'}}
                          />
                        ) : (
                          <Fontisto
                            onPress={() =>
                              makeActive(
                                i.location_id,
                                i.location_name,
                                i.address1,
                              )
                            }
                            name="checkbox-passive"
                            size={17}
                            style={{
                              marginRight: 3,
                              color: '#cd181f',
                              // position: 'absolute',
                              // left: 0,
                            }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  ),
              )
            : null}
          {showInput ? (
            <View style={{marginTop: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  Add / Update Address
                </Text>
                <AntDesign
                  onPress={() => {
                    setshowInput(false), setshowUpdate(false);
                  }}
                  name="closecircle"
                  size={18}
                  style={{marginRight: 3, color: 'red'}}
                />
              </View>

              <View style={styles.input_top_margin}>
                <Text style={styles.input_title}>Home / Office / Other</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setaddressTitle}
                  value={addressTitle}
                />
              </View>
              <View style={styles.input_top_margin}>
                <Text style={styles.input_title}>Location</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setaddress}
                  value={address}
                />
              </View>
            </View>
          ) : null}
          {showInput ? (
            showUpdate ? (
              <TouchableOpacity
                onPress={() => update_address(updateId)}
                style={[styles.btnStyle, {width: '100%', marginTop: 20}]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', marginRight: 5}}>
                  Update
                </Text>
                {loading ? <ActivityIndicator color="white" /> : null}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={add_address}
                style={[styles.btnStyle, {width: '100%', marginTop: 20}]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', marginRight: 5}}>
                  Submit
                </Text>
                {loading ? <ActivityIndicator color="white" /> : null}
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              onPress={() => {
                setshowInput(true),
                  setshowUpdate(false),
                  setaddressTitle(''),
                  setaddress('');
                alert(
                  'Please add address by physically being present at that address',
                );
              }}
              style={[styles.btnStyle, {width: '100%', marginTop: 20}]}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Add new address
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('Token');
    await AsyncStorage.removeItem('UserData');
    await AsyncStorage.removeItem('UserLocation');
    props.navigation.closeDrawer();
    props.navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require('../src/images/drawer-bg-img.webp')}
          style={{padding: 10, marginBottom: 8}}>
          <Image
            source={
              Userdata.image
                ? {uri: Userdata.image}
                : require('../src/images/profile.jpeg')
            }
            resizeMode="cover"
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
            }}
          />
          <View style={{marginTop: 5}}>
            <Text
              style={[styles.profileFont, {fontSize: 20, fontWeight: 'bold'}]}>
              {Userdata.name}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Zocial
                name="email"
                size={17}
                color="white"
                style={{marginRight: 5}}
              />
              <Text style={styles.profileFont}>{Userdata.email}</Text>
            </View>
          </View>
        </ImageBackground>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Personal Details"
          icon={color => (
            <MaterialCommunityIcons
              name="card-account-details-star-outline"
              size={18}
              color={color}
            />
          )}
          onPress={() => handleItemPress('PersonalDetails')}
          style={
            isItemActive('PersonalDetails')
              ? {backgroundColor: '#F5F5F5'}
              : null
          }
          activeTintColor={'red'}
        />
        <DrawerItem
          label="Company Details"
          icon={color => (
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={18}
              color={color}
            />
          )}
          onPress={() => handleItemPress('CompanyDetails')}
          style={
            isItemActive('CompanyDetails') ? {backgroundColor: '#F5F5F5'} : null
          }
          activeTintColor={'red'}
        />
        <DrawerItem
          label="Office Address"
          icon={color => <Feather name="map-pin" size={18} color={color} />}
          onPress={() => handleItemPress('OfficeAddress')}
          style={
            isItemActive('OfficeAddress') ? {backgroundColor: '#F5F5F5'} : null
          }
          activeTintColor={'red'}
        />
        <DrawerItem
          label="Logout"
          icon={color => <AntDesign name="logout" size={18} color={color} />}
          onPress={() => {
            setActiveItem('Logout');
            Alert.alert('', 'Are you sure you want to logout?', [
              {
                text: 'Cancel',
                onPress: () => setActiveItem(''),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => logout()},
            ]);
          }}
          style={isItemActive('Logout') ? {backgroundColor: '#F5F5F5'} : null}
        />
      </DrawerContentScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleModalClose}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>This is a modal!</Text>
          <TouchableOpacity onPress={handleModalClose}>
            <Text style={{color: 'red', marginTop: 16}}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={{alignItems: 'flex-end'}}>
              <AntDesign
                name="close"
                size={22}
                style={{
                  marginTop: location?.length > 5 ? 20 : 0,
                }}
                color="red"
                onPress={() => handleItemPress('')}
                // onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <ScrollView>{renderDetails(show)}</ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ProfileDrawer() {
  const {showDrawerHeader} = useContext(EssContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: showDrawerHeader,
          drawerIcon: ({color, size}) => (
            <AntDesign name="user" size={size} color={color} />
          ), // set the icon component
        }}
        name="Profile"
        component={ProfileNavigator}
      />
    </Drawer.Navigator>
  );
}

export default ProfileDrawer;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  profileFont: {
    color: 'white',
  },
  options: {
    width: 65,
    height: 65,
  },
  skill: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    borderRadius: 5,
    backgroundColor: '#d3e3fd30',
    borderColor: '#0c57d0',
  },
  heading: {fontWeight: '500', fontSize: 15},
  heading_grey: {fontSize: 14, color: 'grey', fontWeight: '300'},
  add_txt: {fontSize: 14, color: '#efad37', fontWeight: '600'},
  view_txt: {color: GlobalStyle.blueDark, fontWeight: 'bold'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000085',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width / 1.1,
  },
  input: {
    marginTop: 5,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
  },
  heading_modal: {
    fontSize: 15,
    fontWeight: '600',
  },
  btnStyle: {
    width: '40%',
    backgroundColor: GlobalStyle.blueDark,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input_title: {marginBottom: 3, fontSize: 14, fontWeight: '500'},
  input_top_margin: {marginTop: 15},
  input: {
    height: 45,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 45,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // width: '80%',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomsheetTxt: {fontSize: 17},
  bottomsheetLogo: {fontSize: 22, marginRight: 15},
  bottomsheetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
