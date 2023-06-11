import HeaderIconButton from "./HeaderIconButton";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { useFullscreen } from "../../hooks";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";

export const Default = () => {
  const { fullscreen, toggle } = useFullscreen();

  return (
    <div className="flex gap-x-4">
      <HeaderIconButton
        onClick={toggle}
        icon={fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
      />

      <HeaderIconButton
        onClick={toggle}
        icon={fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
      />
    </div>
  );
};

export const CustomRender = () => {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-4">
      <HeaderIconButton
        component="a"
        href="https://www.google.com/"
        icon={<AiFillFacebook />}
      />
      <HeaderIconButton
        href={"https://www.google.com/"}
        component="a"
        icon={<AiFillGoogleCircle />}
      />
    </div>
  );
};
