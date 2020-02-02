import React from 'react';
import { StyleSheet, Alert,KeyboardAvoidingView } from 'react-native';
import { Layout, Text,Button, Icon,Input } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import CameraPic from '../componenets/CameraPic';
var Parse = require('parse/react-native');



export default class Home extends React.Component{

    static navigationOptions = {
        gestureEnabled: false,
        drawerLockMode:'locked-closed',
        headerMode: 'screen',
    };

    state={
        usingEmail:false,
        location:'none',
        errorMessage: null,
        geoCode:null,
        secureTextEntry:true,
        address:null,
        email:null,
        password:null,
        UserName:null,
        profilePic:null,
    }

    handleEmailChange = (newV)=>{
        this.setState({email:newV});
        
    }
    handleUserNameChange = (newV)=>{
        this.setState({UserName:newV});
        
    }
    handlePassswordChange = (newV)=>{
        this.setState({password:newV});
        
    }

    async componentDidMount() {
        var currentUser = await Parse.User.currentAsync();
        if (currentUser) {
            // do stuff with the user
            this.props.navigation.navigate('Home');
        } 


        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
        
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }else{
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            this.setState({ location });
            let geoCodeArr =  await Location.reverseGeocodeAsync({longitude:location.coords.longitude,latitude:location.coords.latitude})
            let geoCode = geoCodeArr[0];
            let address = (geoCode===null)?errorMessage:(geoCode.name+', '+geoCode.city+', '+geoCode.region+' '+geoCode.postalCode+", "+geoCode.country);
            this.setState({ address:address });
            console.log(address)
        }
        
        
        
    };

    handlePassswordChange = (newV)=>{
        this.setState({password:newV});
        
    }

    onIconPress = () => {
        const {secureTextEntry}= this.state;
        const news = !secureTextEntry;
        this.setState({secureTextEntry:news,});
        console.log(news)
    };
      
    FacebookIcon = (style) => (
        <Icon name='facebook' {...style} />
    );
    EmailIcon = (style) => (
        <Icon name='email-outline' {...style} />
    );
    GoogleIcon = (style) => (
        <Icon name='google-outline' {...style} />
    );
    
    onAlreadyHaveAnAccount = ()=>{
        console.log('onAlreadyHaveAnAccount')
        this.props.navigation.navigate('Login');
    }
    
    onFacebook = ()=>{
        console.log('onFacebook')
    }

    onGoogle = ()=>{
        console.log('onGoogle')
    }

    onEmail = ()=>{
        console.log('onEmail')
        this.setState({usingEmail:true})
    }

    renderEmailIcon = (style)=>{
        return(
            <Icon {...style} name='email-outline'/>
        )
    }

    renderUserIcon = (style)=>{
        return(
            <Icon {...style} name='person-outline'/>
        )
    }

    renderPassIcon = (style) => {
        const {secureTextEntry}= this.state;
        return(
            <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        )
    }

    onSignUp = async ()=>{
        const {address,email,password,UserName,profilePic,} = this.state;

        if(email === null || email === '') {
            Alert.alert('Email is Invalid');
            return ;
        }
        if(password === null || password === '' ) {
            Alert.alert('password is Invalid');
            return;
        }
        if(UserName === null || UserName === '' ) {
            Alert.alert('UserName is Invalid');
            return;
        }
        //if(profilePic === null) Alert.alert('Profile Pic is Invalid Click on the camera to take a picture ');

        console.log('onSignUp')
        console.log('UserName :'+UserName)
        console.log('email :'+email)
        console.log('address :'+address)
        console.log('password :'+password)
        

        
        var user = new Parse.User();
        user.set("username", UserName);
        user.set("password", password);
        user.set("email", email);
        if(profilePic != null){
            const base4 = profilePic.base64;
            var picFile = new Parse.File("profilePic.jpg", { base64: base4 });
            user.set("profile", picFile);
        }
        try {
            await user.signUp();
            // Hooray! Let them use the app now.
            this.props.navigation.navigate('Home');
        } catch (error) {
            // Show the error message somewhere and let the user try again.
            Alert.alert("Error: " + error.code + " " + error.message);
        }
        

        

    }

    onPic = (pic)=>{
        console.log('*********onPic*********')
        console.log(pic)
        this.setState({profilePic:pic});
        

    }

    render(){
        const{usingEmail,secureTextEntry,errorMessage,address,email,password,UserName} =this.state;
        
        

        return(
            <Layout style={styles.container} >
                {(!usingEmail)&& (
                    <Layout style={styles.container}>
                        <Text style={styles.title} category='h2'>Smart Symphony</Text>
                        <Text style={styles.title} category='h3'>Sign Up</Text>
                        <Layout style={styles.containerButtons} >  
                            <Layout style={styles.buttonC} >
                                <Button  style={styles.loginButton} icon={this.EmailIcon} onPress={this.onEmail}>
                                    Sign Up With Email
                                </Button>
                                <Button  style={styles.loginButton} icon={this.FacebookIcon} onPress={this.onFacebook}>
                                    Sign Up with Facebook</Button>
                                <Button  style={styles.loginButton} icon={this.GoogleIcon} onPress={this.onGoogle}>
                                    Sign Up With Google</Button>
                                
                            </Layout>
                            
                        
                        </Layout>
                        <Text style={styles.alreadyHaveAnAccount} category='h5' onPress={this.onAlreadyHaveAnAccount} >Already Have An Account</Text>
                    </Layout>
                
                )}

                {(usingEmail)&&(
                    <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
                        
                        <Text style={styles.title} category='h2'>Smart Symphony</Text>
                        <CameraPic onTakePic={this.onPic} big={false} />
                        <Input
                            label='UserName'
                            placeholder='johnDoe'
                            value={UserName}
                            autoCapitalize = 'none'
                            onChangeText={this.handleUserNameChange}
                            icon={this.renderUserIcon}
                            style={styles.input}
                        />
                        <Input
                            label='Email'
                            placeholder='john.doe@example.com'
                            value={email}
                            autoCapitalize = 'none'
                            onChangeText={this.handleEmailChange}
                            icon={this.renderEmailIcon}
                            style={styles.input}
                        />
                        
                        <Input
                            label='Password'
                            placeholder='password'
                            icon={this.renderPassIcon}
                            secureTextEntry={secureTextEntry}
                            onIconPress={this.onIconPress}
                            value={password}
                            onChangeText={this.handlePassswordChange}
                            style={styles.input}
                        />
                        <Text style={styles.location}>Location : {(errorMessage===null)?address:errorMessage}</Text>
                        <Layout style={styles.loginContainer}>
                            <Button size='giant' style={[styles.loginbutton,{borderWidth:0,}]}  onPress={this.onSignUp} >
                                Sign Up
                            </Button>
                        </Layout>
                        <Text style={styles.alreadyHaveAnAccount} category='h5' onPress={this.onAlreadyHaveAnAccount} >Already Have An Account</Text>

                        

                    </KeyboardAvoidingView>
                )
                }
                
                    
                
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
    title:{
        margin:10,
        color:appTheme['color-primary-900'],
    },
    containerButtons:{
        flexDirection:'row',
        backgroundColor:appTheme['color-primary-100'],
        paddingBottom:40,
    },
    buttonC:{
        flex:1,
        backgroundColor:appTheme['color-primary-100'],
    },
    loginButton:{
        flex:1,
        marginTop:10,
        marginBottom:10,
        borderWidth:2,
        borderColor:'rgba(0,0,0,0.2)',
        
    },
    loginContainer:{
        flexDirection:'row',
        backgroundColor:appTheme['color-primary-100'],
        paddingTop:10,
    },
    alreadyHaveAnAccount:{
        paddingTop:40,
    },
    buttonL:{
        flexDirection:'row',
        backgroundColor:appTheme['color-primary-100'],
    },
    smallloginButton:{
        borderWidth:2,
        borderColor:'rgba(0,0,0,0.2)',
        //backgroundColor:'#fff',
        borderRadius:80,
        margin:10,
    },
    location:{
        alignSelf:'flex-start',
        paddingTop:5,
        paddingBottom:5,
    },
    input:{
        paddingTop:5,
        paddingBottom:5,
    },
    loginContainer:{
        flexDirection:'row',
        backgroundColor:appTheme['color-primary-100'],
        paddingTop:10,
    },
    loginbutton:{
        flex:1,
        borderWidth:2,
        borderColor:'rgba(0,0,0,0.2)',
    },
    circle:{
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },

})