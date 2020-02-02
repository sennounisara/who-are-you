import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { ApplicationProvider, Layout, Text,IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json'; 
import { EvaIconsPack } from '@ui-kitten/eva-icons';
var Parse = require('parse/react-native');



Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("MDd1lgojZu4iil4Ec8t9LvD1nwHfFR89OfZoZTZl", "3BTgp7jLi5YqxQx7wIHtYfhzj68mtbqdcFjCJmx4");



import Home from './screens/Home'
import { AppNavigator } from './Navigator';


const theme = { ...lightTheme, ...appTheme };

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={appTheme} >
      <AppNavigator />
    </ApplicationProvider>
  </React.Fragment>
  
);

export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
