import { useEffect } from "react";
import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputPassword, InputText } from "@/presentation/core/components";
import {
  useAuthStore,
  useMessageStore,
  useThemeStore,
} from "@/presentation/hooks";
import { PublicRoutes } from "@/presentation/routes";
import { AuthLayout } from "../layout";
import { fromObjectToArray } from "@/presentation/utilities";
import { RegisterRequest } from "@/domain/dtos";

export const RegisterPage = () => {
  const { isDark } = useThemeStore();
  const { startSetMessagesError } = useMessageStore();
  const { startRegistering, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequest.schema),
  });

  const handleRegister: SubmitHandler<RegisterRequest> = (data) =>
    startRegistering(data);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const messages = fromObjectToArray(errors).map((error) => error.message)!;
      startSetMessagesError(messages as string[]);
    }
  }, [errors]);

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
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              label="Correo Electrónico"
              placeholder="Ingresa tu email"
              error={!!error?.message}
              className="border-2 border-primary bg-transparent py-3 text-sm"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputPassword
              {...field}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              error={!!error?.message}
              inputClassName="border-2 border-primary text-sm py-3 bg-transparent"
            />
          )}
        />

        <div className={clsx("grid w-full gap-x-4", "sm:grid-cols-2")}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <InputText
                {...field}
                label="Nombres"
                placeholder="Ingresa tus nombres"
                error={!!error?.message}
                className={clsx(
                  "border-2 border-primary bg-transparent py-3 text-sm",
                  "max-sm:mb-3",
                )}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <InputText
                {...field}
                label="Apellidos"
                placeholder="Ingresa tus nombres"
                error={!!error?.message}
                className="border-2 border-primary bg-transparent py-3 text-sm"
              />
            )}
          />
        </div>

        <div className={clsx("grid w-full gap-x-4", "sm:grid-cols-2")}>
          <Controller
            name="dni"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <InputText
                {...field}
                label="DNI (Optional)"
                placeholder="Ingresa tu DNI"
                error={!!error?.message}
                className={clsx(
                  "border-2 border-primary bg-transparent py-3 text-sm",
                  "max-sm:mb-4",
                )}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <InputText
                {...field}
                label="Telefono (Optional)"
                placeholder="Ingresa telefono"
                error={!!error?.message}
                className="border-2 border-primary bg-transparent py-3 text-sm"
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
