import React, { createRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MessageScreen from './utils/Message/MessageScreen';

//SCREENS
import LocationDetail from './utils/components/LocationDetail';
import Payment from './src/screens/Payment';
import Signup from './src/screens/Signup';
import SuccessFull from './src/screens/successfull';
import MyBookings from './src/screens/MyBookings';
import Login from './src/screens/Login';
import Homemain from './src/screens/Homemain';
import Homem from './src/screens/Homem';
import TaskManager from './src/screens/TaskManager';
import MoneyManager from './src/screens/MoneyManager';
import ServiceNeeds from './src/screens/ServiceNeeds';
import Contacts from './src/screens/Contacts';
import PersonalCare from './src/screens/PersonalCare';
import Reminders from './src/screens/Reminders';
import Plumber from './src/screens/Plumber';
import MyAccount from './utils/tabs/MyAccount';
import Newtask from './utils/tabs/Newtask';
import Wallet from './utils/tabs/Wallet';
import Reminder from './src/TabsScreen/Reminder';
import Task from './src/TabsScreen/Task';
import ContactsTab from './src/TabsScreen/ContactsTab';
import Documents from './src/TabsScreen/Documents';
import Appointments from './src/TabsScreen/Appointments';
import Payments from './src/TabsScreen/Payments';
import Subscriptions from './src/TabsScreen/Subscription';
import AcService from './src/ServicesScreen/AcService';
import Appliance from './src/ServicesScreen/Appliance';
import Beauty from './src/ServicesScreen/Beauty';
import Computer from './src/ServicesScreen/Computer';
import Electronics from './src/ServicesScreen/Electronics';
import HealthCare from './src/ServicesScreen/HealthCare';
import HomeCare from './src/ServicesScreen/HomeCare';
import Vehicles from './src/ServicesScreen/Vehicles';
import All from './utils/Message/All';
import Friends from './utils/Message/Friends';
import Technician from './utils/Message/Technician';
import Otp from './backend/otp';
import Locations from './location';
import Services from './src/ServicesScreen/Services';
import TechnicianContacts from './src/TabsScreen/TechnicianContacts';
import Daily from './src/TabsScreen/Daily';
import Weekly from './src/TabsScreen/Weekly';
import Monthly from './src/TabsScreen/Monthly';
import TechnicianComponent from './src/TabsScreen/TechnicianComponent';
import Message from './utils/tabs/Message';
import TabHeader from './utils/components/TabHeader';
import MainService from './src/ServicesScreen/MainService';
import { useDispatch, useSelector } from 'react-redux';
import DocumentComponent from './src/TabsScreen/DocumentComponent';
import BookTechnician from './src/screens/BookTechnician';
import { COLORS } from './const/constants';
import BookingDetails from './src/screens/BookingDetails';
import PickDrop from './src/TabsScreen/PickDrop';
import PickupDetails from './src/screens/PickupDetails';
import Requests from './src/TabsScreen/Requests';
import Completed from './src/TabsScreen/Completed';
import BookingList from './src/TabsScreen/BookingList';
import TaskDetail from './src/TabsScreen/TaskDetail';
import PersonalExpense from './src/TabsScreen/PersonalExpense';
import { setUserNumber } from './backend/slice';
import ReferScreen from './utils/tabs/ReferScreen';
import AboutUs from './utils/tabs/AboutUs';
import Privacy from './utils/tabs/Privacy';
import CheckScreen from './utils/tabs/CheckScreen';
import SplitScreen from './src/screens/SplitScreen';
import HeadScree from './utils/components/HeadScree';
import GroupDetail from './src/screens/GroupDetail';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import PickDrops from './src/TabsScreen/PickDrops';
import PickDropMap from './src/TabsScreen/PickDropMap';
import PickandDropRequest from './src/TabsScreen/PickandDropRequest';
import PickDropDriver from './src/TabsScreen/PickDropDriver';
import RideComplete from './src/TabsScreen/RideComplete';
import Notifications from './src/screens/Notifications';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuthorized, userData, userNumber } = useSelector(
    (state: any) => state.auth,
  );
  useEffect(() => {
    console.log('AUTHORIZED', isAuthorized);
    console.log('DATAUSER', userData);
    if (userData && !userNumber)
      dispatch(setUserNumber(userData?.personal_details?.phone?.mobile_number));
  }, []);
  return (
    <NavigationContainer ref={createRef() || undefined} headerMode='none'>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          isAuthorized && userData.length != undefined ? 'Homem' : 'Login'
        }>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="Homem" component={Homem} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="SplitScreen" component={SplitScreen} />
        <Stack.Screen name="HeadScree" component={HeadScree} />
        <Stack.Screen name="GroupDetail" component={GroupDetail} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
        <Stack.Screen name="notifications" component={Notifications} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: "Upcoming", headerTintColor: '#fff', headerStyle: { backgroundColor: '#000' } }} />
        <Stack.Screen name="CheckScreen" component={CheckScreen} />
        <Stack.Screen name="MyBookings" component={MyBookings} />
        <Stack.Screen name="Homemain" component={Homemain} />
        <Stack.Screen name="TaskManager" component={TaskManager} />
        <Stack.Screen name="MoneyManager" component={MoneyManager} />
        <Stack.Screen name="ServiceNeeds" component={ServiceNeeds} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="PersonalCare" component={PersonalCare} />
        <Stack.Screen name="Reminders" component={Reminders} />
        <Stack.Screen name="Plumber" component={Plumber} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="SuccessFull" component={SuccessFull} />

        <Stack.Screen name="BookingList" component={BookingList} />
        <Stack.Screen name="Requests" component={Requests} />
        <Stack.Screen name="Completed" component={Completed} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Newtask" component={Newtask} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="Message" component={Message} options={{ headerShown: true, }} />
        <Stack.Screen name="PickDrop" component={PickDrops} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: "Pick & Drop", headerTintColor: '#fff', headerStyle: { backgroundColor: '#00796A' } }} />
        <Stack.Screen name="PickDropMap" component={PickDropMap} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: "Pick & Drop", headerTintColor: '#fff', headerStyle: { backgroundColor: '#00796A' } }} />
        <Stack.Screen name="PickandDropRequest" component={PickandDropRequest} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: "Pick & Drop", headerTintColor: '#fff', headerStyle: { backgroundColor: '#00796A' } }} />
        <Stack.Screen name="PickDropDriver" component={PickDropDriver} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: "Pick & Drop", headerTintColor: '#fff', headerStyle: { backgroundColor: '#00796A' } }} />
        <Stack.Screen name="RideComplete" component={RideComplete} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: "Rating", headerTintColor: '#fff', headerStyle: { backgroundColor: '#00796A' } }} />
        <Stack.Screen name="PickupDetails" component={PickupDetails} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="ContactsTab" component={ContactsTab} />
        <Stack.Screen name="Documents" component={Documents} />
        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Subscriptions" component={Subscriptions} />
        <Stack.Screen name="AcService" component={AcService} />
        <Stack.Screen name="Appliance" component={Appliance} />
        <Stack.Screen name="Beauty" component={Beauty} />
        <Stack.Screen name="location-details" component={LocationDetail} />
        <Stack.Screen name="Computer" component={Computer} />
        <Stack.Screen name="Electronics" component={Electronics} />
        <Stack.Screen name="HealthCare" component={HealthCare} />
        <Stack.Screen name="HomeCare" component={HomeCare} />
        <Stack.Screen name="Vehicles" component={Vehicles} />
        <Stack.Screen name="All" component={All} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Technician" component={Technician} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
        <Stack.Screen name="PersonalExpense" component={PersonalExpense} />
        <Stack.Screen
          name="TechnicianComponent"
          component={TechnicianComponent}
        />
        <Stack.Screen name="DocumentComponent" component={DocumentComponent} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen
          name="BookTechnician"
          component={BookTechnician}
          options={{
            headerShown: true,
            headerTitle: 'My Professionals',
            headerTitleStyle: {
              color: COLORS.BLACK,
              fontSize: 22,
              fontWeight: '500',
            },
            headerTitleAlign: 'center',
            headerBackVisible: true,
          }}
        />

        <Stack.Screen
          name="TechnicianContacts"
          component={TechnicianContacts}
        />

        <Stack.Screen name="MainService" component={MainService} />
        <Stack.Screen name="Daily" component={Daily} />
        <Stack.Screen name="Weekly" component={Weekly} />
        <Stack.Screen name="Monthly" component={Monthly} />
        <Stack.Screen name="ReferScreen" component={ReferScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="privacy" component={Privacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
