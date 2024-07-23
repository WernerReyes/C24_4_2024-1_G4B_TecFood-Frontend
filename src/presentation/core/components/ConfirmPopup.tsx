import {
  type ConfirmPopupProps,
  confirmPopup as confirmPopupPrimeReact,
  ConfirmPopup as ConfirmPopupPrimeReact,
} from "primereact/confirmpopup";

const DEFAULT_PROPS: ConfirmPopupProps = {
  message: "Are you sure do you want to proceed?",
  icon: "pi pi-exclamation-triangle",
  defaultFocus: "reject",
};

interface Props extends ConfirmPopupProps {}

export const ConfirmPopup = ({ ...props }: Props) => {
  return (
    <ConfirmPopupPrimeReact
      {...props}
      pt={{
        ...props.pt,
        rejectButton: {
          root: {
            className:
              "px-3 py-2 me-1 text-primary hover:bg-slate-100 dark:hover:bg-slate-700",
          },
        },
        acceptButton: {
          root: {
            className:
              "px-3 py-2 ml-1 text-white dark:text-black bg-primary hover:bg-primary",
          },
        },
      }}
    />
  );
};

export const confirmPopup = ({
  isDefault,
  ...props
}: { isDefault?: boolean } & Props = {}) => {
  if (isDefault) {
    return confirmPopupPrimeReact({ ...DEFAULT_PROPS, ...props });
  }
  confirmPopupPrimeReact({ ...props });
};
