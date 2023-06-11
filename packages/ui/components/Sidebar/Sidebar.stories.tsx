import Sidebar from "./Sidebar";
import { Button } from "../Button";
import { HeaderContainer } from "../Header";
import { useState } from "react";
import SidebarLink from "./SidebarLink";
import { AiFillCamera, AiFillFacebook, AiFillCompass } from "react-icons/ai";
import clsx from "clsx";

export const Default = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="relative flex w-full overflow-hidden">
      <Sidebar setOpen={setOpen} open={open}>
        <SidebarLink
          icon={<AiFillCamera />}
          to="https://www.google.com/"
          onClick={close}
          target="_blank"
        >
          Dashboard
        </SidebarLink>
        <SidebarLink
          icon={<AiFillFacebook />}
          to="https://www.google.com/"
          onClick={close}
          target="_blank"
        >
          Products
        </SidebarLink>
        <SidebarLink
          icon={<AiFillCompass />}
          to="https://www.google.com/"
          onClick={close}
          target="_blank"
        >
          Cart
        </SidebarLink>
      </Sidebar>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-transparent">
        <HeaderContainer>Hello World</HeaderContainer>
        <div className="mt-16 flex p-2">
          <Button
            className={clsx("ml-auto", open && "pointer-events-none")}
            onClick={() => setOpen(!open)}
          >
            Toggle Sidebar
          </Button>
        </div>
      </div>
    </div>
  );
};

Default.meta = { iframed: true };
