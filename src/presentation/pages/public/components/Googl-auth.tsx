import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getEnvs } from "@/utilities";

const { VITE_GOOGLE_CLIENT_ID } = getEnvs();

export const GoogleAuth = () => {
  const handleGoogleLogin = (response: CredentialResponse) => {
    const data = jwtDecode(response.credential as string);
    console.log(data);
  };

  const handleFailure = () => {
    console.log("Failed to login");
  };

  return (
    <section className="flex justify-center">
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          size="large"
          shape="square"
          theme="filled_blue"
          onSuccess={handleGoogleLogin}
          onError={handleFailure}
        />
      </GoogleOAuthProvider>
    </section>
  );
};
