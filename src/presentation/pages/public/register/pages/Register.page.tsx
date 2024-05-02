import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { AuthLayout } from "../../layout";
import { Button, InputPassword, InputText } from "@/presentation/components";
import { CreateUserDto } from "@/domain/dtos";
import { SonnerManager } from "@/utilities";
import { useTheme } from "@/presentation/hooks";

type RegisterFields = {
  email: string;
  password: string;
  name: string;
  lastname: string;
  dni: string;
  phone: string;
};

export const RegisterPage = () => {
  const { isDark } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>({
    resolver: zodResolver(CreateUserDto),
  });

  const handleRegister: SubmitHandler<RegisterFields> = (data) => {
    SonnerManager.success(data.name);
  };

  return (
    <AuthLayout
      title="Regístrate"
      label="¿Ya tienes una cuenta?"
      link="/login"
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
              toggleMask
              error={errors[field.name]?.message}
              inputClassName="border-2 border-primary text-sm py-3 bg-transparent"
              panelClassName="dark:bg-[#1e293b] dark:text-slate-300 text-xs p-4"
              showAlertError
            />
          )}
        />

        <div className={clsx("grid w-full gap-x-4", "sm:grid-cols-2")}>
          <Controller
            name="name"
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
            name="lastname"
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
                label="DNI"
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
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                {...field}
                label="Telefono"
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
        />
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
