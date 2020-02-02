import React from 'react';
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native';
import { Layout, Text,Button, Icon,Input } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 


export default class ForgotPassword extends React.Component{

    static navigationOptions = {
        gestureEnabled: false,
        drawerLockMode:'locked-closed',
        headerMode: 'screen',
    };

    render(){

        return(
            <Layout style={styles.container}>
                <Text>ForgotPassword</Text>
            </Layout>
        )

    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:appTheme['color-primary-100'],
    }, 

})