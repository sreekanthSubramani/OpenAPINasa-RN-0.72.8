import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import GibbsScreen from '../GIBBS_Screen/Gibbs_screen'
import EPICScreen from '../EPIC/EpicScreen'
import MoreScreen from '../More/Morescreen'
import ProfileScreen from '../More/ProfileScreen';
import LocationsScreen from '../More/LocationScreen'

const BottomNavs = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

export default function BottomTabs(){

    const OtherScreens = () =>{
    return(
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Settings" component={MoreScreen}  options={{headerShown : true}}/>
         <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown : true}}/>
         <Stack.Screen name='Locations' component={LocationsScreen} options={{headerShown : true}}/>
    </Stack.Navigator>
    )
}


    return(
        <BottomNavs.Navigator>
            <BottomNavs.Screen name='GIBS' component={GibbsScreen} options={{
                headerShown : false
            }}/>
            <BottomNavs.Screen name='EPIC' component={EPICScreen} options={{
                headerShown : false
            }}/>
            <BottomNavs.Screen name='Others' component={OtherScreens}  options={{headerShown : false}}/>
        </BottomNavs.Navigator>

    )
}

