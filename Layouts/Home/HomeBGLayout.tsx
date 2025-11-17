import LinearGradient from 'react-native-linear-gradient'
import type {HomeLayoutType} from '../../Types/component-types'
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context'

export default function HomeBG({colors, children} : HomeLayoutType){
    return(
        <SafeAreaProvider>
        <LinearGradient colors={colors ?? ["#4F7CD1","#cecacaff"]} style={{flex : 1}}>
            <SafeAreaView style={{flex : 1}}>
            {children}
            </SafeAreaView>
        </LinearGradient>
        </SafeAreaProvider>
    )
}