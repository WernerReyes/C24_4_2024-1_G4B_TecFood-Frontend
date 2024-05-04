import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../../layout";
import { Button, InputPassword, InputText } from "@/presentation/components";
import { registerUserDto } from "@/domain/dtos";
import { SonnerManager } from "@/utilities";
import { useTheme, useAuthStore } from "@/presentation/hooks";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { isDark } = useTheme();
  const { startRegisteringUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(registerUserDto),
  });

  const handleLogin: SubmitHandler<LoginForm> = (data) => {
    SonnerManager.success("Inicio de sesión exitoso");
  };

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
              panelClassName="dark:bg-[#1e293b] dark:text-slate-300 text-xs p-4"
              showAlertError
            />
          )}
        />
        <Button
          type="submit"
          label="Iniciar Sesión"
          className="mt-5 w-full rounded-md dark:text-slate-100"
          disabled={Object.keys(errors).length > 0}
        />

      </form>
    </AuthLayout>
  );
};

export default LoginPage;


