import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../../constants/styles";
import WelcomeScreen from "../WelcomeScreen";
import IconButton from "../../components/ui/IconButton";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const Stack = createNativeStackNavigator();

export function AuthenticatedStack() {
	const authCtx = useContext(AuthContext);

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon="exit"
							color={tintColor}
							size={24}
							onPress={authCtx.logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}
