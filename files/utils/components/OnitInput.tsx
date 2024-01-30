import React, {FC} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import {COLORS} from '../../const/constants';

const {height, width} = Dimensions.get('window');
interface Props extends TextInputProps {
  halfWidth?: boolean | false;
  value: any;
  textColor?: '' | 'black';
  placeholder?: any;
  placeholderTextColor?: '' | '#737373';
  errors?: any;
  mVertical?: number;
}
const OnitInput: FC<Props> = props => {
  return (
    <>
      <View
        style={[
          styles.container,
          {
            width: !props.halfWidth ? width * 0.9 : width * 0.4,
            marginVertical: !props.mVertical ? props.mVertical : 5,
          },
        ]}>
        <TextInput
          {...props}
          placeholder={props.placeholder}
          value={props.value}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'poppins',
          }}
        />
      </View>
      <Text
        style={{
          color: COLORS.RED_LIGHT,
          fontSize: 11,
          paddingLeft: 20,
        }}>
        {props.errors}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
});
export default OnitInput;
