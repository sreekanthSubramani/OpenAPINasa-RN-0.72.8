import { useContext } from 'react'
import {AuthProvider,UseAuthContext} from './AuthContext/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import storeConfig from './Redux/Store/StoreConfig'
import Toast from 'react-native-toast-message';
import ProfileScreen  from './components/More/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './components/ScreenAlignments/BottomTabs';
import HomepageScreen from './components/Homescreen/Homepage';
import AuthStack from './components/ScreenAlignments/HomePageAuth';


const NativeStack = createNativeStackNavigator()

export default function App(): JSX.Element {


  function UIViewStack(){
    const {isAuthenticated, authLoading} = useContext(UseAuthContext)
    console.log(isAuthenticated, authLoading, 'here we gop')

    if(authLoading){
      return(
        <View>
          <View style={{flex : 1, justifyContent : "center"}}>
            <ActivityIndicator size='large' />
          </View>
        </View>
      )
    }

    return isAuthenticated ?  <BottomTabs /> : <AuthStack /> 

  }


return(

  <ReduxProvider store={storeConfig}>
    <PaperProvider settings={{
      icon : (props)=> <Ionicons {...props} />
    }}>
      <AuthProvider>   
        <NavigationContainer>
          <UIViewStack />
      </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  
    </ReduxProvider>

)
  
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


