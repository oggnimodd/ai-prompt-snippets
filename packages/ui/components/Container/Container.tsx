import { cn } from "@ui/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-lg px-4 lg:px-5", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Container;
