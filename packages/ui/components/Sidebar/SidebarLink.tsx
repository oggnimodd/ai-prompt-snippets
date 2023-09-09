import React from "react";
import clsx from "clsx";
import { Link } from "../Link";
import type { LinkProps } from "../Link";

export interface SidebarLinkProps extends LinkProps {
  onClick?: () => void;
  children: string;
  isActive?: boolean;
  icon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  onClick = () => {},
  children,
  icon,
  isActive,
  ...restLinkProps
}) => {
  return (
    <Link
      className={clsx(
        "mb-2 flex w-full items-center gap-x-4 rounded-md py-2 px-3 hover:bg-primary-300/30 dark:hover:bg-primary-300/10",
        isActive && "bg-primary-300/30 dark:bg-primary-300/10",
      )}
      onClick={onClick}
      {...restLinkProps}
    >
      <span className="text-xl text-primary-500">{icon}</span>
      {children}
    </Link>
  );
};

export default SidebarLink;
