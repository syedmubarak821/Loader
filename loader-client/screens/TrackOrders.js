import React from "react";
import {View, StyleSheet, Image, TouchableOpacity,RefreshControl} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import tailwind from "twrnc";
import MapView, { Marker } from 'react-native-maps';
import { getDriver } from "../src/services/client_service";
import { Component } from 'react';
import { ScrollView } from "react-native-gesture-handler";


export default Orders = ({navigation}) =>{
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const route=useRoute();
    const [order,setOrder]=React.useState(route.params.order);
    const [driver,setDriver]=React.useState();
    const [refreshing, setRefreshing] = React.useState(false);

    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);
    componentDidMount=()=> {
        this.intervalId = setInterval(() => {
          this.forceUpdate(); // Refresh the component
        }, 5000);
      }
    
      componentWillUnmount=()=>{
        clearInterval(this.intervalId); // Clear the interval when the component is unmounted
      }
    
    React.useEffect(() => {
        getDriver(order.driver.id).then((response)=>{
            setDriver(response.data);
            arr=response.data.location.split(',');
            setLatitude(parseFloat(arr[0]));
            setLongitude(parseFloat(arr[1]));

        })
    .catch((err)=>{
        if(err.response){
            console.log(err.response.data);
        }
        else if(err.request){
            console.log(err.request);
        }
        else {
            console.log(err);
        }
        
    })  
    console.log(longitude);
    console.log(latitude); 
    }, []);


    return(
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
        <View style={tailwind`bg-pink-200 h-full`}>
            <View style={tailwind`h-1/3`}>
                <View style={tailwind`flex-row items-center mb-5`}>
                    
                    <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                        <Image source={require('../screens/pictures/left.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:0.4}}></View>
                    <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                        underline  `}>TRACK ORDER</Text>
                </View>
                <TextInput
                        style={tailwind`my-2 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center`} 
                        placeholder=''
                        label='Order ID'
                        underlineColor="transparent"
                        disabled={true}
                        value={order.orderId.toString()}
                />
                {/* <Button style={tailwind` my-5 mx-15 bg-amber-400 text-black`} mode="contained" onPress={()=>{}}>
                    <Text>Enter</Text>
                </Button> */}
            </View>
            <View style={tailwind`h-2/3`}>
                {/* <Image style={{width:500 , height:300}} 
                source={require('./pictures/map.png')} /> */}
            {longitude !== 0 && latitude !== 0 ? (
                <MapView
                style={styles.map}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00912,
                }}
                >
                <Marker
                    coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                    }}
                    title={"Marker Title"}
                    description={"Marker Description"}
                />
                </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}

                
                <Text style={tailwind`text-center font-bold text-lg mt-5`}>Estimated arrival time:</Text>
                {order.estimatedArrivalOfGoods!=null ? (
                    <TextInput disabled = 'true' 
                    style={tailwind`my-2 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center font-bold`} 
                    value={new Date(order.estimatedArrivalOfGoods).toLocaleDateString()}>
                    </TextInput>):(
                    <TextInput disabled = 'true' 
                    style={tailwind`my-2 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center font-bold`} 
                    value="Not Yet Scheduled">
                    </TextInput>)}
            </View>
        </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container : {
        margin: 10
    },
    heading: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttton: {
        width: 200,
        margin: 10,
        marginLeft: 90
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
    
})