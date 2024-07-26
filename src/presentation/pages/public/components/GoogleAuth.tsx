import { LoginGoogleRequest } from "@/domain/dtos";
import { RoleEnum } from "@/domain/entities";
import { Button, Image } from "@/presentation/core/components";
import { useAuthStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import { getEnvs, routeRole, userGoogleInfo } from "@/presentation/utilities";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <section className="w-full">
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <CustomGoogleLogin />
      </GoogleOAuthProvider>
    </section>
  );
};

const CustomGoogleLogin = () => {
  const navigate = useNavigate();
  const { startLoginGoogle } = useAuthStore();
  const [isLoginGoogle, setIsLoadinGoogle] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoadinGoogle(true);
    login();
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await userGoogleInfo<GoogleResponse>(
        tokenResponse.access_token,
      );
      const loginGoogleRequest = new LoginGoogleRequest(
        userInfo.given_name,
        userInfo.family_name,
        userInfo.email,
        userInfo.picture,
        true,
        userInfo.email_verified,
        RoleEnum.ROLE_USER,
      );
      startLoginGoogle(loginGoogleRequest).then((role) => {
        navigate(PrivateRoutes[routeRole(role!)] as string);
      });
    },
    onError: (error) => console.log("Login Failed:", error),
    onNonOAuthError: () => setIsLoadinGoogle(false),
  });

  return (
    <Button
      unstyled
      onClick={handleGoogleLogin}
      isLoading={isLoginGoogle}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-center text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300"
    >
      <Image
        className="h-6 w-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </Button>
  );
};
