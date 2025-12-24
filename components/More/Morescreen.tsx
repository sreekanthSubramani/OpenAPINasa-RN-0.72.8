import {View, StyleSheet, ScrollView, TouchableHighlight} from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, Divider} from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { SecureKeychain } from '../../src/config/secureStorage'


export default function MoreScreen(){
    
    const navigations = useNavigation()
    
    const profileScreen = ()=>{
        navigations.navigate('Profile')
    }

    async function handleTokens(){
        const showTokens = await SecureKeychain.getAccessToken()
        const showRefTokens = await SecureKeychain.getRefreshToken()

        console.log(showRefTokens, 'refresh token')
    }
    
    
    return(
        <SafeAreaProvider>
        <SafeAreaView style={{flex : 1}}>
            <ScrollView style={styles.scrollViewBG}>
            <TouchableHighlight style={styles.touchables} onPress={profileScreen}> 
                    <View style={styles.viewStyles}>
                    <Text style={styles.txtStyles}>Profile</Text>
                    <Ionicons name='chevron-forward-sharp' size={20} />
                    </View>
            </TouchableHighlight> 
            <Divider style={styles.divStyle}/>

            <TouchableHighlight style={styles.touchables} onPress={()=> navigations.navigate('Locations')}> 
                    <View style={styles.viewStyles}>
                    <Text style={styles.txtStyles}>My Locations</Text>
                    <Ionicons name='chevron-forward-sharp' size={20} />
                    </View>
            </TouchableHighlight> 
            <Divider style={styles.divStyle}/>


            <TouchableHighlight style={styles.touchables} onPress={handleTokens}> 
                    <View style={styles.viewStyles}>
                    <Text style={styles.txtStyles}>Sign out</Text>
                    <Ionicons name='chevron-forward-sharp' size={20} />
                    </View>
            </TouchableHighlight> 
            <Divider style={styles.divStyle}/>

            

            
            </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    scrollViewBG : {flex : 1, backgroundColor : "lightgrey"},
    touchables : {height : 50, justifyContent : "center" },
    viewStyles : {justifyContent : "space-between", flexDirection : "row"},
    divStyle : {height : 10, backgroundColor : "rgba(255,255,255,0.3)"},
    txtStyles : {fontSize : 20, paddingLeft : 10}
})