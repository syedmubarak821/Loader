import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { getDriver } from '../src/services/driver_service';
import { Route } from 'react-router-dom';
import tw from 'tailwind-react-native-classnames';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { NavigationContainer, useRoute } from '@react-navigation/native';


export default function Home({ navigation }) {
  const [driver, setDriver] = React.useState([]);
  const route=useRoute();
  const [id, setDriverId] = React.useState(route.params.id);
  global.id=id;
  React.useEffect(() => {
    getdriver();
  }, []);
  
  const getdriver = () => {
    getDriver(id)
      .then((response) => {
        //console.log(response.data);
        setDriver(response.data);
        global.vid=response.data.vehicle.vehicleId; 
        global.id=response.data.id
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error");
          setError(err.response.data.msg);
        } else if (err.request) {
            console.log("Error");
            console.log(err.request);
        } else {
            console.log("Error");
          console.log(err.message);
        }
      });
  };
  

  return (
    <View style={[tw`h-full bg-gray-400`,{ }]}>
      <View style={[tw`h-1/4 pt-5`,{ }]}>
        <TouchableOpacity style={tw`flex-initial `} onPress={() => navigation.openDrawer()} >
            <Image source={require('../screen/pictures/left.png')}></Image>
        </TouchableOpacity>
        <View style={[tw``,{ }]}>
          <Text style = {[tw`text-center text-2xl font-extrabold text-white`,{ }]}>Profile</Text>
          {/* <Image style = {[tw`h-1/3`,{resizeMode: 'cover',width: responsiveWidth(100) }]}/> */}
        </View>
      </View>

      <View style={[tw`h-3/4 `,{ }]}>

        <View style={[tw`flex-row items-center mb-2 `,{ }]}>
          <Text style={tw`font-bold underline text-lg ml-10`}>Name:</Text>
          <Text style={tw`text-base uppercase ml-2`}>{driver.userName}</Text>
        </View>

        <View style={[tw`flex-row items-center mb-2`,{ }]}>
          <Text style={tw`font-bold underline text-lg ml-10`}>Vehicle Allotted:</Text>
          <Text style={tw`text-base uppercase ml-2`}>{driver.vehicle!=null ? (driver.vehicle.plateNo):'Vehicle not Alloted'}</Text>
        </View>

        <View style={[tw`flex-row items-center mb-2`,{ }]}>
          <Text style={tw`font-bold underline text-lg ml-10`}>Vehicle Type:</Text>
          <Text style={tw`text-base uppercase ml-2`}> {driver.vehicle!=null ? (driver.vehicle.name):'No Vehicle Alloted to driver'}</Text>
        </View>

        <View style={[tw`flex-row items-center mb-2`,{ }]}>
          <Text style={tw`font-bold underline text-lg ml-10`}>License:</Text>
          <Text style={tw`text-base uppercase ml-2`}>{driver.licenseNumber}</Text>
        </View>

        <View style={[tw`flex-row items-center mb-2`,{ }]}>
          <Text style={tw`font-bold underline text-lg ml-10`}>Experience:</Text>
          <Text style={tw`text-base uppercase ml-2`}>{driver.yearsOfExperience}</Text>
        </View>
       
        <Button
          style={tw`bg-pink-700 m-10 mt-20`}
          mode="contained"
          onPress={() => navigation.navigate('View Orders',{
            id: driver.id,
          })}>
          <Text style={tw`text-white`}>View Orders</Text>
        </Button>
      </View>
      
    </View>
  );
}

const Styles = StyleSheet.create({
  imag: {
    marginLeft: 180,
    marginBottom: 40,
  },
  btn: {
    width: 300,
    marginLeft: 90,
    marginTop: 40,
  },
});