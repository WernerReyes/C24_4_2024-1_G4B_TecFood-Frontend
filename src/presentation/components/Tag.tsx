import { TagProps, Tag as TagPrimeReact } from "primereact/tag";

interface Props extends TagProps {}

export const Tag = ({ ...props }: Props) => {
  return <TagPrimeReact {...props} />;
};
