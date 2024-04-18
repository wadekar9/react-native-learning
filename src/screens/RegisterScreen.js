import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';

const RegisterScreen = () => {

  const handleRegister = () => {
    return (values) => {
      console.log("values========>",values);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Formik
        initialValues={{username: '', password: '', email:''}}
        onSubmit={handleRegister}>
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
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
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
    alignItems: 'center',
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
  registerButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
