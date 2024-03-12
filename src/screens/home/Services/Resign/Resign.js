import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import { responsiveHeight } from 'react-native-responsive-dimensions';


const Resign = () => {
    const [startopen, setstartopen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    return (
        <View style={styles.container}>
            <Text style={styles.txtname}>Name</Text>
            <TextInput
                placeholder='Name'
            />
            <View style={styles.underline}></View>
            <View>
                <Text style={styles.title}>Last Working Date</Text>
                <TouchableOpacity
                    onPress={() => setstartopen(true)} //
                    style={styles.calender}>
                    <Text>{new Date(startDate).toLocaleDateString('en-GB')}</Text>
                    <AntDesign
                        name="calendar"
                        size={20}
                        style={styles.radio_icon}
                        color="#0321a4"
                    />
                </TouchableOpacity>
                <DatePicker
                    modal
                    textColor="#000000"
                    backgroundColor="#FFFFFF"
                    open={startopen}
                    date={startDate}
                    mode="date"
                    onConfirm={date => {
                        setstartopen(false);
                        setStartDate(date);
                        setEndDate(new Date(Date.UTC(2023, date.getUTCMonth() + 1, 1)));
                    }}
                    onCancel={() => {
                        setstartopen(false);
                    }}
                />
            </View>
            <Text style={styles.txtname}>Reson</Text>
            <TextInput
                placeholder='Reson'
            />
            <View style={styles.underline}></View>
            <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.subtxt}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.viewstatus}>
                <Text style={{color:"#000", fontSize:18}}>Status</Text>
                <Text style={{color:"#000", fontSize:18}}>*</Text>
                <Text style={{color:"#000", fontSize:18}}>Waiting for approval</Text>
                {/* <Text style={{color:"green", fontSize:18}}>Active</Text> */}
                {/* <Text style={{color:"red", fontSize:18}}>Rejected</Text> */}
            </View>
        </View>

    )
}

export default Resign

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 10
    },
    title: { fontSize: 16, marginVertical: 10, fontWeight: '600' },
    calender: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    txtname: {
        fontSize: 16, marginVertical: 10, fontWeight: '600'
    },
    underline: {
        borderWidth: 0.5,
        color: "#fff",
        opacity: 0.6
    },
    statustxt: {
        backgroundColor: "#0321a4",

    },
    subtxt: {
        color: "#fff",
        padding: 10,
        fontSize: 18,
        backgroundColor: "#0321a4",
        textAlign: "center",
        marginTop: 10,
        marginBottom:5
    },
    viewstatus : {
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:10,
    }
})


