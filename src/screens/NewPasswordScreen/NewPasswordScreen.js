import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import {useNavigation} from '@react-navigation/native';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const onSubmitPressed = () => {
    console.warn(' onResendPress');
    navigation.navigate('Home');
  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput placeholder="Code" value={code} setValue={setCode} />
        <CustomInput
          placeholder="Enter your new password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <CustomButton text="Send" onPress={onSignInPressed} />
        <CustomButton text="Submit" onPress={onSubmitPressed} type="TERTIARY" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#051c60',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default NewPasswordScreen;
