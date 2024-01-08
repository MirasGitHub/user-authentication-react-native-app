import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import { AuthStack } from "./screens/stacks/AuthStack";
import { AuthenticatedStack } from "./screens/stacks/AuthenticatedStack";

function Navigation() {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

function Root() {
	const authCtx = useContext(AuthContext);

	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();

				const storedToken = await AsyncStorage.getItem("token");

				if (storedToken) {
					authCtx.authenticate(storedToken);
				}
				await new Promise((resolve) => setTimeout(resolve, 1000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	if (!appIsReady) {
		return null;
	}

	if (appIsReady) {
		SplashScreen.hideAsync();
		return <Navigation />;
	}
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
