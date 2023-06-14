import { createStackNavigator } from "react-navigation-stack";

import About from "../screen/about";
const screens = {
    AboutStack: {
        screen: About,
        navigationOptions: {
            title: 'HomeStack',
        }
    },
}
const AboutStack= createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
}
    )
export default AboutStack;