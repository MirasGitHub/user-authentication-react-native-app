import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../LoginScreen";
import SignupScreen from "../SignupScreen";
import { Colors } from "../../constants/styles";

const Stack = createNativeStackNavigator();

export function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}
