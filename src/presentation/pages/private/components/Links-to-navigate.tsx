import clsx from "clsx";
import { useMatch } from "react-router-dom";
import { Link } from "@/presentation/components";


type Props = {
    links: { label: string; url: string }[];
    className?: string;
};
  
export const LinksToNavigate = ({ links, className }: Props) => {
  return (
    <>
    {links.map((link, i) => {
        const match = useMatch(link.url);
        return (
         <li key={i} className={clsx("list-none",className)}>
          <Link
            key={i}
            to={link.url}
            className={clsx(
              "block text-[15px] font-semibold hover:text-primary",
              match ? "text-primary" : "text-[#333] dark:text-white",
            )}
          >
            {link.label}
          </Link>
          </li>
        );
      })}
    </>
  )
}
