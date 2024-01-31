import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import Home from '../src/screens/home/Home';

import Attendence from '../src/screens/home/Attendence/Attendence';
import News from '../src/screens/home/News/News';
import Policies from '../src/screens/home/Policies/Policies';
import Services from '../src/screens/home/Services/Services';
import Support from '../src/screens/home/Support/Support';
import Notifications from '../src/screens/home/Notifications/Notifications';
import LeavePolicy from '../src/screens/home/Policies/LeavePolicy';
import Details from '../src/screens/home/Policies/Details';
import SelectAttendence from '../src/screens/home/Services/SelectAttendence';
import ApplyLeave from '../src/screens/home/Services/Leave/ApplyLeave';
import LeaveList from '../src/screens/home/Services/Leave/LeaveList';
import Holidays from '../src/screens/home/Services/Holidays/Holidays';
import Payslip from '../src/screens/home/Services/Payslip/Payslip';
import Document from '../src/screens/home/Services/Document/Document';
import NewsDetails from '../src/screens/home/News/NewsDetails';
import LeaveDetails from '../src/screens/home/Services/Leave/LeaveDetails';
import DocumentDetails from '../src/screens/home/Services/Document/DocumentDetails';
import TalkToUs from '../src/screens/home/Support/TalkToUs';

import Login from '../src/screens/Login/Login';
import ForgotPassword from '../src/screens/Login/ForgotPassword';
import Forms from '../src/screens/home/Services/Forms/Forms';
import Acknowledgement from '../src/screens/home/Services/Forms/Acknowledgement/Acknowledgement';
import BusinessCard from '../src/screens/home/Services/Forms/BusinessCardRequest/BusinessCard';
import ClearanceLetter from '../src/screens/home/Services/Forms/ClearanceLetter';
import CustodyReceivingForm from '../src/screens/home/Services/Forms/CustodyReceivingForm';
import DisposalReport from '../src/screens/home/Services/Forms/DisposalReport/DisposalReport';
import EffectiveDateNotice from '../src/screens/home/Services/Forms/EffectiveDateNotice/EffectiveDateNotice';
import ServiceEntitlement from '../src/screens/home/Services/Forms/ServiceEntitlement';
import InternalPolicy from '../src/screens/home/Services/Forms/AcknowledgementInternalPolicy/InternalPolicy';
import ItEquipmentRequest from '../src/screens/home/Services/Forms/ItEquipmentRequest';
import JobOffer from '../src/screens/home/Services/Forms/JobOffer';
import LoanRequest from '../src/screens/home/Services/Forms/LoanRequest/LoanRequest';
import MaintenanceRequest from '../src/screens/home/Services/Forms/MaintenanceRequest';
import MovingAssestsApproval from '../src/screens/home/Services/Forms/MovingAssestsApproval';
import PaymentRequest from '../src/screens/home/Services/Forms/PaymentRequest/PaymentRequest';
import PettyCashSettlement from '../src/screens/home/Services/Forms/PettyCashSettlement';
import PurchaseRequest from '../src/screens/home/Services/Forms/PurchaseRequest/PurchaseRequest';
import IqamasRenewal from '../src/screens/home/Services/Forms/IqamasRenewal';
import SparePartsRequest from '../src/screens/home/Services/Forms/SparePartsRequest/SparePartsRequest';
import TravelAllowance from '../src/screens/home/Services/Forms/TravelAllowance';
import VacationRequest from '../src/screens/home/Services/Forms/VacationRequest';
import OpenPdf from '../src/reusable/doc/OpenPdf';
import OpenVideo from '../src/reusable/doc/OpenVideo';
import DocDetails from '../src/reusable/doc/DocDetails';
import List from '../src/reusable/doc/List';
import LoanListings from '../src/screens/home/Services/Forms/LoanRequest/Listings';
import PaymentListings from '../src/screens/home/Services/Forms/PaymentRequest/Listings';
import PurchaseListings from '../src/screens/home/Services/Forms/PurchaseRequest/Listings';
import DisposalListings from '../src/screens/home/Services/Forms/DisposalReport/Listings';
import AccessoriesListings from '../src/screens/home/Services/Forms/SparePartsRequest/Listings';

import AuthNavigator from './AuthNavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function MyStack() {
  const [token, settoken] = useState(null);
  const [loading, setloading] = useState(true);

  const retrieveData = () => {
    AsyncStorage.getItem('Token').then(res => {
      settoken(res);
    });
  };

  useEffect(() => {
    retrieveData();
    setTimeout(() => {
      setloading(false);
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <>
      {loading ? null : (
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerBackTitleVisible: false,
          }}>
          {token == null ? (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Forgot Password"
                component={ForgotPassword}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="home"
                component={Home}
              />
              <Stack.Screen name="Attendence" component={Attendence} />
              <Stack.Screen name="News" component={News} />
              <Stack.Screen name="Policies" component={Policies} />
              <Stack.Screen name="Services" component={Services} />
              <Stack.Screen name="Support" component={Support} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="LeavePolicy" component={LeavePolicy} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen
                name="Select Attendance"
                component={SelectAttendence}
              />
              <Stack.Screen name="Applied Leaves" component={LeaveList} />
              <Stack.Screen name="Apply Leave" component={ApplyLeave} />
              <Stack.Screen name="Holidays" component={Holidays} />
              <Stack.Screen name="Payslip" component={Payslip} />
              <Stack.Screen name="Document" component={Document} />
              <Stack.Screen name="News Detail" component={NewsDetails} />
              <Stack.Screen name="Leave Details" component={LeaveDetails} />
              <Stack.Screen
                name="Document Details"
                component={DocumentDetails}
              />
              <Stack.Screen name="Talk to us" component={TalkToUs} />
              <Stack.Screen name="Forms" component={Forms} />
              <Stack.Screen
                name="Acknowledgement"
                component={Acknowledgement}
              />
              <Stack.Screen
                name="Business Card Request"
                component={BusinessCard}
              />
              <Stack.Screen
                name="Clearance Letter"
                component={ClearanceLetter}
              />
              <Stack.Screen
                name="Custody Receiving Form"
                component={CustodyReceivingForm}
              />
              <Stack.Screen name="Disposal Report" component={DisposalReport} />
              <Stack.Screen
                name="Effective Date Notice"
                component={EffectiveDateNotice}
              />
              <Stack.Screen
                name="End of Service Entitlement Payment"
                component={ServiceEntitlement}
              />
              <Stack.Screen
                name="Acknowledgement of Receiving The Internal Policy"
                component={InternalPolicy}
              />
              <Stack.Screen
                name="IT Service or Equipment Request"
                component={ItEquipmentRequest}
              />
              <Stack.Screen name="Job Offer" component={JobOffer} />
              <Stack.Screen name="Loan Request" component={LoanRequest} />
              <Stack.Screen
                name="Maintenance Request"
                component={MaintenanceRequest}
              />
              <Stack.Screen
                name="Moving Assests Approval"
                component={MovingAssestsApproval}
              />
              <Stack.Screen name="Payment Request" component={PaymentRequest} />
              <Stack.Screen
                name="Petty Cash Settlement"
                component={PettyCashSettlement}
              />
              <Stack.Screen
                name="Purchase Request"
                component={PurchaseRequest}
              />
              <Stack.Screen
                name="Renewal of Iqamas"
                component={IqamasRenewal}
              />
              <Stack.Screen
                name="Spare Parts Request"
                component={SparePartsRequest}
              />
              <Stack.Screen
                name="Travel Allowance"
                component={TravelAllowance}
              />
              <Stack.Screen
                name="Vacation Request"
                component={VacationRequest}
              />
              <Stack.Screen name="Doc Details" component={DocDetails} />
              <Stack.Screen name="Doc" component={OpenPdf} />
              <Stack.Screen name="Video" component={OpenVideo} />
              <Stack.Screen name="List" component={List} />
              <Stack.Screen name="Listings" component={LoanListings} />
              <Stack.Screen
                name="Payment Listings"
                component={PaymentListings}
              />
              <Stack.Screen
                name="Purchase Listings"
                component={PurchaseListings}
              />
              <Stack.Screen
                name="Disposal Listings"
                component={DisposalListings}
              />
              <Stack.Screen
                name="Accessories Listings"
                component={AccessoriesListings}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="home"
                component={Home}
              />
              <Stack.Screen name="Attendance" component={Attendence} />
              <Stack.Screen name="News" component={News} />
              <Stack.Screen name="Policies" component={Policies} />
              <Stack.Screen name="Services" component={Services} />
              <Stack.Screen name="Support" component={Support} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="LeavePolicy" component={LeavePolicy} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen
                name="Select Attendance"
                component={SelectAttendence}
              />
              <Stack.Screen name="Applied Leaves" component={LeaveList} />
              <Stack.Screen name="Apply Leave" component={ApplyLeave} />
              <Stack.Screen name="Holidays" component={Holidays} />
              <Stack.Screen name="Payslip" component={Payslip} />
              <Stack.Screen name="Document" component={Document} />
              <Stack.Screen name="News Detail" component={NewsDetails} />
              <Stack.Screen name="Leave Details" component={LeaveDetails} />
              <Stack.Screen
                name="Document Details"
                component={DocumentDetails}
              />
              <Stack.Screen name="Talk to us" component={TalkToUs} />
              <Stack.Screen name="Forms" component={Forms} />
              <Stack.Screen
                name="Acknowledgement"
                component={Acknowledgement}
              />
              <Stack.Screen
                name="Business Card Request"
                component={BusinessCard}
              />
              <Stack.Screen
                name="Clearance Letter"
                component={ClearanceLetter}
              />
              <Stack.Screen
                name="Custody Receiving Form"
                component={CustodyReceivingForm}
              />
              <Stack.Screen name="Disposal Report" component={DisposalReport} />
              <Stack.Screen
                name="Effective Date Notice"
                component={EffectiveDateNotice}
              />
              <Stack.Screen
                name="End of Service Entitlement Payment"
                component={ServiceEntitlement}
              />
              <Stack.Screen
                name="Acknowledgement of Receiving The Internal Policy"
                component={InternalPolicy}
              />
              <Stack.Screen
                name="IT Service or Equipment Request"
                component={ItEquipmentRequest}
              />
              <Stack.Screen name="Job Offer" component={JobOffer} />
              <Stack.Screen name="Loan Request" component={LoanRequest} />
              <Stack.Screen
                name="Maintenance Request"
                component={MaintenanceRequest}
              />
              <Stack.Screen
                name="Moving Assests Approval"
                component={MovingAssestsApproval}
              />
              <Stack.Screen name="Payment Request" component={PaymentRequest} />
              <Stack.Screen
                name="Petty Cash Settlement"
                component={PettyCashSettlement}
              />
              <Stack.Screen
                name="Purchase Request"
                component={PurchaseRequest}
              />
              <Stack.Screen
                name="Renewal of Iqamas"
                component={IqamasRenewal}
              />
              <Stack.Screen
                name="Spare Parts Request"
                component={SparePartsRequest}
              />
              <Stack.Screen
                name="Travel Allowance"
                component={TravelAllowance}
              />
              <Stack.Screen
                name="Vacation Request"
                component={VacationRequest}
              />
              <Stack.Screen name="Doc Details" component={DocDetails} />
              <Stack.Screen name="Doc" component={OpenPdf} />
              <Stack.Screen name="Video" component={OpenVideo} />
              <Stack.Screen name="List" component={List} />
              <Stack.Screen name="Listings" component={LoanListings} />
              <Stack.Screen
                name="Payment Listings"
                component={PaymentListings}
              />
              <Stack.Screen
                name="Purchase Listings"
                component={PurchaseListings}
              />
              <Stack.Screen
                name="Disposal Listings"
                component={DisposalListings}
              />
              <Stack.Screen
                name="Accessories Listings"
                component={AccessoriesListings}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Forgot Password"
                component={ForgotPassword}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
