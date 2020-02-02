import React from 'react';
import { StyleSheet, View,Alert,TouchableOpacity } from 'react-native';
import { Layout, Avatar,Button, Icon,Input,Text } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 
var Parse = require('parse/react-native');



export default class Drawer extends React.Component{

    state={
        userName:null,
        profilePicUrl:null,
        lastPicked:'Home'
    }

    componentDidMount = ()=>{

        this._sub = this.props.navigation.addListener(
            'didFocus',
            this._componentFocused
        );
        this._componentFocused()
    }
    componentWillUnmount() {
        this._sub.remove();
    }

    _componentFocused = async () => {
        console.log("_componentFocused")
        var currentUser = await Parse.User.currentAsync();
        if (currentUser) {
            // do stuff with the user
            const userName = currentUser.getUsername();
            const profileFile = currentUser.get("profile");
            const profilePicUrl = profileFile.url();
            console.log("userName")
            console.log(userName)
            console.log(profilePicUrl)
            this.setState({
                userName:userName,
                profilePicUrl:profilePicUrl,
            })
        } else {
            // show the signup or login page
            
            this.props.navigation.navigate('Login');
        }
        console.log("currentUser is "+ currentUser)


        this.setState(this.state);


    }

    OnData = ()=>{
        this.setState({lastPicked:'DataExtracter'})
        this.props.navigation.navigate('DataExtracter')
    }

    OnFaceRe = ()=>{
        this.setState({lastPicked:'FaceReco'})
        this.props.navigation.navigate('FaceReco')
    }

    onHome = ()=>{
        this.setState({lastPicked:'Home'})
        this.props.navigation.navigate('Home')
    }


    render(){
        
        const {profilePicUrl,userName,lastPicked} = this.state;
        
        const url = (profilePicUrl!=null)? profilePicUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png';

        return(
            <Layout style={styles.container}>
                
                <Layout style={styles.avatarConatainer} >
                    <Avatar style={styles.avatar} size='giant' source={{uri:url}}/>
                    <Text style={styles.title} >{userName}</Text>
                </Layout>
                
                
                <TouchableOpacity style={[styles.views,(lastPicked==='Home')?{backgroundColor:'#B7FCFA'}:{}]}  >
                    <Button style={styles.viewTitle} appearance="ghost" size='large' onPress={this.onHome} >
                    Home
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.views,(lastPicked==='DataExtracter')?{backgroundColor:'#B7FCFA'}:{}]}  >
                    <Button style={styles.viewTitle} appearance="ghost" size='large'  onPress={this.OnData} >
                    Data Extracter
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.views,(lastPicked==='FaceReco')?{backgroundColor:'#B7FCFA'}:{}]}  >
                    <Button style={styles.viewTitle} appearance="ghost" size='large' onPress={this.OnFaceRe}>
                    Face Recognition
                    </Button>
                </TouchableOpacity>
               
               
                    
                    
               

            </Layout>
        )

    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingTop:20,
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:appTheme['color-primary-100'],
    }, 
    avatarConatainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:appTheme['color-primary-100'],
    },
    title:{
        flex:1,
        textAlign:'center',
        fontSize:20,
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#0E3E6D',
        
    },
    views:{
       
       
    },
    viewTitle:{
        fontSize:20,
        fontStyle:'italic',
        fontWeight:'bold',
        
    },


})