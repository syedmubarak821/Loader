import * as React from 'react';
import { Appbar,Text } from 'react-native-paper';
import { useTheme,Avatar,Button,TextInput } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Snackbar from "react-native-snackbar"
import { getDriver, updateDriver } from '../src/services/driver_service';

const EditProfile = ({navigation}) => {
    const [text, setText] = React.useState("");
    const [driver, setDriver] = React.useState();
    React.useEffect(()=>{
        getDriver(global.id).then((response)=>{
            setDriver((response.data));
            console.log(response.data);
            setText(response.data.userName);
        })
        .catch((err)=>{
            if(err.response){
                console.log(er.response);
            }
            else if(err.request){
                console.log(err.request);
            }
            else {
                console.log(err);
            }
        }) ;
    },[])
    edit=()=>{
        driver.userName=text;
        updateDriver(driver).then((response)=>{
            Snackbar.show({
                text: "Successfully Updated\nPlease Sign In Again",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'close',
                  textColor: 'green',
                  onPress: () => { /* Do something. */ },
                },
              });
            navigation.navigate('login')
        })
        .catch((err)=>{
            if(err.response){
                console.log(er.response);
            }
            else if(err.request){
                console.log(err.request);
            }
            else {
                console.log(err);
            }
        }) ;;
    }
    return (
        <View style={tw`h-full bg-gray-400 pt-5`}>
          <TouchableOpacity
            style={tw`flex-initial `}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={require('../screen/pictures/left.png')}></Image>
          </TouchableOpacity>
          <Text
            style={tw`text-center text-white text-xl font-extrabold underline uppercase mb-10`}
          >
            Edit Profile
          </Text>
      
          {driver && (
            <>
              <View style={[tw`flex-row items-center mb-2`, {}]}>
                <Text style={tw`font-bold underline text-lg ml-10`}>Name:</Text>
                <TextInput
                  style={[
                    tw`rounded-2xl rounded-t-2xl ml-2 text-center text-white bg-white px-10 `,
                    {},
                  ]}
                  underlineColor='transparent'
                  placeholder='Username'
                  placeholderTextColor={'black'}
                  label=''
                  value={text}
                  onChangeText={(text) => setText(text)}
                />
              </View>
      
              <View style={[tw`flex-row items-center mb-2`, {}]}>
                <Text style={tw`font-bold underline text-lg ml-10`}>
                  Vehicle Allotted:
                </Text>
                <Text style={tw`text-base ml-2`}>{driver.vehicle.plateNo}</Text>
              </View>
      
              <View style={[tw`flex-row items-center mb-2`, {}]}>
                <Text style={tw`font-bold underline text-lg ml-10`}>
                  Vehicle Type:
                </Text>
                <Text style={tw`text-base uppercase ml-2`}>
                  {driver.vehicle.vtype.typeName}
                </Text>
              </View>
      
              <View style={[tw`flex-row items-center mb-2`, {}]}>
                <Text style={tw`font-bold underline text-lg ml-10`}>
                  Experience:
                </Text>
                <Text style={tw`text-base uppercase ml-2`}>
                  {driver.yearsOfExperience}
                </Text>
              </View>
      
              <Button
                style={tw`bg-pink-700 m-10 mt-20`}
                mode="contained"
                onPress={() => edit()}
              >
                Update
              </Button>
            </>
          )}
        </View>
      );
      
};

const Styles=StyleSheet.create({
    imag:{
        marginLeft: 180,
        marginBottom: 40, 
    },
    btn:{
        width:300,
        marginLeft: 90,
        marginTop: 40,
    },
    txt:{
        width: 200,
        paddingBottom:8,
        height: 10,
    },
})

export default EditProfile;