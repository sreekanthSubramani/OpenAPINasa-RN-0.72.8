import {View, Text, StyleSheet,useWindowDimensions, Image, ScrollView, Button} from 'react-native'
import HomeBG from "../../Layouts/Home/HomeBGLayout";
import { Input } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MainBtn from '../../Layouts/Button/MainButton';
import rocket from '../../asset/rocket.png'
import { useDispatch, useSelector } from 'react-redux';
import type { Rootstate } from '../../Redux/Store/StoreConfig';
import { openModal } from '../../Redux/Slices/SignupModalSlice';
import SignupModal from './SignupModal';
import { axiosapi } from '../../axios/configAxios';
import { useState } from 'react';
import { SecureKeychain } from '../../src/config/secureStorage';




export default function HomepageScreen() :JSX.Element{
    
    
    const {height, width} = useWindowDimensions()
    const userLogo = <Ionicons name='at-sharp' size={20} />
    const passLogo = <Ionicons name='medical' size={20} />

    const dispatch = useDispatch()
    const selector = useSelector((state: Rootstate)=> state.modal.isOpen)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleModalForSignUp = ()=>{
        dispatch(openModal())
    }

    const checkIfUsersWork = async() =>{
        try{
            const sendUsername = await axiosapi.post('/uservalidate', {
                username : username.toLowerCase(),
                password : password
            })

            const data = sendUsername?.data
            await SecureKeychain.save({
                token : data.token
            })


        }catch(e){
            console.log(e)
        }

    }
    
    return(
        <HomeBG colors={["#4F7CD1","#cecacaff"]}>
            <View style={styles.upperHeader}>
                <Text style={styles.textFont}>Space</Text>
                <Text style={styles.textFont}>Cosmos</Text>
            </View>


            <View style={[{height : height/3, width : width-10}, styles.loginBox]}>
                
                <View style={styles.insideLoginBox}>
                    <Input
                    label="Username"
                    labelStyle={{color : "black"}}
                    leftIcon = {userLogo} 
                    onChangeText={(e)=> setUsername(e)}
                     />

                        <Input
                    label="Password"
                    labelStyle={{color : "black"}}
                    secureTextEntry={true}
                    leftIcon = {passLogo} 
                    onChangeText={(e)=> setPassword(e)}
                     />

                    
                    <View>
                        <MainBtn content='Sign In' heightNum={40} widthNum={300} pressFunc={checkIfUsersWork} />
                    </View>

                </View>
            </View>


            <View style={styles.contentToSignUp}>
                <Text style={styles.insideSignUp}>If you want to sign up with SpaceCosmos to know more about the Space Related Content !</Text>
            </View>


            <View style={styles.signUpSide}>
                <Image source={rocket} style={styles.rocketPng} />
                <MainBtn content='Sign Up' heightNum={40} widthNum={100} colors={['#ee2a7b', '#6228d7']} txtCol='white' pressFunc={handleModalForSignUp} />
            </View>
                    

        <View style={[styles.scrollForTC, {height : "auto", width : width}]}>
                    <View style={styles.headingScroll}>
                        <Text style={styles.headingCov}>The terms and conditions for using this app</Text>
                    </View>
            <ScrollView>   
                    <Text style={styles.pointersTC}> {"\u2B24" + " "} The Data is purely taken from OPEN API Nasa !</Text>
                    <Text style={styles.pointersTC}> {"\u2B24" + " "} The Data which you are seeing are not static </Text>
                    <Text style={styles.pointersTC}> {"\u2B24" + " "} This a React Native App for learning purposes </Text>
                    <Text style={styles.pointersTC}> {"\u2B24" + " "} The opportunity to use the Nasa's API is available in Internet</Text>
                    <Text style={styles.pointersTC}> {"\u2B24" + " "} Github : sreekanthSubramani</Text>
                    <Text style={styles.pointersTC}> {"\u2B24" + " "} Project Owner : insta - @sreekanth_subramani</Text>
            </ScrollView>
        </View>

        {selector ?
        <SignupModal />

        :
        <></>}


        </HomeBG>
    )
}


const styles = StyleSheet.create({
    textFont : {
        fontFamily : "TurretRoad-Bold",
        fontSize : 70,
        color : "white"
    },
    upperHeader : {
        justifyContent : "center",
        alignItems : "center"
    },
    loginBox : {
        display : 'flex',
        justifyContent : "center",
        alignSelf : "center",
        backgroundColor : 'rgba(255,255,255,0.5)',
        borderRadius : 20,
        borderWidth : 2,
        borderColor : 'rgba(255,255,255,1)'
    },
    insideLoginBox : {
        flexDirection : "column",
        gap : 10,
        justifyContent : "center",
        alignItems : "center"
    },
    contentToSignUp : {
        marginTop : 20,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 4
    },
    insideSignUp : {
        fontSize : 14,
        color : "black",
        fontFamily : "TurretRoad-Bold",
    },
     rocketPng : {
        height : 40,
        width : 40
     },
     signUpSide : {
        display : "flex",
        justifyContent : "center",
        alignSelf : "center",
        alignItems : "center",
        marginTop : 40,
        flexDirection : "row",
     },
     scrollForTC : {
        marginTop : 10,
        backgroundColor : "rgba(255,255,255,0.4)",
        paddingBottom : 10
     },
     headingScroll : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
     },
     headingCov : {
        fontSize : 12,
        fontWeight : "bold",
        color : "black"
     },
     pointersTC : {
        fontSize : 8,
        color : 'gray'
     }
})