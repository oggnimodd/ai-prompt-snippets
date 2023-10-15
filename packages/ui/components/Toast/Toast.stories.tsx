import Toast from "./Toast";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@nextui-org/react";

export const Default = () => {
  return (
    <div>
      <Toaster position="bottom-right" />
      <div>
        <Button onClick={() => toast.success("Hello World!")}>
          Show Toast
        </Button>
        <Button
          onClick={() =>
            toast.custom((t) => {
              return (
                <Toast
                  isClosable
                  onClose={() => toast.remove(t.id)}
                  variant="success"
                  description="Horay yo ha ja lalalala"
                />
              );
            })
          }
        >
          Show Toast
        </Button>
      </div>
    </div>
  );
};

export const Variants = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Toast
        variant="success"
        description="Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world"
        isClosable
        onClose={() => {}}
      />
      <Toast
        description="Hello world Hello world"
        isClosable
        onClose={() => {}}
        variant="error"
      />
    </div>
  );
};
