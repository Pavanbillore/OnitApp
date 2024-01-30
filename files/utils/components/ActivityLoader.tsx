import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const ActivityLoader = (props: any) => {
  const {visible, setVisible} = props
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <View
        style={{
          height: height,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <ActivityIndicator animating={visible} size="large" />
      </View>
    </Modal>
  );
};
export default ActivityLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
