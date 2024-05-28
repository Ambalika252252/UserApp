import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, SafeAreaView,Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { ActivityIndicator } from 'react-native';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setError('');
    }, [])
  );

  useEffect(() => {
    requestLocationPermission();
  });

  const requestLocationPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log("Location permission granted");
      } else {
        console.log("Location permission not granted");
      }
    } catch (error) {
      console.error('Failed to request location permission', error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            AsyncStorage.setItem('location', JSON.stringify({ latitude, longitude }));
            AsyncStorage.setItem('isLoggedIn', 'true');
            setLoading(false);
            navigation.navigate('HomeScreen', { username: user.name, location: { latitude, longitude } });
          },
          error => {
            setError(error.message);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    } else {
      setError('User not found');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.login}>Sign In</Text>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#FF5A66" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Log In
            </Text>
          </TouchableOpacity>
        )}
        <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 18, textAlign: 'center', marginVertical: 10 }}>OR</Text>
        <TouchableOpacity style={styles.buttonSignup} onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  input: {
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
  error: {
    color: 'red',
  },
  button: {
    backgroundColor: "#FF5A66",
    height: 35,
    width: '80%',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
    alignSelf: 'center'
  },
  buttonSignup: {
    backgroundColor: "#4266B3",
    height: 35,
    width: '80%',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    alignSelf: 'center'
  },
});

export default SignIn;
