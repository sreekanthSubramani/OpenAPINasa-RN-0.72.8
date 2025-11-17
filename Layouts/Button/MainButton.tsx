import {View, StyleSheet, Text, Button, Pressable} from 'react-native'
import type { ButtonProps } from '../../Types/component-types'
import LinearGradient from 'react-native-linear-gradient'

 
export default function MainBtn({colors, heightNum,pressFunc,widthNum, content, txtCol} :ButtonProps){

    // const {height, width} = useWindowDimensions()

    return(
        <Pressable onPress={pressFunc || null} style={{ borderRadius: 20, overflow: "hidden" }}>
        <LinearGradient colors={colors ?? ["#4F7CD1","#cecacaff"]}>
        <View style={[styles.btnPropStyle, {height : heightNum, width : widthNum}]}>
            <Text style={[styles.contentStyles, {color : txtCol || 'black'}]}>{content}</Text>
        </View>
        </LinearGradient>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    btnPropStyle:{
        borderRadius : 20,
        borderColor : 'rgba(255,255,255, 0.3)',
        justifyContent : "center",
        alignItems : "center"
    },
    contentStyles : {
        fontFamily : "TurretRoad-Bold",
        fontSize : 20,
        textAlign : "center",
    }
})