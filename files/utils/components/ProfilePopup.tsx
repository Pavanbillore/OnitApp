import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../const/constants';
import {useNavigation} from '@react-navigation/native';
import Icon from './Icon';

const {width, height} = Dimensions.get('screen');

const ProfilePopup = (props: any) => {
  const {loginModal, setLoginModal} = props;
  const navigation = useNavigation();
  return (
    <Modal
      visible={loginModal}
      onRequestClose={() => setLoginModal(!loginModal)}
      animationType="slide"
      transparent>
      <View
        style={{
          flex: 1,
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.MODAL_BACKGROUND,
        }}>
        <TouchableOpacity
          onPress={() => {
            setLoginModal(false)
            navigation.navigate('Signup');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.WHITE,
            height: 100,
            width: width * 0.8,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: COLORS.RED_DARK,
              fontFamily: 'poppins',
              fontSize: 24,
              textAlign: 'center',
              fontWeight: 'bold',
              //   paddingVertical: 15,
            }}>
            Complete Profile!!!! 
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default ProfilePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
