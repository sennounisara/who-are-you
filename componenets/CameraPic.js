import React from 'react';
import { StyleSheet, View,Image,TouchableOpacity,Dimensions } from 'react-native';
import { Layout, Text,Button, Icon,Input } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 
import { Camera } from 'expo-camera';

export default class CameraPic extends React.Component{

    state={
        hasPermission:null,
        type:Camera.Constants.Type.front,
        photo:null,
        reset:false,
    }

    setHasPermission = (newV)=>{
        this.setState({hasPermission:newV})
    }

    componentDidMount = async ()=>{
        
        const { status } = await Camera.requestPermissionsAsync();
        this.setHasPermission(status === 'granted');
            
          
    }

    setType = (newV)=>{
        this.setState({type:newV});
    }

    

    takePictureButtonPressed = async ()=>{
        const {onTakePic} = this.props;
        if (this._cameraInstance) {
            // console.log('')
      
            const photo = await this._cameraInstance.takePictureAsync( {quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true })
      
            this.setState({ photo })
            onTakePic(photo)
        }
    }
 


    render(){
        
        const {hasPermission,type,photo,reset} = this.state
        const {big} = this.props;

        
            if(photo && !big){
                return ( <Layout style={(big)?styles.BigCircle:styles.circle}>
                    <Image style={styles.photo} source={photo}  />
                </Layout>)
            }
    
            if(hasPermission) {
                
                return(
                    <Layout style={(big)?styles.BigCircle:styles.circle} >
                        <Camera style={(big)?styles.BigCircle:styles.circle} type={type} ref={ref => (this._cameraInstance = ref)} >
                            <Layout
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                    alignItems:'center',
                                    justifyContent:'center'
    
                                }}>
                                    <TouchableOpacity
                                        style={{
                                        flex: 0.4,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                        justifyContent:'center'
                                        }}
                                        onPress={this.takePictureButtonPressed}>
                                        
                                    <Icon name='camera-outline' width={50} height={50} fill='#DBFDFA'  />
                            </TouchableOpacity>
                                
                        </Layout>
                    </Camera>
                    </Layout>
                )
            } else {
    
                return(
                    <Layout style={styles.container}>
                        
                        <Text style={styles.title} category='h3'>Permission to access Camera was denied</Text>
                        
                    </Layout>
                )
    
            }
        

        

    }

}

const styles = StyleSheet.create({

    container:{
        
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:appTheme['color-primary-100'],
    }, 
    title:{
        textAlign:'center'
    },
    photo:{
        width:'100%',
        height:'100%'
       
    },
    circle:{
        alignSelf: 'center',
        borderRadius: (Dimensions.get('window').width * 0.5)/2,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        backgroundColor:'#f00',
        
        overflow: 'hidden',
        
        
    },
    BigCircle:{
        alignSelf: 'center',
        
        width: "100%" ,
        height: 400 ,
       
        
        
        
        
    }
})