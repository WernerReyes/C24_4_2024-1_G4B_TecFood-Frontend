import { Dialog } from "@/presentation/core/components";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: JSX.Element[] | JSX.Element;
};

const BREAK_POINTS = {
  "960px": "75vw",
  "641px": "100vw",
};

export const HeaderSearchLayout = ({ visible, setVisible, children }: Props) => {
  return (
    <Dialog
      maximizable
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      style={{ width: "50vw" }}
      footer={footer}
      breakpoints={BREAK_POINTS}
    >
      {children}
    </Dialog>
  );
};

const footer = (
  <div className="flex border-t-2 pt-3 dark:border-slate-700">
    <span className="flex me-3 items-center text-[10px] font-bold">
      <i className="pi pi-arrow-down inline bg-slate-100 text-xs p-[0.1rem] me-1 dark:bg-slate-700"></i>{" "}
      <i className="pi pi-arrow-up inline bg-slate-100 text-xs p-[0.1rem] me-1 dark:bg-slate-700"></i>{" "}
      to navigate
    </span>
    <span className="me-3 inline text-[10px] font-bold">
      <p className="inline bg-slate-100 p-[0.1rem] dark:bg-slate-700">ESC</p> to
      close
    </span>
    <span className="me-3 inline text-[10px] font-bold">
      <p className="inline bg-slate-100 p-[0.1rem] dark:bg-slate-700">ENTER</p>{" "}
      to search
    </span>
  </div>
);
