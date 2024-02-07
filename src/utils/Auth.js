import * as LocalAuthentication from 'expo-local-authentication';

export const Authenthicator = {
  async unlock() {
    const hasBiometric = await LocalAuthentication.hasHardwareAsync();
    if (!hasBiometric) {
      console.warn('Biometric authentication is not available on this device.');
      return false;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access the app.',
      fallbackLabel: 'Use passcode instead?',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    if (result.success) {
      console.log('Authenticated!');
      return true;
    }
    return false;
  },
};