import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const authCtx = useContext(AuthContext);

	const loginHandler = async ({ email, password }) => {
		setIsAuthenticating(true);

		try {
			const token = await login(email, password);
			authCtx.authenticate(token);
		} catch (err) {
			Alert.alert(
				"Authentication failed!",
				"Could not log you in. Please check your credentials and try again later."
			);
			setIsAuthenticating(false);
		}
	};

	if (isAuthenticating) {
		return <LoadingOverlay message="Logging you in..." />;
	}
	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
