import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  Image,
  InputText,
  InputTextarea,
  MultiSelect,
} from "@/presentation/core/components";
import {
  useDishStore,
  useNotificationStore,
  useUserStore,
  useWindowSize,
} from "@/presentation/hooks";
import { useEffect } from "react";
import { NotificationCard } from "../../../components";
import { SendNotificationRequest } from "@/domain/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertDateToShortString } from "@/presentation/utilities";
import { UserModel } from "@/model";
import { CategoryNotificationEnum } from "@/domain/entities/enums";
type Props = {
  openDialog: boolean;
  setOpenDialog: ({
    value,
    type,
  }: {
    value: boolean;
    type: "notification";
  }) => void;
};

export const NotificationDialog = ({ setOpenDialog, openDialog }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SendNotificationRequest>({
    resolver: zodResolver(SendNotificationRequest.schema),
  });
  const { width, sm, md } = useWindowSize();
  const { users, startLoadingUsers } = useUserStore();
  const { startSendingNotification } = useNotificationStore();
  const { dish, startLoadingEmptyDish } = useDishStore();

  const handleSaveAndNotify = (dataValidate: SendNotificationRequest) => {
    const sendNotificationRequest = new SendNotificationRequest(
      dataValidate.userIds,
      dataValidate.title,
      dataValidate.details,
      dataValidate.category,
      dataValidate.data,
    );
    startSendingNotification(sendNotificationRequest).then(() => {
      setOpenDialog({ value: false, type: "notification" });
    });
  };

  useEffect(() => {
    if (!openDialog) {
      reset();
      startLoadingEmptyDish();
    }
  }, [openDialog]);

  useEffect(() => {
    reset({
      data: dish,
      category: CategoryNotificationEnum.OFFER_DISH,
    });
  }, [dish]);

  useEffect(() => {
    startLoadingUsers();
  }, []);

  return (
    <Dialog
      visible={openDialog}
      style={{ width: width <= md ? "90vw" : "70vw" }}
      onHide={() => {
        if (!openDialog) return;
        setOpenDialog({ value: false, type: "notification" });
      }}
      header="Notification"
      className="w-96"
    >
      <div className="mx-auto max-w-xl">
        <h5 className="mb-2 font-bold dark:text-white">Result: </h5>
        <div className="rounded-lg border-2 p-3 dark:border-slate-700">
          <NotificationCard
            size={width <= sm ? "medium" : "large"}
            title={watch().title?.length ? watch().title : "Write a title"}
            details={
              watch().details?.length ? watch().details : "Write details"
            }
            imageUrl={dish.images[0]?.url}
            date={convertDateToShortString(new Date())}
            category={CategoryNotificationEnum.OFFER_DISH}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleSaveAndNotify)}
        className="mt-5 flex flex-col gap-4"
      >
        <Controller
          name="title"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              type="text"
              label="Title"
              title="Title"
              className={clsx(
                "w-full rounded-lg border-skeleton-darker p-2 dark:bg-slate-700 dark:text-white",
              )}
              error={!!error}
              smallDescription={error?.message}
              placeholder="Title"
            />
          )}
        />

        <Controller
          name="details"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputTextarea
              {...field}
              label="Details"
              title="Details"
              className={clsx(
                "w-full rounded-lg border-skeleton-darker p-2 dark:bg-slate-700 dark:text-white",
              )}
              error={!!error}
              smallDescription={error?.message}
              placeholder="Details"
            />
          )}
        />

        <Controller
          name="userIds"
          defaultValue={[]}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <MultiSelect
                {...field}
                inputMode="text"
                options={users}
                label="Users"
                optionLabel="name"
                optionValue="id"
                placeholder="Select users"
                display="comma"
                filter
                itemTemplate={(user: UserModel) => (
                  <div key={user.id} className="flex items-center">
                    <Image
                      alt={user.name}
                      src={user.img || "/user/no-profile.png"}
                      imageClassName="me-2 h-6 w-6 rounded-md"
                    />
                    <p>
                      {user.name} {user.lastname}
                    </p>
                  </div>
                )}
                error={!!error}
                smallDescription={error?.message}
                className={clsx(
                  "w-full rounded-lg border-skeleton-darker dark:bg-slate-700 dark:text-white",
                )}
              />
            );
          }}
        />

        <div className="mt-5 flex items-center justify-evenly gap-4">
          <Button
            type="submit"
            className="w-full"
            label="Send"
            icon="pi pi-send"
            disabled={!!Object.keys(errors).length}
          />
          <Button
            onClick={() => {
              reset();
            }}
            type="button"
            className="me-3 w-32 bg-primary-darker/20  text-primary shadow-sm transition-all duration-300"
            label="Reset"
            icon="pi pi-refresh"
          />
        </div>
      </form>
    </Dialog>
  );
};
