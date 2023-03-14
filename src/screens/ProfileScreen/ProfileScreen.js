import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
} from 'react-native';
// import Avatar from '../../../assets/images/grandpa.jpg';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native';


const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTY3YmM1ODBlOGM0NTM5OTMzMGIxM2U4OTg2NzViMmEzMjE5NTEyYmViZTk5MzY5NDk3ZmMyNzE5MGQ3YTdhZjczMjJjZTJjZGNhZjNiMGIiLCJpYXQiOjE2Nzg2Mzc0MDYuMzMzOTUyLCJuYmYiOjE2Nzg2Mzc0MDYuMzMzOTU3LCJleHAiOjE3MTAyNTk4MDYuMTY0NzE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.P6xcwJNobXv-_1n2Y2FgupRSX8fahdW7ZW3WcgfGDC2Z_YsmxoRHCfxYaGd98bqFSPX1-UhYWUzan3GV6zJAaFmsfn6y3tMu73IpUN_GvbJNFNPEya9RnR579JuZ9X8xDDhd55bq4Xov4W18trch_JNrUjsNiSgDIhBa-pJ7G2KhB6UT4pb0W7QD1JCbc9oH6XP207wVQgXPyckP5nsyZC5YDTZTHNlOCYSlxhIDPcH0ARbwfxHKuaUyWzRDSJ8X6WPixHmbN0JPanHtKDB1OnGWhQWTEmWVge1ByvdqESFygt_ff6DCTQAEddC48eleXI5vRDHJ4_MpQSJ4rcAH3HITbnwqy0eBwrneA8J64cmDJJQy00GbdB_2w6rzddkXKRE9gzG13sZLOSplGULtltBQSgmwUma2tIAXbeka1xq8ilrylywQBZ_blhAXeGWZ0vDSDCrstGWSIUYbluTFoMZSlayeS9jJjE3ujFplumMlul0oWFTdUhe4dwrPI-pnJJJs-EN4ykvxPyj56uIl7ImImCRw4TYm3vNqcxf4rkxyctd8VHtdGKgiqUHDeFxENOtUEJiRuDWJxSBeKA0rHEip7f3URIWbGniMZouJyVgbOYZ7lA8l74ZQzBo3uVE0cg9s0UOG8t_TOKdOHB3yZ-Da93WQXiuWjHWG2pZaMXY";
const apiURL = "http://10.0.2.2:8000/api/info";
const avatar_default = 'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg';

// var  = [];

const ProfileScreen = ({navigation}) => {
    const [SECTIONS, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getDataFromApi();
        return () => {}
    }, [])

    getDataFromApi = () => {
        fetch(apiURL, {
            method: 'GET',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }
        })
        .then((res) => res.json())
        .then((resJson) => setdata([
            {
                header: 'Profile',
                items: [
                    {id: 'ID',         value: resJson.data[0].id},
                    {id: 'First Name', value: resJson.data[0].first_name},
                    {id: 'Last Name',  value: resJson.data[0].last_name},
                    {id: 'Department', value: resJson.data[0].department},
                    {id: 'Phone',      value: resJson.data[0].phone_number},
                    {id: 'Date of birth', value: resJson.data[0].birth_day},
                    {id: 'Email',      value: resJson.data[0].email},
                ],
                fullname: resJson.data[0].first_name + ' ' + resJson.data[0].last_name,
                avatar: resJson.data[0].avatar
            },
        ]))
        .catch((error) => console.log('Error: ==', error))
        .finally(() => setisLoading(false));
    };

    return (
        <ScrollView>
            {isLoading ? <ActivityIndicator/> : <View style={styles.header}>
                <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{flexDirection: 'row'}}>
                <FeatherIcon color="#fff" name="chevron-left" size={30} />
                <Text style={styles.textBack}>Back</Text>
                </TouchableOpacity>
            </View>}
            
            {!isLoading ? <View style={{alignItems: 'center'}}>
                <Image alt="" source={{uri:SECTIONS[0].avatar == null ? avatar_default : SECTIONS[0].avatar}} style={styles.profileAvatar} />
                <Text style={styles.profileName}>{SECTIONS[0].fullname}</Text>
            </View> : ''}
            
            {isLoading ? '' : SECTIONS.map(({header, items}) => (
                <View style={styles.section} key={header}>
                    <View style={styles.sectionBody}>
                        {items.map(({id, label, icon, type, value}, index) => {
                        return (
                            <View
                                key={id}
                                style={[
                                    styles.rowWrapper,
                                    index === 0 && {borderTopWidth: 0},
                                ]}>
                                <View style={styles.row}>
                                    <Text style={styles.rowLabel}>{id}</Text>

                                    <View style={styles.rowSpacer} />

                                    <Text>{value}</Text>
                                </View>
                            </View>
                        );
                        })}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        width: '100%',
        backgroundColor: 'black',
        height: 150,
    },
    profileAvatar: {
        width: 140,
        height: 140,
        borderRadius: 9999,
        marginTop: -70,
    },
    textBack: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileName: {
        padding: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#090909',
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionBody: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
        height: 50,
    },
    rowWrapper: {
        paddingLeft: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
    },
    rowIcon: {
        marginRight: 12,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },
    rowValue: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});
export default ProfileScreen;