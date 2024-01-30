import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../const/constants';

const TaskDetail = ({route}) => {
  const {description, title} = route.params;
useEffect(() => {
  console.log(description)
},[])
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginVertical: 25,
          textAlign: 'center',
          color: COLORS.BLACK,
        }}>
        {title}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          flex: 1
        }}>
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: 13,
            textAlign: 'justify',
          }}>
          {description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({});
