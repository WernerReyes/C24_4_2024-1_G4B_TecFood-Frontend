import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserDto } from "@/domain/dtos";
import { Button, InputText } from "@/presentation/core/components";
import { useAuthStore, useUserStore } from "@/presentation/hooks";

export const ProfileForm = () => {
  const { authenticatedUser } = useAuthStore();
  const { startUpdatingUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserDto.schema),
  });

  const handleUpdateUser: SubmitHandler<UpdateUserDto> = async (data) => {
    await startUpdatingUser(data);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Controller
          name="firstName"
          control={control}
          defaultValue={authenticatedUser.name}
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              label="First Name"
              className="dark:border-skeleton-dark"
              placeholder="Enter your first name"
              error={!!error?.message}
              smallDescription={error?.message}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          defaultValue={authenticatedUser.lastname}
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              label="Last Name"
              className="dark:border-skeleton-dark"
              placeholder="Enter your last name"
              error={!!error?.message}
              smallDescription={error?.message}
            />
          )}
        />

        <InputText
          type="email"
          label="Email"
          disabled
          value={authenticatedUser.email}
          className="dark:border-skeleton-dark"
        />

        <Controller
          name="phoneNumber"
          control={control}
          defaultValue={authenticatedUser.phone || ""}
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              type="number"
              label="Phone number"
              className="dark:border-skeleton-dark"
              placeholder="Enter your phone number"
              error={!!error?.message}
              smallDescription={error?.message}
            />
          )}
        />

        <Controller
          name="dni"
          control={control}
          defaultValue={authenticatedUser.dni || ""}
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              label="Dni"
              error={!!error?.message}
              smallDescription={error?.message}
              className="dark:border-skeleton-dark"
              placeholder="Enter your Dni"
            />
          )}
        />
      </div>

      <Button
        type="submit"
        label="Save changes"
        className="me-auto mt-8 w-full max-w-48 rounded-md  dark:text-slate-100"
        disabled={Object.keys(errors).length > 0}
      />
    </form>
  );
};
