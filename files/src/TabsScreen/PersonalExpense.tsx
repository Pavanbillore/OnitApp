import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import Task from '../../utils/components/appoint';
// import ClockIcon from "react-native-vector-icons/AntDesign";
// import PlusIcon from "react-native-vector-icons/AntDesign";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';
import Icon from '../../utils/components/Icon';
import {COLORS} from '../../const/constants';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import Pedometer from 'react-native-pedometer';
// import pedometer formm

const {width, height} = Dimensions.get('screen');

export default function PersonalExpense() {
//   const [task, setTask] = useState();
//   const [taskItems, setTaskItems] = useState([]);
  const [steps, setSteps] = useState(0);
//   const[isAvailable,setAvailable]=useState()
  var [dailySteps, setdailySteps] = useState(0);
  const Tab = createMaterialTopTabNavigator();

//   const onStepCountChange = (event) => {
//     setSteps(event.steps)
//   }



//   var now = new Date();
// Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {
//   // do something with pedometer data
// });

useEffect(()=>{
    
   fetchStepsData()

  
},[])
const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
    ],
  };

var today = new Date();
    var lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 8,
    );

const opt = {
    startDate: new Date().toISOString(), // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  const fetchStepsData = async (opt) => {
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    if (res.length !== 0) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].source === 'com.google.android.gms:estimated_steps') {
            console.log('steps',data[0].value)
          let data = res[i].steps.reverse();
          dailyStepCount = res[i].steps;
          console.log('hj',res[i].steps)
          setdailySteps(data[0].value);
        }
      }
    } else {
      console.log('Not Found');
    }
  };

  async function getStepCount() {
    try {
      const options = {
        startDate: '2022-04-30T00:00:00.000Z', // Start of the time range
        endDate: '2022-05-01T00:00:00.000Z', // End of the time range
      };
  
      const stepSamples = await GoogleFit.getDailyStepCountSamples(options);
      const totalSteps = stepSamples.reduce((total, sample) => total + sample.value, 0);
  
      console.log('Total steps:', totalSteps);
    } catch (error) {
      console.log('Error getting Google Fit step count:', error);
    }
  }

  console.log('ss',dailySteps)


// useEffect(() => {
 

// }, [])

//   const handleAddTask = () => {
//     Keyboard.dismiss();
//     setTaskItems([...taskItems, task]);
//     setTask(null);
//   };

//   const completeTask = index => {
//     let itemsCopy = [...taskItems];
//     itemsCopy.splice(index, 1);
//     setTaskItems(itemsCopy);
//   };

  return (
    <View style={styles.container}>
      
      <View
        style={{
          borderColor: COLORS.DARK_GREEN,
          borderWidth: 1,
          borderRadius: 500,
          width: width * 0.8,
          height: width * 0.8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: COLORS.BLUE,
            fontSize: 96,
            fontFamily: 'poppins',
            fontWeight: 'bold',
            marginBottom: 10
          }}>
          {dailySteps}
        </Text>
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: 32,
            fontFamily: 'poppins',
            fontWeight: 'bold',
          }}>
          steps
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalExpenseWrapper: {
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 70,
    marginHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#00796A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: '#fff',
    fontSize: 30,
  },
  itemBox: {
    backgroundColor: 'white',
    width: '32%',
    borderRadius: 10,
  },
});
