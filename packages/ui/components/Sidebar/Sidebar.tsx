import React, { useRef } from "react";
import clsx from "clsx";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { useOnClickOutside } from "../../hooks";
import { Brand } from "../Brand";
import { motion, AnimatePresence } from "framer-motion";

export interface SidebarProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((val: boolean) => void);
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  setOpen,
  open = false,
}) => {
  const close = () => setOpen(false);
  const sidebarRef = useRef(null);

  useOnClickOutside({
    ref: sidebarRef,
    handler: close,
  });

  const variants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          ref={sidebarRef}
          className={clsx(
            "fixed top-0 left-0 z-[999] min-h-screen min-w-[250px] flex-col bg-white px-4 shadow-2xl dark:bg-background-400 dark:shadow-xl sm:min-w-[300px]",
          )}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          {/* Header/Brand */}
          <div className="mb-4 flex items-center justify-between py-5">
            <Brand />
            <button
              className={
                "flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary-200/60 dark:hover:bg-background-200"
              }
              onClick={close}
            >
              <CloseIcon className="text-xl" />
            </button>
          </div>

          {/* Content/Links */}
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
