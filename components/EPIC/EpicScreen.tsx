import { SafeAreaView } from 'react-native-safe-area-context'
import {View, StyleSheet, Text, Button, Image, useWindowDimensions, DevSettings} from 'react-native'
import { useState, useEffect, useCallback, useRef, useMemo} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import type { FetchedCal } from '../../Types/component-types'



export default function EPICScreen() : JSX.Element{
    
    const [image, setImage] = useState<string>()
    const [displayImg, setDisplayImg] = useState<string>()
    const [metaImages, setMetaImages] = useState<string[]>([])
    const [fetchedCal, setFetchedCal] = useState<FetchedCal>({} as FetchedCal)

    const [showImg, setShowImg] = useState<boolean>(false)
    const {height, width} = useWindowDimensions()
    
    const APIKey = 'O1GFwn8IcFDAcUJU5VoHL6T36oITIokCSgpgLNEx'

    const revisit = useRef(false)
    const index = useRef(0)

    
    
    const dataFetchWhileVisible = async () =>{
        const [yearInit, monthInit, dateInit] = new Date().toISOString().split('T')[0].split('-')
        try{
            const data = await fetch(`https://epic.gsfc.nasa.gov/api/natural/${yearInit}-${monthInit}-${dateInit}`)
            const result = await data.json()
            console.log(result)

            //all the fucking setters down !!
            
            const img = result[0].image
            setDisplayImg(img)
            setImageWithArray(result)
            const [yearFromFetch, monthFromFetch, dateFromFetch] = result[0].date.split(" ")[0].split('-')

            setFetchedCal({
                date : dateFromFetch,
                month : monthFromFetch,
                year : yearFromFetch
            })

        }catch(e){
            console.log(e)
        }
    }


    useFocusEffect(
        
        useCallback(()=>{

            if(revisit.current) return;

            if(!revisit.current){
                
                revisit.current = true
                dataFetchWhileVisible()
                
            }


        },[])

    )   

    // const RenderImageAlone = useMemo(()=>{
    //     return(
    //         <Image
    //             source={{uri : image}}
    //                 style={{
    //                 height : height - 200,
    //                 width : width,
    //                 borderColor : "white",
    //                 borderWidth : 10,
    //                 zIndex : 100
    //             }}
    //             resizeMode='contain' />
    //     )
    // },[])

    
    async function handleEPIC(){
            console.log('check')
        try{
            
            if(displayImg && fetchedCal){
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${fetchedCal.year}/${fetchedCal.month}/${fetchedCal.date}/png/${displayImg}.png`
            setImage(imageUrl)
            setShowImg(true)
            }

        }catch(e){
            console.log(e)
        }
    }

    
    // function playRotation(){
    //     let copyMetaImages = [...metaImages]
        
    //     const playRotate = setInterval(()=>{
    //         let metaImagesShift = copyMetaImages.shift()
            
    //         setImage(`https://epic.gsfc.nasa.gov/archive/natural/${fetchedCal.year}/${fetchedCal.month}/${fetchedCal.date}/png/${metaImagesShift}.png`)
            
    //         setDisplayImg(metaImagesShift)
    //         if(copyMetaImages.length == 0){
    //             clearInterval(playRotate)
    //         }
    //     },5000)
    // }

    function playRotation(){
        index.current = 0;
        
        const setRotation = setInterval(()=>{

            index.current++
            let nextUpImages = metaImages[index.current]
            
            
            if(index.current <= metaImages.length){
                setImage(`https://epic.gsfc.nasa.gov/archive/natural/${fetchedCal.year}/${fetchedCal.month}/${fetchedCal.date}/png/${nextUpImages}.png`)
            }else{
                setImage(`https://epic.gsfc.nasa.gov/archive/natural/${fetchedCal.year}/${fetchedCal.month}/${fetchedCal.date}/png/${metaImages[0]}.png`)
            }
            
            
            if(index.current >= metaImages.length){
                clearInterval(setRotation)
            }



        },10000)

    }

    function setImageWithArray(result : any){
        const array = result.map((metaData : any)=> {
            return metaData.image
        })
        setMetaImages(array)
    }

    console.log(image)
  

    return(
            <SafeAreaView style={{flex : 1,backgroundColor : "black",}}>
                <View style={{backgroundColor : "black", flexDirection : "column"}}>
                {showImg ?  


                <Image
                source={{uri : image}}
                style={{
                    height : height - 200,
                    width : width,
                    borderWidth : 10,
                    zIndex : 100
                }}
                resizeMode='contain'
                />
                :
                <View>
                    <Text style={{color : "white"}}>EPIC - Earth Polychromatic Imaging Camera</Text>    
                    <Text style={{color : "white"}}>Gives the live rotation of Earth with your considerable angles </Text>
                </View>}
                <View style={{
                    zIndex : 100,
                }}>
                <Button title='Fetch API' onPress={handleEPIC} />
                <Button title='Play Button' onPress={playRotation} />
                </View>
                </View>
                </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})