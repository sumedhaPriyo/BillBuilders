import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { moderateScale, horizontalscale, verticalScale } from '../utility/sizes';

interface CustomCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
  size?: number;
  checkedColor?: string;
  uncheckedColor?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  value,
  onValueChange,
  style,
  size = 20,
  checkedColor = '#007bff',
  uncheckedColor = '#ccc',
}) => {
  return (
    <TouchableOpacity
      style={[styles.checkbox, { width: size, height: size, borderColor: value ? checkedColor : uncheckedColor }, style]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      {value && (
        <View style={[styles.checkmark, { backgroundColor: checkedColor }]}>
          <View style={styles.checkmarkInner} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(4),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(2),
  },
  checkmarkInner: {
    width: '80%',
    height: '30%',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#fff',
    transform: [{ rotate: '-45deg' }],
  },
});

export default CustomCheckbox;
