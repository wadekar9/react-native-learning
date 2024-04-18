import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearDetails } from '../slices/AuthSlice';

const HomeScreen = () => {

  const details = useSelector(state => state.auth.details);
  const dispatch = useDispatch();

  const onLogoutPress = () => {
    dispatch(clearDetails())
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your App</Text>

      <Text style={{
        fontSize:18,
        color:'#000000'        
      }}>{JSON.stringify(details)}</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogoutPress} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
