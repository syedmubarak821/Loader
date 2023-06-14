
import React, { useState } from "react";
import {View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import Snackbar from "react-native-snackbar";
import { updatePrice } from '../src/services/price_services';
import tw from "tailwind-react-native-classnames";
import { getDriver, getVehicle, updateDriver, updateVehicle } from "../src/services/driver_service";
import { NavigationContainer, useRoute } from '@react-navigation/native';

export default Orders = ({navigation}) =>{
    const [foodCost, setFoodCost] = useState('');
    const [fuelCost, setFuelCost] = useState('');
    const [vehicleMaintenanceCost, setVehicleMaintenanceCost] = useState('');
    const [driver, setDriver] = useState();
    const [vehicle, setvehicle] = useState();

    React.useEffect(()=>{
        getDriver(global.id).then(response => {
            setDriver(response.data);
        })
        .catch(error => {
            console.log(error);
            Snackbar.show({
                text: 'Error updating price',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'Error',
                  textColor: 'red',
                },
            });
        });
        getVehicle(global.vid).then(response => {
            
            setvehicle(response.data);
            setFuelCost(parseInt(response.data.fuelCost)+parseInt(fuelCost));
            setVehicleMaintenanceCost(parseInt(response.data.maintenanceCost)+parseInt(vehicleMaintenanceCost));
        })
        .catch(error => {
            console.log(error);
        });
    },[])
    const handleUpdatePrice = () => {
        driver.foodCost=parseInt(driver.foodCost)+parseInt(foodCost);

        updateDriver(driver)
            .then(response => {
                vehicle.maintenanceCost=vehicleMaintenanceCost;
                vehicle.fuelCost=fuelCost;
                updateVehicle(vehicle).then(response => {
                    Snackbar.show({
                        text: 'Expense Updated',
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                        text: 'Close',
                        textColor: 'green',
                        },
                    });
                })
                .catch(error => {
                    console.log(error);
                    Snackbar.show({
                        text: 'Error updating price',
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                        text: 'Error',
                        textColor: 'red',
                        },
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
            
    };

    return(
        <View style={tw`h-full bg-gray-400 pt-5`}>
            <TouchableOpacity style={tw`flex-initial `} onPress={() => navigation.openDrawer()} >
                <Image source={require('../screen/pictures/left.png')}></Image>
            </TouchableOpacity>
            <Text style={tw`text-center text-white text-xl font-extrabold underline uppercase mb-10`}>Trip Expense</Text>
            <TextInput
                    style={tw`rounded-full drop-shadow-none mx-10 mb-5 text-center bg-white`} 
                    placeholder=''
                    underlineColor="transparent"
                    keyboardType="number-pad"
                    label='Food Cost'
                    value={foodCost}
                    onChangeText={value => setFoodCost(value)}
                    />
            <TextInput
                    style={tw`rounded-full drop-shadow-none mx-10 mb-5 text-center bg-white`} 
                    keyboardType="number-pad"
                    keyboardType="number-pad"
                    placeholder=''
                    underlineColor="transparent"
                    label='Fuel Cost'
                    value={fuelCost}
                    onChangeText={value => setFuelCost(value)}
            />
            <TextInput
                    style={tw`rounded-full drop-shadow-none mx-10 text-center bg-white`} 
                    keyboardType="number-pad"
                    placeholder=''
                    underlineColor="transparent"
                    label='Vehicle Maintenance Cost'
                    value={vehicleMaintenanceCost}
                    onChangeText={value => setVehicleMaintenanceCost(value)}
            />
            
            <Button style={tw`bg-pink-700 m-10 mt-20`}
          mode="contained" onPress={()=>handleUpdatePrice()}>Update Expense</Button>

        </View>
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
})