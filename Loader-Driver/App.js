import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import About from './screen/about';
import Home from './screen/home';
// import confirmOrder from './screen/confirmOrder';
import EditProfile from './screen/editProfile';
import ViewOrder from './screen/viewOrder';
import reviewDetails from './screen/reviewDetails';
import ExpenseReport from './screen/expenseReport';
import Login from './screen/Login'
import tw from 'tailwind-react-native-classnames';
import Review from './screen/Review';


const Drawer = createDrawerNavigator();
global.id='';
function App() {
  

    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Drawer.Navigator style={tw`text-white`} screenOptions={{
              drawerStyle: { backgroundColor: 'white' },
              drawerPosition: 'left',
              headerStyle: {backgroundColor: '#d9b3ff'},
              headerShown: false,
              fontWeight: 'bold',
              
              }} initialRouteName="login" drawerContent={props => {
                return (
                  <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" style={tw`bg-pink-700 mt-20`} onPress={() => props.navigation.navigate("login")} />
                  </DrawerContentScrollView>
                )
              }}>
          <Drawer.Screen name="login" component={Login} options={{
                  drawerItemStyle: { height: 0 },drawerLockMode: 'locked-closed',gestureEnabled: false,
                  swipeEnabled: false,
                  }}/>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Edit Profile" component={EditProfile} />
            <Drawer.Screen
              name="View Orders"
              component={ViewOrder}
              initialParams={{ id: id }}
            />
            <Drawer.Screen
              name="Expense Update"
              component={ExpenseReport}
            />
            
            {/* <Drawer.Screen
              name="Confirm Order"
              component={confirmOrder}
              options={{ drawerLabel: () => null, title: null, drawerIcon: () => null }}
            /> */}
            <Drawer.Screen
              name="Review Details"
              component={reviewDetails}
              options={{
                drawerItemStyle: { height: 0 }
                }}
            />
            <Drawer.Screen
              name="Review"
              component={Review}
              options={{
                drawerItemStyle: { height: 0 }
                }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  abc: {
    backgroundColor: 'red',
  },
});

export default App;
