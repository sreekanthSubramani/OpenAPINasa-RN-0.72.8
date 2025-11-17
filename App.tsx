import React from 'react';
import {StyleSheet, View} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomepageScreen from './components/Homescreen/Homepage';
import {Provider} from 'react-redux'
import storeConfig from './Redux/Store/StoreConfig'




function App(): JSX.Element {
 

  return (
    <Provider store={storeConfig}>
    <PaperProvider>
    <View style={{flex : 1}}>
        <HomepageScreen />
    </View>
    </PaperProvider>
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
