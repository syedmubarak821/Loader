
import * as React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DataTable,Button } from 'react-native-paper';
import { getClient, getDriver, getOrders } from '../src/services/driver_service';
import tw from 'tailwind-react-native-classnames';
import Geolocation from 'react-native-geolocation-service'; // Assuming you're using react-native-geolocation-service
import { updateDriver } from '../src/services/driver_service';
import { requestLocationPermission } from '../src/services/location_service';

const ViewOrder = ({navigation}) => {
  const [orders, setOrders] = React.useState([]);
  const route=useRoute();
  const [driverId, setDriverId] = React.useState(route.params.id);
  const [driver, setDriver] = React.useState(route.params.id);
  //you need to configure driver in such a way that the orders should be displayed only of relevant drivers
  React.useEffect(() => {
    allorders();
  }, [driverId]);
  
  const [refreshing, setRefreshing] = React.useState(false);

    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        setTimeout(() => {
        setRefreshing(false);
        }, 60000);
    }, []);

  const getCurrentLocation = () => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log("Kaisy Ho:"+longitude)

        sendLocationUpdate(latitude, longitude); // Send location update to the server
      },
      error => {
        // Handle location retrieval error if needed
        console.error('Error getting current location:', error);
      },
      {
        enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, provider: Geolocation.PROVIDER_GPS
      }
    );
  };

  // Schedule periodic location updates using a timer
  const locationUpdateTimer = setInterval(() => {
    getCurrentLocation();
  }, 60000); // Update location every 8 sec (adjust the interval as needed)
  
  const sendLocationUpdate = (latitude, longitude) => {
    driver.location=latitude+','+longitude;
    updateDriver(driver).then(response => {
          // Handle success response if needed
          console.log('Location update sent successfully');
        })
        .catch(error => {
          // Handle error if needed
          console.error('Error sending location update:', error);
        });
    };

  React.useEffect(() => {
    getDriver(route.params.id).then((response)=>{
      setDriver(response.data);

    }).catch(error=>{
      console.log("first"+error);
    })
      }, []);




  const allorders = () => {
    getOrders().then((response) => {
      setOrders(response.data);
      
    }).catch((err) => {
      if(err.response){

        setError(err.response.data.msg)
      }
      else if (err.request){
        console.log(err.request);
      }
      else
        console.log(err.message);
    });
  };

  return (
    <ScrollView style={[tw`h-full bg-gray-400 pt-5`,{ }]} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
      <TouchableOpacity style={tw`flex-initial `} onPress={() => navigation.openDrawer()} >
                <Image source={require('../screen/pictures/left.png')}></Image>
            </TouchableOpacity>
      <Text style = {[tw`text-center text-2xl font-extrabold text-white underline m-3 mt-0`,{ }]}>Orders</Text>
      <DataTable style={tw`px-2`} >
        <DataTable.Header style = {[tw` bg-gray-700 `,{ }]}>
          <DataTable.Title style={tw``}><Text style={[tw`text-white   uppercase`,{}]}>Customer</Text></DataTable.Title>
          <DataTable.Title style={tw``} ><Text style={[tw`text-white text-center   uppercase`,{}]}>Order Status</Text></DataTable.Title>
          <DataTable.Title style={tw`pr-0 items-end`}><Text style={[tw`text-white text-center  font-semibold uppercase`,{}]}>Select Order</Text></DataTable.Title>
        </DataTable.Header>

        {orders.map((order, index) => (
          order.driver!=null?(order.driver.id==driverId ? (
            <DataTable.Row key={index}>
              <DataTable.Cell><Text style={[tw`text-white   uppercase`,{}]}>{order.client.userName}</Text></DataTable.Cell>
              <DataTable.Cell><Text style={[tw`text-white   uppercase`,{}]}>{order.status.status}</Text></DataTable.Cell>
              <DataTable.Cell style={tw`pr-0 `}><Button mode="contained" style={tw`bg-pink-700 `} onPress={() => navigation.navigate('Review Details',{
                order: order,
              })}>
               <Text style={[tw`text-white  uppercase`,{}]}>View</Text>
              </Button></DataTable.Cell>
            </DataTable.Row>) : null):null
          ))}
      </DataTable>
    </ScrollView>
    
  );
};

export default ViewOrder;