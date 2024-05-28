import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen: React.FC = ({ navigation }) => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (name && phoneNumber && email && password) {
            const user = { name, phoneNumber, email, address, password };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate('SignIn');
        } else {
            setError('Please fill all mandatory fields');
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.form}>
                <Text style={styles.login}>Create New Account</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Name"
                        onChangeText={setName}
                        value={name}
                        style={styles.input}
                        placeholderTextColor="#888"
                    />
                    <Text style={styles.mandatoryMark}>*</Text>
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="PhoneNumber"
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                    />
                    <Text style={styles.mandatoryMark}>*</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                    />
                    <Text style={styles.mandatoryMark}>*</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Address"
                        onChangeText={setAddress}
                        value={address}
                        style={styles.input}
                        placeholderTextColor="#888"
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        style={styles.input}
                        placeholderTextColor="#888"
                        secureTextEntry
                    />
                    <Text style={styles.mandatoryMark}>*</Text>
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity style={styles.signup} onPress={handleSignUp}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBF8F1",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 30,
        top: -20
    },
    login: {
        fontSize: 28,
        fontWeight: "500",
        paddingBottom: 24,
        color: '#FF515D'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 45,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 30,
        padding: 12,
        borderColor: "#000000",
        borderWidth: 1,
        color: 'black',
        textDecorationColor: 'black'
    },
    mandatoryMark: {
        color: 'red',
        marginLeft: 5,
        fontSize: 16,
    },
    error: {
        color: 'red',
    },
    signup: {
        backgroundColor: "#4266B3",
        height: 35,
        width: '80%',
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: 'center',
        marginTop: 20
    },
});

export default SignUpScreen;
