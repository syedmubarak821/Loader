import React from "react";
import {View, StyleSheet} from 'react-native'
import { TextInput, Button, Text} from 'react-native-paper';
import Snackbar from "react-native-snackbar";
import tw from 'tailwind-react-native-classnames';
import { useRoute } from "@react-navigation/native";
import { getReview, addReview } from "../src/services/driver_service";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RatingProps } from "react-native-stock-star-rating";
import { responsiveWidth } from "react-native-responsive-dimensions";


export default Review = ({navigation}) =>{
    const route=useRoute();
    const [order,setOrder]=React.useState(route.params.order);
    const [review,setReview]=React.useState();
    const [rating,setRating]=React.useState(0);
    const [comment,setComment]=React.useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [check,setCheck]=React.useState(true);
    console.log("in review");
    const PostReview=()=>{
        order.rating=rating;
        order.comment=comment;
        addReview(order).then((response)=>{
            Snackbar.show({
                text: "Submitted the Review.",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'close',
                  textColor: 'green',
                  onPress: () => { /* Do something. */ },
                },
              });
            })
            .catch((err)=>{
                Snackbar.show({
                    text: "Already Reviewed.",
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                      text: 'close',
                      textColor: 'green',
                      onPress: () => { /* Do something. */ },
                    },
                  });
                  if(err.response){
                      Snackbar.show({
                          text: "Already Reviewed.",
                          duration: Snackbar.LENGTH_SHORT,
                          action: {
                            text: 'close',
                            textColor: 'green',
                            onPress: () => { /* Do something. */ },
                          },
                        });
                        console.log(err.response.data);
                    }
                    else if(err.request){
                        Snackbar.show({
                            text: "Already Reviewed.",
                            duration: Snackbar.LENGTH_SHORT,
                            action: {
                              text: 'close',
                              textColor: 'green',
                              onPress: () => { /* Do something. */ },
                            },
                          });
                        console.log(err.request);
        }
        else {
            console.log(err);
        }
        navigation.navigate('View Orders',{
            id: order.driver.id,
          })
    })    
    console.log(rating);
    }
    return(
        <View style={tw`bg-gray-400 h-full`}>
            <Text style={tw`text-center text-2xl font-mono font-extrabold text-white underline pb-0 my-5 `}>Driver Review</Text>
            <TextInput
                    style={tw`my-5 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center bg-white`}
                    underlineColor="transparent"
                    placeholder=''
                    value={order.orderId.toString()}
                    label='Enter Order ID'
            />
            <TextInput
                    style={tw`my-5 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center h-20 bg-white`}
                    underlineColor="transparent"
                    placeholder=''
                    label='Add Review'
                    onChangeText={value=>setComment(value)}
            />

            <View style= {[tw`flex-row mt-5 ml-20`,{width: responsiveWidth(100)}]}>
                {stars.map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <View style={styles.star}>
                        {star <= rating && <View style={styles.filledStar} />}
                    </View>
                    </TouchableOpacity>
                ))}
            </View>
            {
                check==true?(<Button style={tw` my-5 mx-20 bg-pink-700 text-white`} mode="contained" onPress={()=>{PostReview()}}>Submit</Button>):null
            }
            
            
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
    bigField: {
        margin: 20,
        height: 100
    },
    star: {
        margin: 2,
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#ffc107',
        justifyContent: 'center',
        alignItems: 'center',
      },
      filledStar: {
        width: 24,
        height: 24,
        backgroundColor: '#ffc107',
      },
})