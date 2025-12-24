import { StyleSheet, Modal, Text, View, FlatList, Image, ActivityIndicator, useWindowDimensions} from "react-native"
import type { ShowCityModal } from "../../Types/component-types"
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder"
import type { MetaData } from "../../Types/component-types"
import FastImage from "react-native-fast-image"
import axios from "axios"
import { axiosapi } from "../../axios/configAxios"



export default function CityModal({showCityModal, setShowCityModal,distinguishedData,loadingState,setMetaData}: ShowCityModal){


    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const {width , height} = useWindowDimensions()
    const tempImages = 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    let tempimagesArray = [tempImages, tempImages, tempImages]


    const RESET_METADATA : MetaData ={
            name: '',
            country: '',
            degree: '',
            state: '',
            lat: 0,
            long: 0,
            description: '',
            main: '',
            windSpeed: 0,
            pictures: []
    }


    async function closeModStateClear(){
        setShowCityModal(false)
        setMetaData(RESET_METADATA)
    }


    return(
        <Modal
        transparent={true}
        visible={showCityModal}
        animationType="slide"
        >
            <View style={styles.mainModal}>
                <View style={styles.insModal}>


                    <Ionicons name="close" size={20} color='black' onPress={closeModStateClear}/>
                    {!loadingState  
                    ?
                    <View style={{height :'100%', alignItems : "center", justifyContent : "center", marginTop : -30}}>
                        <View style={{
                            justifyContent : "center",
                            alignItems : "center",
                        }}>
                    <Text>Loading...</Text>
                    <ShimmerPlaceholder 
                    LinearGradient={LinearGradient} 
                    shimmerColors={['#4E9FE5', '#FFFFFF', '#E0E0E0']} 
                    shimmerWidthPercent={100} 
                    width={width - 100}
                    />
                        </View>
                    </View>
                    :
                    <View style={{flexDirection : "column"}}>
                        {distinguishedData?.pictures.length > 0 ?
                        <FlatList
                        data={distinguishedData?.pictures}
                        keyExtractor={item=> item.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bouncesZoom
                        renderItem={({item})=>{
                            return(
                            <FastImage
                            source={{
                                uri : item,
                                priority : FastImage.priority.normal,
                                cache : FastImage.cacheControl.immutable
                            }} 
                            style={{
                                height : 100,
                                width : 100,
                                borderRadius : 15,
                                marginHorizontal : 10
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                            />
                        )
                        }} />
                        :
                        
                        <View 
                        style={{
                            justifyContent : "center",
                            alignItems : "center"
                        }}>
                         <FlatList
                        data={tempimagesArray}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bouncesZoom
                        renderItem={({item})=>{
                            return(
                                <FastImage
                                source={{
                                    uri : item,
                                    cache : FastImage.cacheControl.immutable,
                                    priority : FastImage.priority.normal
                                }}
                                style={{
                                    height : 100,
                                    width : 100,
                                    borderRadius : 15,
                                    marginHorizontal : 10
                                }}
                                resizeMode="cover" />
                            )
                        }} />
                        <Text style={{color : "black"}}>*Displaying Placeholder Images - Real Images not captured*</Text>
                        </View>
                    }

                        
                        <View style={{height : "auto", paddingTop : 10}}>

                                <Text style={{ alignSelf: "center", fontSize : 30, fontFamily : "TurretRoad-Bold", color : "white"}}>{distinguishedData?.name}</Text>
                                <Text style={{ alignSelf: "center", fontSize : 16, fontFamily : "TurretRoad-Bold", color : "white"}}>{distinguishedData?.state},{distinguishedData?.country}</Text>
                                <Text style={{ alignSelf: "center", fontSize : 16, fontFamily : "TurretRoad-Bold", color : "white"}}> Lat : {distinguishedData?.lat} | Long : {distinguishedData?.long}</Text>
                                <Text style={{ alignSelf: "center", fontSize : 16, fontFamily : "TurretRoad-Bold", marginTop : 10, color : "white"}}>{distinguishedData?.description}, {distinguishedData?.main}</Text>

                        </View>

                        <View style={{justifyContent : "center", alignSelf : "center", marginTop : 20}}>
                            <Text style={{color : "white"}}>Temperature : {distinguishedData?.degree} C | Windspeed : {distinguishedData?.windSpeed} KM </Text>
                        </View>



                    </View>
                    }
                </View>
            </View>
        
        </Modal>
    )
}

const styles = StyleSheet.create({
        mainModal : {
        flex : 1,
        backgroundColor : "rgba(255, 255, 255, 0.12)",
        justifyContent : "flex-end",
        alignItems : "flex-end",
        borderColor : "black"
    },
    insModal : {
        height : 300,
        width : "100%",
        backgroundColor : "#4A6378",
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10
    }
})