import {
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
import { signupUser } from '../../firebaseService/AuthServices';

interface RegisterProps {
  navigation?: any;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  };

  const handleInputchange =
    (field: 'name' | 'email' | 'password' | 'confirmPassword') =>
    (text: string) => {
      setFormValues({ ...formValues, [field]: text });

      let error = '';
      if (field === 'name') {
        error = !text.trim() ? 'Name is required' : '';
      } else if (field === 'email') {
        if (!text.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(text)) {
          error = 'Enter a valid email address';
        }
      } else if (field === 'password') {
        if (!text) {
          error = 'Password is required';
        } else if (text.length < 6) {
          error = 'Password must be at least 6 characters';
        }
      } else if (field === 'confirmPassword') {
        if (!text) {
          error = 'Confirm password is required';
        } else if (text !== formValues.password) {
          error = 'Passwords do not match';
        }
      }
      setErrors({ ...errors, [field]: error });
    };

  const handleRegister = async () => {
    const nameValue = formValues.name.trim();
    const emailValue = formValues.email.trim();
    const passwordValue = formValues.password;
    const confirmPasswordValue = formValues.confirmPassword;

    const newErrors: FormErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!nameValue) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!emailValue) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!passwordValue) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (passwordValue.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPasswordValue) {
      newErrors.confirmPassword = 'Confirm password is required';
      isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      console.log('Validation failed:', newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await signupUser(nameValue, emailValue, passwordValue);

      if (response.success) {
        console.log('Registration successful:', response.user);

        setFormValues({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        navigation?.navigate('Login');
      } else {
        console.log('Registration error:', response.error);
        Alert.alert('Error', response.error || 'Registration failed');
      }
    } catch (error: any) {
      console.log('Register error:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <CustomHeader
        backIcon={icons.Back}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Track invoices, manage vendors, and stay on top of your payments.
        </Text>

        <Inputs
          leftIcon={icons.User}
          onChangeText={handleInputchange('name')}
          value={formValues.name}
          placeholder="Enter your name"
          label="Full Name"
          wrapperStyle={styles.inputWrapper}
          errorText={errors.name}
        />
        <Inputs
          leftIcon={icons.Email}
          onChangeText={handleInputchange('email')}
          value={formValues.email}
          placeholder="Enter your email"
          label="Email Address"
          wrapperStyle={styles.inputWrapper}
          errorText={errors.email}
        />

        <Inputs
          leftIcon={icons.Password}
          onChangeText={handleInputchange('password')}
          value={formValues.password}
          placeholder="Enter your password"
          label="Password"
          wrapperStyle={styles.inputWrapper}
          secureTextEntry={!isPasswordVisible}
          rightIcon={isPasswordVisible ? icons.EyeOpen : icons.EyeClose}
          onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
          errorText={errors.password}
        />

        <Inputs
          leftIcon={icons.Password}
          onChangeText={handleInputchange('confirmPassword')}
          value={formValues.confirmPassword}
          placeholder="Confirm your password"
          label="Confirm Password"
          wrapperStyle={styles.inputWrapper}
          secureTextEntry={!isConfirmPasswordVisible}
          rightIcon={isConfirmPasswordVisible ? icons.EyeOpen : icons.EyeClose}
          onRightIconPress={() =>
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
          }
          errorText={errors.confirmPassword}
        />

        <CustomButton
          title="Register"
          onPress={handleRegister}
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
          <Text style={styles.signupText}>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
            <Text style={styles.signupLink}>Sign In</Text>
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

export default Register;

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
    marginBottom: verticalScale(20),
  },

  inputWrapperSmall: {
    marginBottom: verticalScale(10),
  },

  loginBtn: {
    marginTop: verticalScale(10),
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
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
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

    marginBottom: verticalScale(20),
    marginHorizontal: horizontalscale(10),
  },
});
