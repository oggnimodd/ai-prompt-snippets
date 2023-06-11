import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface SkeletonProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  circle?: boolean;
  animationDuration?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  className,
  circle,
  animationDuration,
  ...rest
}) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (animationDuration && animationDuration > 0) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [animationDuration]);

  return (
    <div
      className={clsx(
        "flex w-full items-center justify-center rounded-xl bg-primary-200/50 dark:bg-background-300",
        circle && "h-full rounded-full",
        className,
        animate && "animate-pulse",
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Skeleton;
