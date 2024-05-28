import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpScreen: React.FC = ({ navigation }) => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSignUp = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!name || !phoneNumber || !email || !password) {
            setError('Please fill all mandatory fields');
            return;
        }

        if (!passwordRegex.test(password)) {
            console.log(password);
            setError('Password must contain at least one number, one capital letter, and one lowercase letter and atleast 8 digit long');
            return;
        }

        const user = { name, phoneNumber, email, address, password };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('SignIn');
    };

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
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

                <View style={styles.password_inputContainer}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        style={styles.input}
                        placeholderTextColor="#888"
                        secureTextEntry={secureTextEntry} />
                    <Text style={styles.mandatoryMark}>*</Text>

                </View>
                <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.secureButton}>
                    <Text style={styles.toggleText}>
                        {secureTextEntry ? "Show" : "Hide"}
                    </Text>
                </TouchableOpacity>

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
    password_inputContainer: {
        display: 'flex',
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
    securePassword: {
        fontSize: 15,
        color: 'tomato',

    },
    toggleText: {
        marginLeft: 10,
        color: '#fff',
    },
    secureButton: {
        backgroundColor: 'red',
        height: 20,
        width: 50,
        borderRadius: 5,
        alignContent: 'center',
        bottom: 10,
        left: 10
    }
});

export default SignUpScreen;
