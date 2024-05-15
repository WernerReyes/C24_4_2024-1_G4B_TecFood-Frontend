import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getEnvs } from "@/presentation/utilities";
import { useAuthStore } from "@/presentation/hooks";
import { RoleEnum } from "@/domain/entities";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/presentation/routes";

const { VITE_GOOGLE_CLIENT_ID } = getEnvs();

type GoogleResponse = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

export const GoogleAuth = () => {
  const navigate = useNavigate();
  const { startGoogleLoginUser } = useAuthStore();

  const handleGoogleLogin = async (response: CredentialResponse) => {
    const data = jwtDecode(response.credential as string) as GoogleResponse;
    await startGoogleLoginUser({
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
      imgUrl: data.picture,
      isGoogleAccount: true,
      isEmailVerified: data.email_verified,
      role: RoleEnum.ROLE_USER,
    });
    navigate(PrivateRoutes.USER);
  };

  const handleFailure = () => console.log("Failed to login");

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
