import { ButtonProps } from "primereact/button";
import { Button } from "./Button";

interface Props extends ButtonProps {
  url: string;
  fileName: string;
}

export const DowloadFile = ({ url, fileName, ...props }: Props) => {
  const handleDownloadInvoice = () => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.pdf`);
        document.body.appendChild(link);
        link.click();
      });
  };

  return <Button {...props} type="button" onClick={handleDownloadInvoice} />;
};
