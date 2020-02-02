import React from 'react';
import { StyleSheet, View,Alert } from 'react-native';
import { Layout, Text,Button, Icon,Input } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 
var Parse = require('parse/react-native');



export default class Home extends React.Component{

    state={
        username:'',
       
    }

    componentDidMount = async ()=>{

        
        /*
        const ratings = await Parse.Cloud.run("test");
        Alert.alert(ratings.answer)

        */

       this._Focus = this.props.navigation.addListener(
        'didFocus',
        this._componentFocused
       
      );

    }

    componentWillUnmount() {
        this._Focus.remove();
    }

    _componentFocused =  () => {
        console.log("_componentFocused")
       

        this.checkUser();
        


    }

    checkUser = async ()=>{
        var currentUser = await Parse.User.currentAsync();
        if (currentUser) {
            // do stuff with the user
            this.setState({username:currentUser.getUsername()})
            
            
        } else {
            // show the signup or login page
            
            this.props.navigation.navigate('Login');
        }
        
    }



    

    
    onLogout = ()=> {
        Parse.User.logOut().then((user)=>{
            this.props.navigation.navigate('Login');
        });
        
    }
              
         
    
    dataExtractor = ()=>{
        console.log("dataExtractor")
        this.props.navigation.navigate('DataExtracter')
    }
   
    faceRecon = ()=>{
        console.log("faceRecon")
        this.props.navigation.navigate('FaceReco')
    }

    
    





    

    render(){

        const {username,} = this.state;

        return(
            <Layout style={styles.container}>
                <Text category='h1'>Welcom, {username}  </Text>
                <Button style={styles.button} onPress={this.dataExtractor } size='large' >Data Extracter</Button>
                <Button style={styles.button} onPress={this.faceRecon } size='large' >Face Recognition</Button>
                <Button style={styles.button} onPress={this.onLogout } size='large' >Log Out</Button>
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
    button:{
        margin:10,
        width:250,
        
    },

})