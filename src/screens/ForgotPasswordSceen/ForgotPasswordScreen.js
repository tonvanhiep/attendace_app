import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [userName, setUsername] = useState('');
  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate('NewPassword');
  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Username"
          value={userName}
          setValue={setUsername}
        />
        <CustomButton text="Send" onPress={onSendPressed} />
        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
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

export default ForgotPasswordScreen;
