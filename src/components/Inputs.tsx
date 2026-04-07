import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  horizontalscale,
  moderateScale,
  verticalScale,
} from '../utility/sizes';
import { fonts } from '../../assets/fonts';


type InputsProps = TextInputProps & {
  label?: string;
  leftIcon: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onRightIconPress?: () => void;
  errorText?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leftIconStyle?: StyleProp<ImageStyle>;
  rightIconStyle?: StyleProp<ImageStyle>;
};

const Inputs = React.forwardRef<TextInput, InputsProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      onRightIconPress,
      errorText,
      wrapperStyle,
      containerStyle,
      inputStyle,
      labelStyle,
      style,
      leftIconStyle,
      rightIconStyle,
      ...textInputProps
    },
    ref,
  ) => {
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

        <View
          style={[
            styles.container,
            errorText ? styles.errorContainer : null,
            containerStyle,
          ]}
        >
          <View style={styles.iconWrapper}>
            <Image
              source={leftIcon}
              style={[styles.icon, leftIconStyle]}
              resizeMode="contain"
            />
          </View>

          <TextInput
            ref={ref}
            style={[styles.input, inputStyle, style]}
            placeholderTextColor="#999"
            {...textInputProps}
          />

          {rightIcon ? (
            onRightIconPress ? (
              <TouchableOpacity
                style={[styles.iconWrapper, rightIconStyle]}
                onPress={onRightIconPress}
                activeOpacity={0.7}
              >
                <Image
                  source={rightIcon}
                  style={[styles.icon, rightIconStyle]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.iconWrapper, rightIconStyle]}>
                <Image
                  source={rightIcon}
                  style={[styles.icon, rightIconStyle]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      </View>
    );
  },
);

export default Inputs;

const styles = StyleSheet.create({
  wrapper: {
    width: '99%',
    marginBottom: verticalScale(15),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: horizontalscale(5),
    height: verticalScale(50),
  },
  label: {
    marginBottom: verticalScale(3),
    color: '#333',
    fontSize: moderateScale(15),
    fontFamily: fonts.SemiBold,
  },
  iconWrapper: {
    width: horizontalscale(30),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: horizontalscale(18),
    height: verticalScale(18),
    tintColor: '#999',
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: moderateScale(13),
  },
  errorContainer: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    marginLeft: horizontalscale(5),
  },
});
