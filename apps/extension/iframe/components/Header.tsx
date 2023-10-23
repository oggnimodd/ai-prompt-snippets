import { Button } from "@nextui-org/react";
import {
  RefreshCcw as ReloadIcon,
  Settings as OptionsIcon,
  Github,
  Moon as DarkIcon,
  Sun as LightIcon,
  X as CloseIcon,
} from "lucide-react";
import { openOptionsPage } from "utils/chrome";
import { useTheme } from "shared/hooks";
import { messageIframeParent } from "utils/message";

const toggleIframe = () => {
  // Since this is an iframe , send the message to the parent window
  messageIframeParent<null>({
    type: "TOGGLE_IFRAME",
  });
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="py-2 flex w-full items-center mb-2">
      <div className="ml-auto gap-x-3 flex items-center">
        <Button
          startContent={
            theme === "dark" ? <DarkIcon size={16} /> : <LightIcon size={16} />
          }
          className="ml-auto"
          color="primary"
          isIconOnly
          onPress={toggleTheme}
          size="sm"
        />
        <Button
          startContent={<Github size={16} />}
          className="ml-auto"
          color="primary"
          isIconOnly
          as="a"
          href="https://github.com/oggnimodd/ai-prompt-snippets"
          target="_blank"
          size="sm"
        />
        <Button
          startContent={<OptionsIcon size={16} />}
          className="ml-auto"
          color="primary"
          isIconOnly
          data-cy="options-page-link"
          onClick={openOptionsPage}
          size="sm"
        />
        <Button
          onPress={() => window.location.reload()}
          startContent={<ReloadIcon size={16} />}
          className="ml-auto"
          color="primary"
          isIconOnly
          size="sm"
        />
        <Button
          onPress={toggleIframe}
          startContent={<CloseIcon size={16} />}
          className="ml-auto"
          color="danger"
          isIconOnly
          size="sm"
        />
      </div>
    </div>
  );
};

export default Header;
