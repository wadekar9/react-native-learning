import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import { useDispatch } from 'react-redux';
import { doAuthenticate } from '../slices/AuthSlice';
import {faker} from '@faker-js/faker';


const LoginScreen = () => {

  const dispatch = useDispatch()

  const handleLogin = (values) => { 
    console.log('values========>', values);
    dispatch(doAuthenticate({
      key: `${Math.random() * 1000000}`,
      image: faker.image.avatar(),
      name: faker.person.firstName(),
      jobTitle: faker.person.lastName(),
      email: faker.internet.email(),
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={(values) => handleLogin(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={values.username}
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
            />

            <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
