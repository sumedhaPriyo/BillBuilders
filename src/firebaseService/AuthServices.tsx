import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ToastNotification } from '../utility/ToastNotification';
import { ALERT_TYPE } from 'react-native-alert-notification';

interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export const signupUser = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    await firestore().collection('users').doc(user.uid).set({
      name: name,
      email: email,
      uid: user.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      password: password,
    });

    console.log('firease Register done');

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    console.log(userDoc, 'DOCC');

    if (!userDoc.exists) {
      ToastNotification(ALERT_TYPE.DANGER, 'Error', 'User data not found');
    }
    return { success: true, user: userDoc.data() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
export const forgotPassword = async (email: string) => {
  if (!email) {
    ToastNotification(ALERT_TYPE.DANGER, 'Error', 'Email is required');
    return;
  }

  try {
    await auth().sendPasswordResetEmail(email);

    ToastNotification(
      ALERT_TYPE.SUCCESS,
      'Email Sent',
      'Password reset link sent to your email',
    );
  } catch (error: any) {
    ToastNotification(ALERT_TYPE.DANGER, 'Error', error.message);
  }
};

export const resendVerificationEmail = async () => {
  const user = auth().currentUser;

  if (!user) {
    ToastNotification(ALERT_TYPE.DANGER, 'Error', 'User not logged in');
    return;
  }

  try {
    await user.sendEmailVerification();

    ToastNotification(
      ALERT_TYPE.SUCCESS,
      'Email Sent',
      'Verification email sent again',
    );
  } catch (error: any) {
    ToastNotification(ALERT_TYPE.DANGER, 'Error', error.message);
  }
};
