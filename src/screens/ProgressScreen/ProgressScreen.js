import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {Agenda, AgendaEntry} from 'react-native-calendars';
import { ActivityIndicator } from 'react-native';

//const token = localStorage.getItem('token')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTY3YmM1ODBlOGM0NTM5OTMzMGIxM2U4OTg2NzViMmEzMjE5NTEyYmViZTk5MzY5NDk3ZmMyNzE5MGQ3YTdhZjczMjJjZTJjZGNhZjNiMGIiLCJpYXQiOjE2Nzg2Mzc0MDYuMzMzOTUyLCJuYmYiOjE2Nzg2Mzc0MDYuMzMzOTU3LCJleHAiOjE3MTAyNTk4MDYuMTY0NzE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.P6xcwJNobXv-_1n2Y2FgupRSX8fahdW7ZW3WcgfGDC2Z_YsmxoRHCfxYaGd98bqFSPX1-UhYWUzan3GV6zJAaFmsfn6y3tMu73IpUN_GvbJNFNPEya9RnR579JuZ9X8xDDhd55bq4Xov4W18trch_JNrUjsNiSgDIhBa-pJ7G2KhB6UT4pb0W7QD1JCbc9oH6XP207wVQgXPyckP5nsyZC5YDTZTHNlOCYSlxhIDPcH0ARbwfxHKuaUyWzRDSJ8X6WPixHmbN0JPanHtKDB1OnGWhQWTEmWVge1ByvdqESFygt_ff6DCTQAEddC48eleXI5vRDHJ4_MpQSJ4rcAH3HITbnwqy0eBwrneA8J64cmDJJQy00GbdB_2w6rzddkXKRE9gzG13sZLOSplGULtltBQSgmwUma2tIAXbeka1xq8ilrylywQBZ_blhAXeGWZ0vDSDCrstGWSIUYbluTFoMZSlayeS9jJjE3ujFplumMlul0oWFTdUhe4dwrPI-pnJJJs-EN4ykvxPyj56uIl7ImImCRw4TYm3vNqcxf4rkxyctd8VHtdGKgiqUHDeFxENOtUEJiRuDWJxSBeKA0rHEip7f3URIWbGniMZouJyVgbOYZ7lA8l74ZQzBo3uVE0cg9s0UOG8t_TOKdOHB3yZ-Da93WQXiuWjHWG2pZaMXY";
const apiURL = "http://10.0.2.2:8000/api/attendance";


function processData(timesheet) {
    var data = timesheet.data;
    var arr = {};
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentMY = `${year}-0${month}-`;

    for (let i = 1; i <= day; i++) {
        let currentDate = currentMY + '';
        i < 10 ? (currentDate = currentDate + '0' + i) : (currentDate = currentDate + i);

        if(arr[currentDate] == null) arr[currentDate] = [];
    }
    for (let i = 0; i < data.list.length; i++) {
        var arr_ = {
        "employee_id": data.list[i].employee_id,
        "timekeeper_id": data.list[i].timekeeper_id,
        "day": data.list[i].date,
        "check_in": data.list[i].check_in,
        "check_out": data.list[i].check_out
        };
        if(arr[data.list[i].date] == null) arr[data.list[i].date] = [];
        arr[data.list[i].date].push(arr_);
    }
    console.log(arr);
    return arr;
}


const ProgressScreen = () => {
    const [attends, setdata] = useState([]);
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
        .then((resJson) => setdata(processData(resJson)))
        .catch((error) => console.log('Error: ==', error))
        .finally(() => setisLoading(false));
    };

    const renderEmptyDate = () => {
        return (
        <View style={styles.emptyDate}>
            <Text>DAY OFF</Text>
        </View>
        );
    };

    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';
        return (
        <Pressable
            style={[styles.item, {height: 90}]}
            // onPress={() => navigation.navigate("Modal", { id: reservation.id })}
            // onPress={() => Alert.alert(reservation.check_in)}
            >
            <Text style={{fontSize, color}}>Check - in :   {reservation.check_in}</Text>
            <Text style={{fontSize, color}}></Text>
            <Text style={{fontSize, color}}>Check - out:  {reservation.check_out}</Text>
        </Pressable>
        );
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Timesheet</Text>
        </View>
        
        {
        isLoading ? <ActivityIndicator/> : <Agenda
            items={attends}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
        />
        }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default ProgressScreen;
