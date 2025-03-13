import "react";

declare global {
  interface Window {
    __NEXT_DATA__: any;
  }
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-cy"?: string;
  }
}
