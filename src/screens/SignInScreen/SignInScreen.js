import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/images/logoBK.png';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const onSignInPressed = () => {
    //validate user
    navigation.navigate('BottomTab');
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Username"
          value={userName}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
});

export default SignInScreen;
