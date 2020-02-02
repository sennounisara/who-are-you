import React from 'react';
import { StyleSheet, Alert,KeyboardAvoidingView } from 'react-native';
import { Layout, Text,Button, Icon,Spinner } from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; 
import CameraPic from '../componenets/CameraPic';


export default class FaceReco extends React.Component{
    
    state={
        profilePic:null,
        loading:false,
        response:null,
        reset:false,
        firstStart:true,

    }

    onPic = (pic)=>{
        console.log('*********onPic*********')
        console.log(pic)
        
        const basePic = pic.base64;
        this.setState({profilePic:pic,loading:true,});
        fetch('https://www.betafaceapi.com/api/v2/media', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key:'d45fd466-51e2-4701-8da8-04351c872236',
            file_base64:basePic,
            detection_flags:'basicpoints,propoints,classifiers,content',
            
           
        })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            this.setState({
                response:responseJson,
                loading:false,
                firstStart:false,
            })
        })

    }

    onReset = ()=>{
        const {reset}=this.state;
        console.log(reset)
        const rerest = !reset ;
        this.setState({reset:rerest})
       
    }


    render(){
        const {loading,reset,response,firstStart} = this.state;
        const faces = (response!=null)?response.media.faces:null;
       console.log('faces is '+ faces);
        

        return (
            <Layout style={styles.container} >
                {(loading) && (
                    <Layout style={styles.spinner} >
                        <Spinner size='giant' status='danger'  />
                    </Layout>
                )}
                <CameraPic onTakePic={this.onPic} big={true} reset={reset} />
                {(faces != null ) && (
                    <Text style={styles.title}>
                        From Your picture we can tell that you are a {response.media.faces[0].tags[1].value} old {(response.media.faces[0].tags[3].value==='yes')?'yes':''} {response.media.faces[0].tags[18].value} and we think your race is {response.media.faces[0].tags[31].value} and that your expression is {response.media.faces[0].tags[17].value}
                    </Text>
                )}
                {(faces == null && !firstStart ) && (
                    <Text style={styles.title}>
                        Sorry we couldn't find any faces in the picture
                    </Text>
                )}
                 {(faces == null && firstStart ) && (
                    <Text style={styles.title}>
                        just take a pic and we will give it our best 
                    </Text>
                )}
                
                
                
            </Layout>
        )
            
        
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingTop:20,
        alignItems:'center',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:appTheme['color-primary-100'],
    }, 
    camera:{
        
        width:'100%',
        height:50,
    },
    spinner:{
        backgroundColor:appTheme['color-primary-transparent-100'],
        position:'absolute',
        top:'50%',
        zIndex:2,
        
    },
    reset:{
        margin:10,
    },
    title:{
        fontSize:20,
        fontStyle:'italic',
        fontWeight:'bold',
        padding:10,
        textAlign:'center'
    }
    

})