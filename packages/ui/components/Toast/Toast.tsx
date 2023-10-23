import { FC } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@ui/utils/cn";
import { Button } from "@nextui-org/react";
import { X as CloseIcon } from "lucide-react";

export const toast = tv({
  slots: {
    base: "max-w-sm w-full bg-white dark:bg-[#131315] shadow-lg rounded-lg pointer-events-auto flex items-center justify-between px-5 py-4 relative overflow-hidden gap-x-10",
    closeButton: "rounded-full",
    heading: "font-bold text-md capitalize",
    content: "text-default-500 text-sm line-clamp-2",
    line: "w-full absolute top-0 left-0 h-1",
  },
  variants: {
    variant: {
      success: {
        closeButton: "bg-success-400 text-white",
        line: "bg-success-400",
      },
      error: {
        closeButton: "bg-danger-400 text-white",
        line: "bg-danger-400",
      },
    },
  },
});

type ToastVariants = VariantProps<typeof toast>;

interface ToastProps extends ToastVariants {
  isClosable?: boolean;
  onClose?: () => void;
  description: string;
  className?: string;
}

const Toast: FC<ToastProps> = ({
  isClosable = false,
  description,
  onClose,
  className,
  variant = "success",
}) => {
  const { base, closeButton, heading, content, line } = toast({ variant });

  return (
    <div className={cn(base(), className)} data-cy="toast">
      <div className={line()} data-cy="toast-line" />
      <div className="flex flex-col gap-1">
        <p className={heading()} data-cy="toast-variant">
          {variant}
        </p>
        {description && (
          <p className={content()} data-cy="toast-description">
            {description}
          </p>
        )}
      </div>
      {isClosable && onClose && (
        <Button
          size="sm"
          className={closeButton()}
          startContent={<CloseIcon size={16} />}
          isIconOnly
          onPress={onClose}
          data-cy="close-button"
        />
      )}
    </div>
  );
};

export default Toast;
