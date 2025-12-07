import React from 'react';
import {StyleSheet, View} from 'react-native';
import {  Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import HomepageScreen from './components/Homescreen/Homepage';
import GibbsScreen from './components/GIBBS_Screen/Gibbs_screen';
import EPICScreen from './components/EPIC/EpicScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Provider} from 'react-redux'
import storeConfig from './Redux/Store/StoreConfig'
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



function App(): JSX.Element {


  const BottomTabs = createBottomTabNavigator()


  return (
    <Provider store={storeConfig}>
    <PaperProvider 
    settings={{
      icon :(props) => <Ionicons {...props} />,
    }}
    >
      <NavigationContainer>
      <BottomTabs.Navigator screenOptions={{
        header : ()=> null,
        tabBarStyle : {
          height : 60
        }
      }}>
        <BottomTabs.Screen name='GIBS' component={GibbsScreen} />
        <BottomTabs.Screen name='EPIC' component={EPICScreen} />
      </BottomTabs.Navigator>
      </NavigationContainer>


    </PaperProvider>
    <Toast />
    </Provider>
  );
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

export default App;
