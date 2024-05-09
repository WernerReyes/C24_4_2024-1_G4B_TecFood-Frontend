import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../../layout";
import { Button, InputPassword, InputText } from "@/presentation/components";
import { loginUserDto } from "@/domain/dtos";
import { SonnerManager } from "@/presentation/utilities";
import { useTheme, useAuthStore } from "@/presentation/hooks";

type LoginFields = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { isDark } = useTheme();
  const { isLoading, message, clearMessages, startLoginUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginUserDto),
  });

  useEffect(() => {
    if (message) {
      SonnerManager.success(message);
      clearMessages();
    }
  }, [message]);

  const handleLogin: SubmitHandler<LoginFields> = (data) =>
    startLoginUser(data);

  return (
    <AuthLayout
      title="Inicia sesión"
      label="¿No tienes una cuenta?"
      link="/register"
      labelLink="Regístrate"
      showGoogleAuth
      isDark={isDark}
    >
      <form
        className="mt-4 flex flex-col space-y-4"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputText
              {...field}
              label="Correo Electrónico"
              placeholder="Ingresa tu email"
              error={errors[field.name]?.message}
              className="border-2 border-primary bg-transparent py-3 text-sm"
              showAlertError
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputPassword
              {...field}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              error={errors[field.name]?.message}
              inputClassName="border-2 border-primary text-sm py-3 bg-transparent"
              showAlertError
            />
          )}
        />

        <Button
          type="submit"
          label="Iniciar Sesión"
          className="mt-5 w-full rounded-md dark:text-slate-100"
          disabled={Object.keys(errors).length > 0}
          isLoading={isLoading}
        />
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
