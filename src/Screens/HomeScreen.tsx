import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const route = useRoute();
  const { username, location }: any = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {username && <Text style={styles.username}>Welcome, {username}</Text>}
        {location && (
          <>
            <Text style={styles.text}>Your Location is: </Text>
            <Text style={styles.locationDetail}>Latitude: {location.latitude}</Text>
            <Text style={styles.locationDetail}>Longitude: {location.longitude}</Text>
          </>
        )}

      </View>
      <TouchableOpacity style={styles.handleUserList} onPress={() => navigation.navigate('UserListScreen')}>
        <Text style={styles.buttonLabel}>
          Go to User List
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  subContainer: {
    height: '40%',
    backgroundColor: '#DCEDFE',
    fontWeight: "600",
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 4
  },
  text: {
    fontSize: 15,
    color: 'tomato',
    fontWeight: "600",

  },
  username: {
    fontSize: 28,
    color: 'tomato',
    fontWeight: "600",
  },
  locationDetail: {
    fontSize: 18,
    color: '#4266B3',
    fontWeight: "600",
  },
  handleUserList: {
    backgroundColor: "#4266B3",
    height: 35,
    width: '80%',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    alignSelf: 'center'
  },
  buttonLabel: { 
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18 
  }
});

export default HomeScreen;
