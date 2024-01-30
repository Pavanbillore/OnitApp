import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../const/constants';
import Icon from './Icon';
import Documents from '../../src/TabsScreen/Documents';
import Reminders from '../../src/TabsScreen/Reminder';
import TaskManager from '../../src/screens/TaskManager';
import ContactsTab from '../../src/TabsScreen/ContactsTab';
import MoneyManager from '../../src/screens/MoneyManager';
import PersonalCare from '../../src/screens/PersonalCare';
import { useNavigation } from '@react-navigation/native';
import MainService from '../../src/ServicesScreen/MainService';
import AcService from '../../src/ServicesScreen/AcService';
import PersonalExpense from '../../src/TabsScreen/PersonalExpense';
import HeadScree from './HeadScree';
import PickDrops from '../../src/TabsScreen/PickDrops';

const { width, height } = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();

const TopTabs = (props: any) => {
  const { mainTab, secondaryTab } = props;
  const navigation = useNavigation()
  useEffect(() => {
    console.log('ggg', mainTab + ' HOME ' + secondaryTab);
  }, []);
  return (
    <Tab.Navigator


      initialRouteName={
        mainTab == 'MoneyManager'
          ? 'Manage Money'
          : mainTab == 'TaskManager'
            ? 'TaskManager'
            : mainTab == 'Personalare'
              ? 'Personal Expenses'
              : mainTab == 'Reminders'
                ? 'Reminders'
                : ''
      }
      backBehavior='initialRoute'

    >
      {mainTab == 'Contacts' && secondaryTab == 'Documents' ? (
        <>
          <Tab.Screen name={'Contacts'} component={ContactsTab} />
          <Tab.Screen name={'Documents'} component={Documents} />
        </>
      ) : mainTab == 'TaskManager' && secondaryTab == 'Reminders' ? (
        <>
          <Tab.Screen
            name={'TaskManager'}
            component={TaskManager}
            options={{ tabBarLabel: 'Tasks' }}
          />
          <Tab.Screen name={'Reminders'} component={Reminders} />
        </>
      ) : secondaryTab == 'TaskManager' && mainTab == 'Reminders' ? (
        <>
          <Tab.Screen name={'TaskManager'} component={TaskManager}
            options={{ tabBarLabel: 'Tasks' }} />
          <Tab.Screen name={'Reminders'} component={Reminders} />
        </>
      ) : mainTab == 'MoneyManager' && secondaryTab == 'PersonalCare' ? (
        <>
          <Tab.Screen name={'Manage Money'} component={MoneyManager} />
          {/* <Tab.Screen name={'Step Counter'} component={PersonalExpense} /> */}
        </>
      ) : secondaryTab == 'MoneyManager' && mainTab == 'PersonalCare' ? (
        <>
          {/* <Tab.Screen name={'Manage Money'} component={MoneyManager} /> */}
          <Tab.Screen name={'Step Counter'} component={PersonalExpense} />
        </>
      ) : secondaryTab == '' && mainTab == 'PickDrop' ? (
        <>
          <Tab.Screen name={'Pick & Drop'} component={PickDrops} options={{ tabBarLabel: "Pick & Drop", }} />
        </>
      ) : (undefined)
      }

    </Tab.Navigator>
  );
};

const TabHeader = (props: any) => {
  const navigation = useNavigation()
  const { route } = props;
  console.log('nabb', navigation.navigate)
  console.log('devvv', route?.params)
  const { mainTab, secondaryTab } = route?.params;
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: COLORS.WHITE,
      }}>
      <HeadScree />
      <TopTabs mainTab={mainTab} secondaryTab={secondaryTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderRadius: 5,
    width: width * 0.85,
    // marginHorizontal: 10,
    backgroundColor: '#00796A1A',
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default TabHeader;
