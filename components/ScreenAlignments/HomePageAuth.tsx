import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomepageScreen from '../Homescreen/Homepage';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={HomepageScreen} />
    </Stack.Navigator>
  );
}

