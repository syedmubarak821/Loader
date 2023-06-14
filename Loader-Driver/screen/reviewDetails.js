import React from "react";
import { useRoute } from '@react-navigation/native';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import MapScreen from "./maps"; 
import tw from "tailwind-react-native-classnames";
import { getClient, getOrders, updateOrderStatus } from '../src/services/driver_service';
import Snackbar from "react-native-snackbar";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../src/services/location_service';
import { SafeAreaView } from "react-native-safe-area-context";



export default Orders = ({navigation}) =>{
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const route=useRoute();
    const { order } = route.params;
    React.useEffect(() => {
        handleViewPickUp();
    }, []);
    const ConfirmOrder=()=>{
        navigation.navigate('Review',{order:order});
        updateOrderStatus(order).then(response => {
            console.log('Order Confirmed');
          })
          .catch(error => {
            // Handle error if needed
            console.error('Error sending location update:', error);
          });;
    }
    const handleViewPickUp = () => {
        let arr=order.pickUp.split(',');
        setLatitude(parseFloat(arr[0]));
        setLongitude(parseFloat(arr[1]));
        Snackbar.show({
          text: 'Showing Pick Up Location',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'close',
            textColor: 'green',
            onPress: () => { /* Do something. */ },
          },
        });
      };
      getEstimatedTime=()=>{
        return hoursDifference;
      }
      const handleViewDropOff = () => {
          let arr=order.dropOff.split(',');
          setLatitude(parseFloat(arr[0]));
          setLongitude(parseFloat(arr[1]));
        Snackbar.show({
          text: 'Showing Drop Off Location',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'close',
            textColor: 'green',
            onPress: () => { /* Do something. */ },
          },
        });
      };
    
    return(
        <SafeAreaView>
            <View style={tw`bg-gray-400`}>
            <View style={tw`h-1/2`}>
            <MapView
                style={styles.map}
                region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0412,
                }}
                onPress={(event) => updateLocation(event)}
            >
                <Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}
                title={'Marker Title'}
                />
            </MapView>
            </View>

            <View style={tw`h-1/2`}>
                <TouchableOpacity style={tw`flex-initial `} onPress={() => navigation.openDrawer()} >
                    <Image source={require('../screen/pictures/left.png')} ></Image>
                </TouchableOpacity>
                <Text style = {tw`text-center text-white font-semibold text-lg underline`}>Order ID: {order.orderId}</Text>
                <Text style = {tw`text-center text-white font-semibold text-lg mt-2 uppercase`}>Customer Name: {order.client.userName}</Text>
                
                {/* <TextInput
                        style={styles.container} 
                        placeholder=''
                        label={order.orderId}
                /> */}
                
                <Text style={tw`text-center text-lg font-semibold text-white mb-2 mt-2`}>Delivery Date</Text>
                <TextInput style={tw`bg-white text-center mx-10 rounded-3xl`} underlineColor="transparent" disabled= 'true' >
                    {order.status.status!="pending" ? (<Text style={tw`text-black `}>Pending</Text>):null}
                    {order.status.status=="delivered" ? (<Text style={tw`text-black `}>Order Delivered</Text>):null}
                    {order.status.status=="active" ? (<Text style={tw`text-black `}>{new Date(order.estimatedArrivalOfGoods).toLocaleDateString()}</Text>):null}
                </TextInput>
                {order.status.status=="active" ? (
                    <Button style={tw`bg-pink-700 mt-5 mx-20`} mode="contained" onPress={()=>{
                        ConfirmOrder();
                        Snackbar.show({
                            text: 'Delivery Complete',
                            duration: Snackbar.LENGTH_SHORT,
                            action: {
                              text: 'close',
                              textColor: 'green',
                              onPress: () => { /* Do something. */ },
                            },
                          });
                    }}>
                        Confrim Delivery
                    </Button>

                    ) : <Text style={tw`text-center text-lg font-bold text-white my-2`}>Order Status: {order.status.status}</Text>}
                

                    <Button style={tw`bg-pink-700 mt-5 mx-20`} mode="contained" onPress={()=>{
                            handleViewPickUp();
                            Snackbar.show({
                                text: 'Showing Pick Up Location',
                                duration: Snackbar.LENGTH_SHORT,
                                action: {
                                text: 'close',
                                textColor: 'green',
                                onPress: () => { /* Do something. */ },
                                },
                            });
                        }}>
                            View Pick Up
                    </Button>
                    <Button style={tw`bg-pink-700 my-5 mx-20`} mode="contained" onPress={()=>{
                            handleViewDropOff();
                            Snackbar.show({
                                text: 'Showing Drop Off Location',
                                duration: Snackbar.LENGTH_SHORT,
                                action: {
                                text: 'close',
                                textColor: 'green',
                                onPress: () => { /* Do something. */ },
                                },
                            });
                        }}>
                            View Drop Off
                    </Button>
                
            </View>
            
        </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container : {
        margin: 20
    },
    heading: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    btn:{
        width:300,
        marginLeft: 90,
        marginTop: 40,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})