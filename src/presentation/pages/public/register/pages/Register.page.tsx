import { RegisterUserDto, registerUserDto } from "@/domain/dtos";
import { Button, InputPassword, InputText } from "@/presentation/components";
import { useAuthStore, useTheme } from "@/presentation/hooks";
import { SonnerManager } from "@/presentation/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthLayout } from "../../layout";
import { PublicRoutes } from "@/presentation/routes";

type RegisterFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
};

export const RegisterPage = () => {
  const { isDark } = useTheme();
  const { startRegisteringUser, clearMessages, message, isLoading } =
    useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerUserDto),
  });

  useEffect(() => {
    if (message) {
      SonnerManager.success(message);
      clearMessages();
    }
  }, [message]);

  const handleRegister: SubmitHandler<RegisterFields> = (data) => {
    startRegisteringUser(data as RegisterUserDto);
  };

  return (
    <AuthLayout
      title="Regístrate"
      label="¿Ya tienes una cuenta?"
      link={PublicRoutes.LOGIN}
      labelLink="Inicia sesión"
      showGoogleAuth
      isDark={isDark}
    >
      <form
        className="mt-4 flex flex-col space-y-4"
        onSubmit={handleSubmit(handleRegister)}
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

        <div className={clsx("grid w-full gap-x-4", "sm:grid-cols-2")}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                {...field}
                label="Nombres"
                placeholder="Ingresa tus nombres"
                error={errors[field.name]?.message}
                className={clsx(
                  "border-2 border-primary bg-transparent py-3 text-sm",
                  "max-sm:mb-3",
                )}
                showAlertError
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                {...field}
                label="Apellidos"
                placeholder="Ingresa tus nombres"
                error={errors[field.name]?.message}
                className="border-2 border-primary bg-transparent py-3 text-sm"
                showAlertError
              />
            )}
          />
        </div>

        <div className={clsx("grid w-full gap-x-4", "sm:grid-cols-2")}>
          <Controller
            name="dni"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                {...field}
                label="DNI (Optional)"
                placeholder="Ingresa tu DNI"
                error={errors[field.name]?.message}
                className={clsx(
                  "border-2 border-primary bg-transparent py-3 text-sm",
                  "max-sm:mb-4",
                )}
                showAlertError
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                {...field}
                label="Telefono (Optional)"
                placeholder="Ingresa telefono"
                error={errors[field.name]?.message}
                className="border-2 border-primary bg-transparent py-3 text-sm"
                showAlertError
              />
            )}
          />
        </div>

        <Button
          type="submit"
          label="Registrarse"
          className="mt-5 w-full rounded-md dark:text-slate-100"
          disabled={Object.keys(errors).length > 0}
          loading={isLoading}
        />
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
