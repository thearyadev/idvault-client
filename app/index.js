import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Logo from "../assets/safe2.png";
import NextIcon from "../assets/next.png";
import Icon from "../assets/homeIcon.png"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>IDVault</Text>
          <Image
            source={Logo}
            style={styles.icon}
          />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={Icon}
            style={styles.logo}
          />
        </View>

        <Text style={styles.secureText}>Secure</Text>

        <Text style={styles.description}>
          IDVault is a secured application to access, save, and verify documents digitally.
        </Text>

        <TouchableOpacity onPress={() => {
          navigation.navigate("Anytime");
        }} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Image style={styles.nextButtonIcon} source={NextIcon}></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a29ff0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    position: 'absolute',
    top: 50
  },
  iconContainer: {
    marginBottom: 40
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    marginTop: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  secureText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: "400",
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
    top: 18
  }
});
