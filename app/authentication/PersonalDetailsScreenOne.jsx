import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/safe2.png'; // replace with your actual logo path
import NextIcon from '../../assets/next.png'; // replace with your actual next icon path

const PersonalDetailsScreen = () => {
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

            <Text style={styles.stepText}>Step 1</Text>
            <Text style={styles.subtitle}>Personal Details</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                placeholderTextColor="#A0A0A0"
            />

            <Text style={styles.label}>Date Of Birth</Text>
            <View style={styles.dobContainer}>
                <TextInput
                    style={styles.dobInput}
                    placeholder="DD"
                    placeholderTextColor="#A0A0A0"
                />
                <TextInput
                    style={styles.dobInput}
                    placeholder="MM"
                    placeholderTextColor="#A0A0A0"
                />
                <TextInput
                    style={styles.dobInput}
                    placeholder="YYYY"
                    placeholderTextColor="#A0A0A0"
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('authentication/PersonalDetailsScreenTwo')} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
                <Image style={styles.nextButtonIcon} source={NextIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.signInButton}>
                <Text style={{ fontSize: 16 }}>Already Have Account? </Text>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PersonalDetailsScreen;

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
    dobContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    dobInput: {
        width: '30%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 120,
    },
    nextButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 150,
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
