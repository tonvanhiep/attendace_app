import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native';
import Avatar from '../../../assets/images/grandpa.jpg';

const HomeScreen = ({navigation}) => {
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={styles.view_main}>
          <View style={styles.view_primary}>
            <View style={{width: '50%'}}>
              <Text style={styles.text}>Hi, Cuong</Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <Image alt="" source={Avatar} style={styles.profileAvatar} />
            </View>
          </View>
        </View>
        <LinearGradient
          colors={['rgba(35, 82, 124, 0.2)', 'transparent']}
          style={styles.search}>
          <View style={styles.view_secondary}>
            <TextInput placeholder="Search" style={styles.search_input} />
          </View>
        </LinearGradient>
      </View>
    // {/* </ScrollView> */}
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  view_main: {
    backgroundColor: '#23527c',
    height: '28%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  view_primary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  view_secondary: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  search: {
    left: 0,
    right: 0,
    height: 90,
    marginTop: -45,
  },
  search_input: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 260,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
});

export default HomeScreen;
