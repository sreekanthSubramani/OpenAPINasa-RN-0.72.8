import {View, StyleSheet, Text, Image} from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { Rootstate } from '../../Redux/Store/StoreConfig'
import { TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfileScreen(){

    const selexName = useSelector((state : Rootstate)=> state.profile.displayName)
    const selexEmail = useSelector((state : Rootstate)=> state.profile.email)
    const selexPhoto = useSelector((state : Rootstate)=> state.profile.photoURL)
    const refScreen = useRef(true)



    const [profileName, setProfileName] = useState('')
    const [email, setEmail ] = useState('')
    const [photo, setPhoto] = useState('')


    useEffect(()=>{
        setProfileName(selexName)
        setEmail(selexEmail)
        setPhoto(selexPhoto)

        return()=>{
            refScreen.current = false
        }
    },[refScreen])


    const unsplashRandomPic = 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

        const getAsyncData = async () =>{
            const getAsyncedData = await AsyncStorage.getItem('profileData')

            if(getAsyncedData){
                const parseData = JSON.parse(getAsyncedData)
                setProfileName(parseData.name)
                setEmail(parseData.email)
                setPhoto(parseData.photo)
            }

        }
        getAsyncData()





    return(
            <View style={{flex : 1}}>
                    
                    <View style={styles.inMiddle}>

                            <Image
                            source={{uri : photo ||  unsplashRandomPic}} 
                            style={{
                                height : 300,
                                width : 300,
                                borderRadius : 150
                            }}
                            resizeMode='cover'
                            />

                        
                        <View style={styles.fitChips}>
                        <Text style={{fontFamily : "TurretRoad-Bold", fontSize : 40}}>Hello {profileName || selexName},  </Text>
                        
                        
                        <TextInput
                        label='Logged in as'
                        value={email ?? " "}
                        disabled />
                        </View>

                    </View>

          

            </View>

    )
}

const styles = StyleSheet.create({
    inMiddle : {
        justifyContent : "center",
        alignItems : "center",
        marginTop : 30
    },
    fitChips : {
        width : "100%",
        marginTop : 30,
        justifyContent : "flex-start",
        paddingLeft : 10,
        flexDirection : "column",
        gap : 30
    }
})