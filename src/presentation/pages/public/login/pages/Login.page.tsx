import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginUserDto } from "@/domain/dtos";
import { TypeMessage } from "@/infraestructure/store";
import { loginUserValidation } from "@/infraestructure/validations";
import { Button, InputPassword, InputText } from "@/presentation/components";
import { useAuthStore, useMessage, useTheme } from "@/presentation/hooks";
import { PrivateRoutes, PublicRoutes } from "@/presentation/routes";
import { fromObjectToArray } from "@/presentation/utilities";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../layout";

export const LoginPage = () => {
  const { isDark } = useTheme();
  const { isLoading, startLoginUser } = useAuthStore();
  const { startSetMessages } = useMessage();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>({
    resolver: zodResolver(loginUserValidation),
  });

  const handleLogin: SubmitHandler<LoginUserDto> = async (data) => {
    await startLoginUser(data);
    navigate(PrivateRoutes.USER);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const messages = fromObjectToArray(errors).map((error) => error.message);
      startSetMessages(messages as string[], TypeMessage.ERROR);
    }
  }, [errors]);

  return (
    <AuthLayout
      title="Inicia sesión"
      label="¿No tienes una cuenta?"
      link={PublicRoutes.REGISTER}
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
              type="email"
              label="Correo Electrónico"
              placeholder="Ingresa tu email"
              error={!!errors[field.name]?.message}
              className="border-2 border-primary bg-transparent py-3 text-sm"
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
              error={!!errors[field.name]?.message}
              inputClassName="border-2 border-primary text-sm py-3 bg-transparent"
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
