import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fontScale, horizontalscale, moderateScale, verticalScale } from '../utility/sizes';
import { fonts } from '../../assets/fonts';

interface CustomHeaderProps {
  backIcon: any;
  screenName?: string;
  rightIcon?: any;
  onBackPress: () => void;
  onRightPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  backIcon,
  screenName,
  rightIcon,
  onBackPress,
  onRightPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Image source={backIcon} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        {screenName ? (
          <Text style={styles.screenName}>{screenName}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
        {rightIcon ? <Image source={rightIcon} style={styles.icon} /> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
    marginBottom: verticalScale(20),
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  screenName: {
    fontSize: fontScale(18),
    fontFamily: fonts.SemiBold,
    color: '#000',
  },
  rightButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
});

export default CustomHeader;
