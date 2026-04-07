import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export const ToastNotification = (type: ALERT_TYPE, title: string, textBody: string) => {
Toast.show({
  type,
  title,
  textBody,
  autoClose: 2000, 
   
});
};




