import { FC } from "react";
import { Switch } from "@nextui-org/react";
import { useChatProviders } from "../../shared/hooks";

const getFaviconUrl = (url: string) => {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${url}&size=16`;
};

const Favicon = ({ url }: { url: string }) => {
  return (
    <img className="w-4 h-4" src={getFaviconUrl(url)} alt={`Favicon ${url}`} />
  );
};

const ChatProviders: FC = () => {
  const { isLoading, providers, toggleProvider } = useChatProviders();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-y-3">
      <p className="font-bold">Chat Providers</p>
      <div className="flex flex-col gap-4">
        {providers.map((provider) => {
          return (
            <Switch
              key={provider.hostname}
              onValueChange={() => {
                toggleProvider(provider.name);
              }}
              isSelected={provider.enabled}
            >
              <div className="flex gap-x-2 items-center">
                <Favicon url={provider.hostname as string} />
                <span className="capitalize">{provider.name}</span>
              </div>
            </Switch>
          );
        })}
      </div>
    </div>
  );
};

export default ChatProviders;
