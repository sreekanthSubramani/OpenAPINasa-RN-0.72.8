import {View, StyleSheet, Text, FlatList, useWindowDimensions} from 'react-native'
import { axiosapi } from '../../axios/configAxios'
import { useState } from 'react'
import { SecureKeychain } from '../../src/config/secureStorage'
import {SegmentedButtons} from 'react-native-paper'
import DateTimePicker from 'react-native-ui-datepicker'

export default function LocationsScreen(){


    const [ locations,  setLocations ] = useState([])
    const {height, width} = useWindowDimensions()
    const [value, setValue] = useState('')
    const [showTodayScreen, setShowScreen] = useState('')
    const [showSelectedData, setShowSelectedData] = useState(false)
    const [dataAsPerDate, setDataAsPerDate] = useState([])

    async function handleAsyncGet(){
        setShowScreen('Today')
        try{
            const data = await axiosapi.get('/location/arr')
            setLocations(data?.data.msg)
        }catch(e){
            console.log(e)
        }
    }

    async function handlePrevScreen(){
        setShowScreen('Prev')
    }



    function handleValueChange(f : string){
        setValue(f)
    }



    function toHumanReadable(d:string){
        const toISO = new Date(d).toISOString()
        const loc = new Date(toISO).toLocaleString(undefined,{timeZone : "Asia/Kolkata"})
        return loc
    }

    async function handleDate(e : any){
        setShowSelectedData((prev)=> !prev)
        setShowScreen("ShowData")

        const newDate = toHumanReadable(e)
        const [month, date, year] = newDate.toString().split(',')[0].split('/')
        const backendLang = `${year}-${month}-${date}`
        const fetchDataonDate = await axiosapi.get(`/user/data?date=${backendLang}`)
        setDataAsPerDate(fetchDataonDate?.data.msg)


    }

    return(
        <View>

            <SegmentedButtons value={value} onValueChange={(e)=> handleValueChange(e)} buttons={[
                {
                    label : 'Today',
                    value : "Today",
                    onPress : handleAsyncGet
                },
                {
                    label : 'Select my own',
                    value : "Select",      
                    onPress : handlePrevScreen              
                }
            ]} />

            {showTodayScreen === "Today" &&
            

            <FlatList
            data={locations}
            keyExtractor={(item, index)=> index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
                return(
                    <View style={[{height : height/8},styles.flatListComp]}>
                        <Text style={{fontSize : 20,fontWeight : "bold"}}>{item?.name}</Text>
                        <Text style={{fontSize : 14}}> Lat : {item?.latitude}</Text>
                        <Text style={{fontSize : 14}}> Long : {item?.longitude}</Text>
                        <Text style={{fontSize : 14}}> State : {item?.state}</Text>
                        <Text style={{fontSize : 14}}> Searched : {toHumanReadable(item?.createdAt)}</Text>
                    </View>
                )
            }} />
        }
        {showTodayScreen=== "Prev"  && 
            <View style={[styles.selectedDate, {backgroundColor : "lightblue"}]}>

                    <DateTimePicker
                    mode='single'
                    initialView='day' 
                    styles={{
                        day : {paddingVertical : 10, gap : 10},
                        days : {marginTop : 3},
                        today : {backgroundColor : "yellow"}
                    }}
                    onChange={(e)=> handleDate(e.date)}
                    />

            </View>    
        
        }
        
        {showTodayScreen=== "ShowData"  && showSelectedData &&
            <View style={[styles.selectedDate, {backgroundColor : "lightblue"}]}>


            <FlatList
            data={dataAsPerDate}
            keyExtractor={(item, index)=> index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
                return(
                    <View style={[{height : height/8},styles.flatListComp]}>
                        <Text style={{fontSize : 20,fontWeight : "bold"}}>{item?.name}</Text>
                        <Text style={{fontSize : 14}}> Lat : {item?.latitude}</Text>
                        <Text style={{fontSize : 14}}> Long : {item?.longitude}</Text>
                        <Text style={{fontSize : 14}}> State : {item?.state}</Text>
                        <Text style={{fontSize : 14}}> Searched : {toHumanReadable(item?.createdAt)}</Text>
                    </View>
                )
            }} />


            </View>    
        
        }

        </View>
    )
}




const styles = StyleSheet.create({
    flatListComp : {
        padding : 10,
        marginVertical : 10,
        marginHorizontal : 30,
        backgroundColor : "lightblue",
        borderRadius : 20,
        paddingHorizontal : 20
    },
    selectedDate : {
        marginTop : 50
    }
})