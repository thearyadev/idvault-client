import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Logo from "../assets/safe2.png";
import NextIcon from "../assets/next.png";
import { SafeAreaView } from 'react-native-safe-area-context';
import anytimeLogo from "../assets/anytimeLogo.png";
import { useNavigation } from 'expo-router';

const IDVaultScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>IDVault</Text>
                    <Image
                        source={Logo}
                        style={styles.icon}
                    />
                </View>

                <View style={styles.iconContainer}>
                    {/* Update the icon URL here to match the new icon */}
                    <Image
                        source={anytimeLogo}
                        style={styles.logo}
                    />
                </View>

                <Text style={styles.secureText}>Anytime & Anywhere</Text>

                <Text style={styles.description}>
                    Anyone can access their digital documents from IDVault anytime, anywhere.
                    This is convenient, easily accessible, and time-saving!!!
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('authentication/login')} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Continue</Text>
                    <Image style={styles.nextButtonIcon} source={NextIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default IDVaultScreen;

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
        top: 50,
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
    logo: {
        width: 120,
        height: 120, // Adjust size to match the new image size
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
        top: 18,
    },
});
