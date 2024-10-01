import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox'

const Terms = () => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo and Title */}
            <View style={styles.logoContainer}>
                <Text style={styles.title}>IDVault</Text>
                <Image source={require('../../assets/safe2.png')} style={styles.icon} />
            </View>

            {/* Step 4 */}
            <Text style={styles.stepText}>Step 4</Text>
            <Text style={styles.subtitle}>Terms & Conditions</Text>

            {/* Terms and Conditions Text */}
            <View style={styles.termsContainer}>
                <Text style={styles.termsHeader}>Terms & Conditions</Text>
                <Text style={styles.termsText}>
                    The evening breeze carried the scent of freshly bloomed flowers as the city buzzed with life
                    beneath a painted sky. People hurried through the streets, unaware of the small wonders around them...
                </Text>
            </View>

            {/* Accept Terms Checkbox */}
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isChecked}
                    onValueChange={setIsChecked}
                    tintColors={{ true: '#000', false: '#000' }}
                />
                <Text style={styles.checkboxText}>Accept Terms & Conditions</Text>
            </View>

            {/* Finish Button */}
            <TouchableOpacity
                style={[styles.finishButton, { opacity: isChecked ? 1 : 0.6 }]}
                disabled={!isChecked}
                onPress={() => navigation.navigate('authentication/ForgotPassword')}
            >
                <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>

            {/* Sign In */}
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.signInButton}>
                <Text style={{ fontSize: 16 }}>Already Have Account?</Text>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Terms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a29ff0',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
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
    stepText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    termsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        marginBottom: 20,
    },
    termsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    termsText: {
        fontSize: 14,
        color: '#333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    finishButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center',
    },
    finishButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    signInButton: {
        position: 'absolute',
        bottom: 80,
    },
    signInText: {
        color: '#000',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});
