import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/safe2.png';
import NextIcon from '../../assets/next.png';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>IDVault</Text>
        <Image
          source={Logo}
          style={styles.icon}
        />
      </View>

      <Text style={styles.subtitle}>Log in</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Johndoe@exemple.com"
        placeholderTextColor="#A0A0A0"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.newText}>New to the IDVault?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('authentication/PersonalDetailsScreenOne')} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Sign In</Text>
        <Image style={styles.nextButtonIcon} source={NextIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a29ff0',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    position: 'absolute',
    top: 70,
  },
  iconContainer: {
    marginBottom: 40,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    width: '80%',
    marginVertical: 20,
  },
  newText: {
    fontSize: 16,
    fontWeight: '500',
  },
  registerText: {
    fontSize: 16,
    color: '#0000FF',
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 50,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },

  nextButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  nextButtonIcon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    marginLeft: 10,
    position: 'absolute',
    right: 15,
    top: 18,
  },
});
