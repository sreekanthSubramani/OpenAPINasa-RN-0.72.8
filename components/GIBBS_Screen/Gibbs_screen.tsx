import {View, StyleSheet, Text, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Geolocation from '@react-native-community/geolocation'
import { useState, useEffect } from 'react'
import MapView, {UrlTile, Region, LocalTile} from 'react-native-maps'
import type {Region as RegionType} from '../../node_modules/react-native-maps/lib/sharedTypes'
import { Chip } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CityModal from './City_Modal'
import type { ArrayFields, MetaData } from '../../Types/component-types'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { reverseGeo, fetchWeather, fetchMapillary, locationServiceArray} from './AllAsyncFetchServices'





//city modal is popping and should work on loading state, photo zoom effect, should work on GIBS layer again ?


export default function GibbsScreen(){

    const openWeatherAPIKEY = '9a8ca5fdddbd3327a4aa57a4802540f4'
    const openReverseGeoCoding = 'a0956970c3c70a1386c38c58e1fe9bd7'

    const [lats, setLats] = useState<number>()
    const [longs, setLongs] = useState<number>()
    const [coordinates, setCoordinates] = useState<RegionType>()
    const [showInfo, setShowInfo] = useState(false)
    const [showCityModal, setShowCityModal] = useState<boolean>(false)
    const [metaData, setMetaData] = useState<MetaData>({} as MetaData)
    const [mapillaryPics, setMapillaryPics] = useState<string[]>()
    const [showMapCalendar, setMapCalendar] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [loadingState, setLoadingState] = useState(false)


function convertDateYYMM(d : Date){
        let properDate = d.toLocaleDateString().split('T')[0]
        const [month,date,year] = properDate.split('/')
        let newDate;
        date.length == 1 ? newDate = date.padStart(2, "0") : newDate = date
        return `${newDate}-${month}-${year}`
    }

    function handleDateChangesforMap(e :any){
        setDate(e?.date)
        setMapCalendar((prev)=> !prev)
    }



    const gibbsLayer = "VIIRS_SNPP_CorrectedReflectance_TrueColor"
    const otherGibbs = 'MODIS_Terra_CorrectedReflectance_TrueColor'
    const mapillaryToken = "MLY|25179013605115819|ec37b75e7d602866f88ebe91a74ef354"

    function openMapCal(){
        setMapCalendar((prev)=> !prev)
    }



    useEffect(()=>{
                try{
                const getCurrentPos = Geolocation.getCurrentPosition((pos)=>{
                const lat = pos.coords.latitude
                const long = pos.coords.longitude
                setLats(lat)
                setLongs(long)
            });

        }catch(e){
            console.log(e, 'Error')
        }

    },[])


    useEffect(()=>{
        setCoordinates({
            latitude : lats || 0,
            longitude : longs || 0,
            latitudeDelta : 2,
            longitudeDelta : 2
        })
    },[lats, longs])

function buildBBox(lat: number, lon: number, delta = 0.005) {
  return {
    minLat: +(lat - delta).toFixed(6),
    maxLat: +(lat + delta).toFixed(6),
    minLon: +(lon - delta).toFixed(6),
    maxLon: +(lon + delta).toFixed(6),
  };
}




async function getNativeCoords(e : any){

            setShowCityModal((prev)=> !prev)
            setLoadingState(false)            


        try{
                    const nativeLats = e.nativeEvent.coordinate.latitude
                    const nativeLongs = e.nativeEvent.coordinate.longitude
                    //location finder
            
                    const locationFinder = await reverseGeo(nativeLats, nativeLongs)

                    const fetchedLat = locationFinder[0]?.lat
                    const fetchedLong = locationFinder[0]?.lon
                    
                    
                    const convertedBbox = buildBBox(nativeLats, nativeLongs)

                    let minLat = convertedBbox.minLat
                    let minLon = convertedBbox.minLon
                    let maxLat = convertedBbox.maxLat    
                    let maxLon = convertedBbox.maxLon

                    const [findWeather, findMapillary] = await Promise.all([
                        fetchWeather(fetchedLat, fetchedLong),
                        fetchMapillary(minLat, minLon,maxLat,maxLon)
                    ])

                    let celcius = (Number(findWeather?.main.temp) - 273.15).toFixed(2)                 
            
                    if(locationFinder !== null && findWeather !== null){
                        setMetaData({
                            name : locationFinder[0]?.name,
                            country : locationFinder[0]?.country,
                            degree : celcius,
                            state : locationFinder[0]?.state,
                            lat : locationFinder[0]?.lat,
                            long : locationFinder[0]?.lon,
                            description : findWeather?.weather[0].description,
                            main :findWeather?.weather[0].main,
                            windSpeed : findWeather?.wind.speed,
                            pictures : findMapillary
                        })
                        setLoadingState(true)

                        const arrayFields : ArrayFields = {
                            lat : fetchedLat,
                            long : fetchedLong,
                            name : locationFinder[0].name,
                            state : locationFinder[0].state,
                            country : locationFinder[0].country
                        }
                        locationServiceArray(arrayFields)
                    }

        }catch(e){
            console.log(e)
        }

    }

    function showObjectives(){
        setShowInfo((prev)=>!prev)
    }

    const mapsDate = convertDateYYMM(date).toString().split('-').reverse().join('-').toString()

          
    return(
        <SafeAreaView style={{flex : 1}}>
        
         { !coordinates?.latitude && !coordinates?.longitude
        ? 

        <View>
            <ActivityIndicator />
        </View>
        :
        <>
        <View style={{zIndex : 10, gap : 10}}>
            <Chip 
            icon='wifi'
            style={{
                backgroundColor : "rgba(255, 255, 255, 0.74)",
                width : "65%",
            }}>
                <Text>Nasa Imagery on {convertDateYYMM(date)} </Text>

            </Chip>

            {showInfo ? 
                        <Chip 
            icon='information'
            style={{
                backgroundColor : "rgba(255, 255, 255, 0.74)",
                width : "auto",
                
            }}
            onPress={()=> setShowInfo((prev)=>!prev)}
            >   
            <View style={{flexDirection : "column"}}>
            <Text>Double tap at the location to know Place , Temperature</Text>
            <Text>Select Custom Date if Map is not loaded properly  <Ionicons name='calendar' size={20} onPress={openMapCal} /></Text>
            </View>
                
            </Chip>
            :
            <Ionicons name='chatbubble-ellipses' size={30} style={{color: "white"}} onPress={showObjectives}/>
        }
        </View>



        <MapView
        initialRegion={coordinates}
        style={StyleSheet.absoluteFillObject}
        mapType="mutedStandard"  
        minZoomLevel={2}
        maxZoomLevel={9}
        onDoublePress={(e)=>getNativeCoords(e)}
        loadingEnabled={true}
        >
            
            <UrlTile
                maximumZ={9}
                tileSize={256}
                zIndex={1}
                urlTemplate={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${gibbsLayer}/default/${mapsDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`} 
            />
            
        </MapView>
        </>
        }

        {showCityModal ?
        <CityModal showCityModal={showCityModal} setShowCityModal={setShowCityModal} distinguishedData={metaData} loadingState={loadingState} setMetaData={setMetaData}/>
        :
        <></>
        }

            {showMapCalendar ?
            <DateTimePicker
            mode='single'
            style={{
                backgroundColor : "white",
                height : "auto"
            }}
            styles={{
                today : {backgroundColor : "gray"},
                selected : {backgroundColor : "red"},

            }}
            monthsFormat='short'
            onChange={(e)=>handleDateChangesforMap(e)}
            />
            :
            <></>
            }


        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    middleSet : {
        margin : "auto"
    }
})