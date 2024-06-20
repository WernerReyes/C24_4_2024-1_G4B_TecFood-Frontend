import {
  OverlayPanelProps,
  OverlayPanel as OverlayPanelPrimeReact,
} from "primereact/overlaypanel";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends OverlayPanelProps {}

export type OverlayPanelRef = {
  toggle(event: React.SyntheticEvent): void;
};

export const OverlayPanel = forwardRef<OverlayPanelRef, Props>((props, ref) => {
  const overlayPanelRef = useRef<OverlayPanelPrimeReact>(null);

  useImperativeHandle(ref, () => ({
    toggle(event) {
      overlayPanelRef.current?.toggle(event);
    },
  }));

  return <OverlayPanelPrimeReact {...props} ref={overlayPanelRef} pt={{
    closeButton: { className: "bg-primary text-white dark:text-black" },
  }} />;
});
