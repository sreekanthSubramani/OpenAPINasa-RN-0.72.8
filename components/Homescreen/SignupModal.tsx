
import { View, StyleSheet, Text, Modal, useWindowDimensions,Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import type { Rootstate } from '../../Redux/Store/StoreConfig'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from 'react-native-paper'
import MainBtn from '../../Layouts/Button/MainButton'
import { useState, useEffect } from 'react'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import type { DOB,PostRequestforNew } from '../../Types/component-types'
import { closeModal } from '../../Redux/Slices/SignupModalSlice' 
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { axiosapi } from '../../axios/configAxios'




export default function SignupModal(): JSX.Element {


  const modalOpen = useSelector((state: Rootstate) => state.modal.isOpen)
  const dispatch = useDispatch()

  const {height, width} = useWindowDimensions()
  const [showCalender, setShowCalender] = useState(false)
  const [dob, setDob] = useState<DOB>({})

    const closeBtn = <Ionicons name='close-sharp' size={20} color='white' onPress={closeModalView}/>
    function closeModalView(){
      dispatch(closeModal())
    }
    

    function pressToCalenderPop(){
      setShowCalender((prev)=> !prev)
    }



    function setDateFunc(dt : {date : DateType | any}, setFieldValue : (field : string, value : any)=> void){
          
          if(!dt.date) return;
          setShowCalender(false)

            setFieldValue('dateOfB', dt.date.toISOString())
            const toISTTime = dt.date.toLocaleString('en-US').split(',')[0].split('/')
            setDob({
              date : Number(toISTTime[1]),
              month : Number(toISTTime[0]),
              year : Number(toISTTime[2])
            })

          }


    const signUpSchema = Yup.object().shape ({
      name : Yup.string().required("Required"),
      password : Yup.string().min(6, "Password should be atleast 6 c22eharacters").required("Required"),
      dateOfB : Yup.date().required("Required"),
    })


    async function handleGoogleSignin(props : PostRequestforNew){

      try{
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog : true})
        const {idToken} = await GoogleSignin.signIn()

        const googleCredential  = auth.GoogleAuthProvider.credential(idToken)

        const userCredential = await auth().signInWithCredential(googleCredential)

        const postUser = await axiosapi.post("/createUser", {
          name : props.name, 
          dob : props.dateOfB,  
          username : userCredential.user.email, 
          password : props.password})


          console.log(postUser?.data || "data not found")
        return userCredential

      }catch(e){
        console.log(e)
      }
    }




  return (
    <Modal
      visible={modalOpen}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={[styles.modalBox, {height : height/1.5}]}>

          <View style={{alignSelf  : "flex-end"}}>
          {closeBtn}
          </View>

          <Text style={styles.signUpHeading}>Sign up with us ....</Text>
          <Formik
          initialValues={{name : "", password : "", dateOfB : ""}}
          validationSchema={signUpSchema}
          onSubmit={(props)=>handleGoogleSignin(props)}
          >
              {({handleChange,errors,values,setFieldValue,touched, handleSubmit})=>(
                <View style={styles.insideForm}>
                    <TextInput  
                      label="Name"
                      style={styles.txtInp}
                      onChangeText={handleChange('name')}
                      />  
                      <View>
                        {!touched.name ?
                          <Text style={{color : 'red'}}>{errors.name}</Text>
                          :
                          <></>
                        }
                      </View>

                       <TextInput  
                      label="Password"
                      style={styles.txtInp}
                      onChangeText={handleChange('password')}
                      secureTextEntry={true}
                      />  
                      <View>
                        {!touched.password ?
                          <Text style={{color : 'red'}}>{errors.password}</Text>
                          :
                          <></>
                        }
                      </View>
                  
                          


                      <TextInput
                        label={ dob.date && dob.month && dob.year ?
                          `${dob.date} / ${dob.month} / ${dob.year}`
                          :
                        `Date of Birth`}
                        disabled={true}
                        right={
                          <TextInput.Icon icon='calendar-outline' size={30} color='black' onPress={pressToCalenderPop}  />
                        }
                        style={styles.txtInp}/>

                        {showCalender  ?

                        <View style={styles.calenderContainer}>
                        <DateTimePicker
                        mode='single' 
                        initialView='day'
                        onChange={(params)=> setDateFunc(params, setFieldValue)}
                        styles= {{
                          days : {width : "100%", rowGap : -20, marginBottom : -10},
                          years : {width : "100%", top : -18, marginBottom : 52, paddingBottom : 10},
                          header : {marginTop : -6, color : "white", borderBottomWidth : 1},
                          selected: {backgroundColor : "red", borderWidth : 2},
                          today : {padding : -10, backgroundColor : "yellow", borderTopEndRadius : 30, borderBottomEndRadius : 30, borderTopLeftRadius : 30, borderWidth : 0.2}
                        }}
                        style={{
                          width :290,
                          maxHeight : 100,
                          marginTop : 5,
                        }}
                        />
                        </View>

                        :
                        <></>
                        }
                        <View>
                          {!touched.dateOfB && !values.dateOfB ?
                          <Text style={{color : 'red'}}>{errors.dateOfB}</Text>
                          : 
                          <></>}
                        </View>

                                  <View style={styles.signinModal}>
          <Text style={{fontFamily : "TurretRoad-Bold"}}>We accept only Google Sign in as of now</Text>
          <Text style={{fontFamily : "TurretRoad-Bold"}}>The username to login is your Gmail address</Text>
          <Image
          source={require('../../asset/gmail_logo.png')}
          style={{
            width : 80,
            height : 80,
            justifyContent : "center",
            alignSelf : 'center',
          }}/>

          {values.name && values.dateOfB && values.password ?
          <MainBtn content='Continue' heightNum={height / 20} widthNum={width/1.1} pressFunc={handleSubmit}/>
          :
          <></>         
          }   

        </View>
                </View>
              )}
          </Formik>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",  
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalBox: {         
    width: "100%",         
    borderRadius: 20,
    backgroundColor: "#A7D1F2",
    padding: 20,
  },
  txtInp : {
    backgroundColor : "rgba(41, 177, 240, 0.3)"
  },
  signUpHeading :{
    fontFamily : "TurretRoad-Bold",
    fontSize : 30,
  },
  insideForm : {
    flexDirection : "column",
    gap : 10,
    marginTop : 30
  },
  signinModal : {
    marginTop : 10,
    zIndex :-10
  },
  calenderPicker : {
    height : "30%",
    width: "50%",
    zIndex : 10
  },
  calenderContainer : {
    position : "absolute",
    height : "55%",
    right : -2,
    top : 80,
    backgroundColor : "white",
    zIndex : 100,
    borderRadius : 10,
  }
})