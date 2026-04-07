import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { fonts } from '../../assets/fonts';
import {
  fontScale,
  horizontalscale,
  moderateScale,
  verticalScale,
} from '../utility/sizes';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={()=>onPress()}
      disabled={loading}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.loadingText}>Submitting</Text>
        </View>
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    height: verticalScale(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontFamily: fonts.SemiBold,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: fontScale(15),
    fontFamily: fonts.SemiBold,
    marginLeft: horizontalscale(8),
  },
});

export default CustomButton;
