import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const FirstScreenComponent = () => <View><Text>First screen</Text></View>

const SecondScreenComponent = () => <View><Text>Sezcond screen</Text></View>

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="First screen" component={FirstScreenComponent} />
        <Stack.Screen name="Second screen" component={SecondScreenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;