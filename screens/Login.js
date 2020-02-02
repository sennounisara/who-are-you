import React from 'react';
import { StyleSheet, KeyboardAvoidingView,Alert } from 'react-native';
import { Layout, Text,Input,Icon,Toggle,Button } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 
var Parse = require('parse/react-native');



export default class Home extends React.Component{
    
    
    static navigationOptions = {
        gestureEnabled: false,
        drawerLockMode:'locked-closed',
        headerMode: 'screen',
    };


    state={
        
        secureTextEntry:true, 
        rememberme:true,
        UserName:'',
        password:'',
       
    }

    componentDidMount = async ()=>{

        var currentUser = await Parse.User.currentAsync();
        if (currentUser) {
            // do stuff with the user
            this.props.navigation.navigate('Home');
        } 

        /*
        const ratings = await Parse.Cloud.run("test");
        alert(ratings.answer)
        */



    }



    handleUserNameChange = (newV)=>{
        this.setState({UserName:newV});
        
    }
    handlePassswordChange = (newV)=>{
        this.setState({password:newV});
        
    }
    handleRemeberMe = ()=>{
        const {rememberme} = this.state;
        const newV = !rememberme;
        this.setState({
            rememberme:newV,
        })
        
    }

    

    onIconPress = () => {
        const {secureTextEntry}= this.state;
        const news = !secureTextEntry;
        this.setState({secureTextEntry:news,});
        console.log(news)
    };
    
    renderPassIcon = (style) => {
        const {secureTextEntry}= this.state;
        return(
            <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        )
    }

    renderEmailIcon = (style)=>{
        return(
            <Icon {...style} name='email-outline'/>
        )
    }

    onSignUp = ()=>{
        console.log('onSignUp')
        this.props.navigation.navigate('Signup');
    }

    onForgotPass = ()=>{
        console.log('onForgotPass')
        this.props.navigation.navigate('ForgotPassword');
    }

    onLogin = async ()=>{
        console.log('onLogin')
        const {UserName,password} = this.state;
        if(UserName === '' ) {
            Alert.alert("UserName Can't be Empty")
            return ;
        }
        if(password === '' ) {
            Alert.alert("UserName Can't be Empty")
            return ;
        }
        const user = await Parse.User.logIn(UserName, password).then((user)=>{
            this.props.navigation.navigate('Home');
        },(error)=>{
            console.log(error)
            Alert.alert(error.message)
        })

        
        




    }

    FacebookIcon = (style) => (
        <Icon name='facebook' {...style} />
    );

    renderUserIcon = (style)=>{
        return(
            <Icon {...style} name='person-outline'/>
        )
    }

    GoogleIcon = (style) => (
        <Icon name='google-outline' {...style} />
    );

    onFacebookLogin = ()=>{
        console.log('onFacebookLogin')
    }

    onGoogleLogin = ()=>{
        console.log('onGoogleLogin')
    }

    render(){

        const {UserName,secureTextEntry,password,rememberme} = this.state;
        

        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
                
                <Text style={styles.title} category='h2'>Smart Symphony</Text>
                <Layout style={styles.socialLoginsContainer}>
                    <Button size='medium' style={[styles.socialLogins,{marginRight:5,}]} onPress={this.onFacebookLogin} icon={this.FacebookIcon}>
                        
                    </Button>
                    <Button size='medium' style={[styles.socialLogins,{marginLeft:5,}]} onPress={this.onGoogleLogin} icon={this.GoogleIcon}>
                        
                    </Button>
                </Layout>
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
                    label='Password'
                    placeholder='password'
                    icon={this.renderPassIcon}
                    secureTextEntry={secureTextEntry}
                    onIconPress={this.onIconPress}
                    value={password}
                    onChangeText={this.handlePassswordChange}
                />
                <Layout style={styles.forgotContainer}>
                    <Toggle style={styles.rememberme} 
                        text='Remember Me'
                        checked={rememberme}
                        onChange={this.handleRemeberMe}
                    />
                    <Text style={styles.forgotPassword}  onPress={this.onForgotPass} >Forgot Password</Text>
                </Layout>
                <Layout style={styles.loginContainer}>
                    <Button size='giant' style={styles.loginbutton} onPress={this.onLogin} >
                        Login
                    </Button>
                </Layout>
                <Layout style={styles.loginContainer}>
                    <Button size='giant' style={[styles.loginbutton,{borderWidth:0,}]} appearance='ghost' onPress={this.onSignUp} >
                        Sign Up
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        )

    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:appTheme['color-primary-100'],
    }, 
    title:{
        margin:20,
        color:appTheme['color-primary-900'],
        
    },
    forgotContainer:{
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:appTheme['color-primary-100'],
    },
    forgotPassword:{
        flex:1,
        textAlign:'right',
        fontStyle:'italic'
        
    },
    rememberme:{
        flex:1,
        
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
    socialLoginsContainer:{
        flexDirection:'row',
        backgroundColor:appTheme['color-primary-100'],
    },
    socialLogins:{
        flex:1,
        marginTop:10,
        marginBottom:10,
        borderWidth:2,
        borderColor:'rgba(0,0,0,0.2)',
    }


})