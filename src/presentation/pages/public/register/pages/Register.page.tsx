import { useEffect } from "react";
import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputPassword, InputText } from "@/presentation/components";
import {
  useAuthStore,
  useMessageStore,
  useThemeStore,
} from "@/presentation/hooks";
import { PublicRoutes } from "@/presentation/routes";
import { AuthLayout } from "../../layout";
import { fromObjectToArray } from "@/presentation/utilities";
import { RegisterDto } from "@/domain/dtos";

export const RegisterPage = () => {
  const { isDark } = useThemeStore();
  const { startSetMessages, typeError } = useMessageStore();
  const { startRegistering, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterDto.schema),
  });

  const handleRegister: SubmitHandler<RegisterDto> = (data) =>
    startRegistering(data);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const messages = fromObjectToArray(errors).map((error) => error.message);
      startSetMessages(messages as string[], typeError);
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
          render={({ field }) => (
            <InputText
              {...field}
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
                error={!!errors[field.name]?.message}
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
            render={({ field }) => (
              <InputText
                {...field}
                label="Apellidos"
                placeholder="Ingresa tus nombres"
                error={!!errors[field.name]?.message}
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
            render={({ field }) => (
              <InputText
                {...field}
                label="DNI (Optional)"
                placeholder="Ingresa tu DNI"
                error={!!errors[field.name]?.message}
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
            render={({ field }) => (
              <InputText
                {...field}
                label="Telefono (Optional)"
                placeholder="Ingresa telefono"
                error={!!errors[field.name]?.message}
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
