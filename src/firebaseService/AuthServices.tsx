import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

    if (!userDoc.exists) {
      throw new Error('User not found in database');
    }
    return { success: true, user: userDoc.data() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
