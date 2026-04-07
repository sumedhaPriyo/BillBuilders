import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../../assets/fonts';
import Inputs from '../../components/Inputs';
import { icons } from '../../../assets/icons';
import {
  fontScale,
  horizontalscale,
  moderateScale,
  verticalScale,
} from '../../utility/sizes';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';

interface LoginScreenProps {
  navigation?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  };

  const handleInputchange = (field: 'email' | 'password') => (text: string) => {
    if (field === 'email') {
      setEmail(text);
      if (!text.trim()) {
        setEmailError('Email is required');
      } else if (!validateEmail(text)) {
        setEmailError('Enter a valid email address');
      } else {
        setEmailError('');
      }
    } else {
      setPassword(text);
      if (!text) {
        setPasswordError('Password is required');
      } else if (text.length < 6) {
        setPasswordError('Password must be at least 6 characters');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleLogin = async () => {
    const emailValue = email.trim();
    const emailValid = validateEmail(emailValue);
    const passwordValid = password.length >= 6;

    setEmailError(
      !emailValue
        ? 'Email is required'
        : emailValid
        ? ''
        : 'Enter a valid email address',
    );
    setPasswordError(
      !password
        ? 'Password is required'
        : passwordValid
        ? ''
        : 'Password must be at least 6 characters',
    );

    if (!emailValid || !passwordValid) {
      return;
    }

    setLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <CustomHeader
        backIcon={icons.Back}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Text style={styles.title}>Let’s Sign you in</Text>
        <Text style={styles.subtitle}>
          Track invoices, manage vendors, and stay on top of your payments.
        </Text>

        <View>
          <Inputs
            leftIcon={icons.Email}
            onChangeText={handleInputchange('email')}
            value={email}
            placeholder="Enter your email"
            label="Email Address"
            wrapperStyle={styles.inputWrapper}
            errorText={emailError}
          />

          <Inputs
            leftIcon={icons.Password}
            onChangeText={handleInputchange('password')}
            value={password}
            placeholder="Enter your password"
            label="Password"
            wrapperStyle={styles.inputWrapperSmall}
            secureTextEntry={!isPasswordVisible}
            rightIcon={isPasswordVisible ? icons.EyeOpen : icons.EyeClose}
            onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
            errorText={passwordError}
          />

          <View style={styles.rememberForgotContainer}>
            <View style={styles.rememberMeSection}>
              <CustomCheckbox
                value={rememberMe}
                onValueChange={setRememberMe}
                size={20}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation?.navigate('Forgetpassword')}
            >
              <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginBtn}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: verticalScale(20),
          }}
        >
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign In with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <Image source={icons.Google} style={styles.socialIcon} />
          <Image source={icons.Apple} style={styles.socialIcon} />
          <Image source={icons.Facebook} style={styles.socialIcon} />
        </View>
        <Text style={styles.footerText}>
          By signing up you agree to our Terms and Conditions of Use
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalscale(10),
  },

  title: {
    color: '#000',
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    fontSize: fontScale(25),
    marginBottom: verticalScale(10),
  },

  inputWrapper: {
    marginBottom: verticalScale(30),
  },

  inputWrapperSmall: {
    marginBottom: verticalScale(20),
  },

  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },

  rememberMeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalscale(8),
  },

  rememberMeText: {
    fontFamily: fonts.Medium,
    fontSize: fontScale(14),
    color: '#999',
  },

  forgotPasswordLink: {
    fontFamily: fonts.Medium,
    fontSize: fontScale(14),
    color: '#007bff',
  },

  loginBtn: {
    marginTop: verticalScale(20),
  },

  signupText: {
    fontFamily: fonts.Medium,
    textAlign: 'center',
  },

  signupLink: {
    color: '#007bff',
    fontFamily: fonts.SemiBold,
    marginLeft: horizontalscale(5),
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(50),
    marginBottom: verticalScale(20),
  },

  line: {
    borderWidth: 0.5,
    borderColor: '#D6D6D6',
    width: '25%',
  },

  orText: {
    fontFamily: fonts.Medium,
    color: '#D6D6D6',
    marginHorizontal: 10,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  socialIcon: {
    width: horizontalscale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    resizeMode: 'cover',
  },

  footerText: {
    fontFamily: fonts.Medium,
    textAlign: 'center',
    marginHorizontal: verticalScale(15),
    color: '#000',
    marginTop: verticalScale(30),
  },
  subtitle: {
    color: '#999',
    fontFamily: fonts.Medium,
    textAlign: 'center',
    fontSize: fontScale(14),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(40),
    marginHorizontal: horizontalscale(10),
  },
});
