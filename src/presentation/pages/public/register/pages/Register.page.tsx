import { useForm, SubmitHandler, Controller } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "sonner";
import {
  Button,
  Image,
  InputPassword,
  InputText,
  Link,
} from "@/presentation/components";
import { useTheme } from "@/presentation/hooks";
import { CreateUserDto } from "@/domain/dtos";
import { SonnerManager } from "@/utilities";

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
    SonnerManager.success("Hello world");
  };

  return (
    <div
      className={clsx(
        "flex h-full max-h-full min-h-screen w-full flex-col items-center justify-center",
        isDark ? "bg-gradient-primary-dark" : "bg-gradient-primary",
      )}
    >
      <Toaster position="top-center" />
      <div className="flex w-full justify-start">
        <Image src="/logo-dark.svg" width="100" className="ml-10 mb-4" />
      </div>
      <div
        className={clsx(
          "mx-10 w-full max-w-lg rounded-3xl bg-white p-10",
          "lg:mx-0",
        )}
      >
        <div className="flex justify-between">
          <span>Bienvenido</span>
          <div className="flex flex-col">
            <span className="text-sm">Tienes una cuenta?</span>
            <Link
              to="/login"
              className="text-sm text-primary"
              label="Iniciar Sesión"
              unstyled
            />
          </div>
        </div>
        <h2 className="text-4xl font-bold">Registro</h2>
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
                className="border-2 border-primary py-3 text-sm"
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
                inputClassName="border-2 border-primary text-sm py-3"
              />
            )}
          />

          <div className={clsx("grid w-full gap-x-2", "sm:grid-cols-2")}>
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
                    "border-2 border-primary py-3 text-sm",
                    "max-sm:mb-3",
                  )}
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
                  className="border-2 border-primary py-3 text-sm"
                />
              )}
            />
          </div>

          <div className={clsx("grid w-full gap-x-2", "sm:grid-cols-2")}>
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
                    "border-2 border-primary py-3 text-sm",
                    "max-sm:mb-3",
                  )}
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
                  placeholder="Ingresa tu numero de telefono"
                  error={errors[field.name]?.message}
                  className="border-2 border-primary py-3 text-sm"
                />
              )}
            />
          </div>

          <Button
            type="submit"
            label="Sign in"
            className="mt-5 w-full rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
