import { useEffect, useState } from "react";
import {
  getLocalStorageValue,
  setOrUpdateLocalStorageValue,
} from "../../utils/storage";
import { ChatProvider, SupportedProviders } from "../../models/provider";

const useChatProviders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState<SupportedProviders>([]);

  const getProviders = async () => {
    try {
      const results = (await getLocalStorageValue(
        "providers",
      )) as SupportedProviders;
      if (results) {
        setProviders(results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProvider = (provider: ChatProvider) => {
    // Find the provider in the list
    const index = providers.findIndex((item) => item.name === provider);

    const updated = {
      ...providers[index],
      enabled: !providers[index].enabled,
    };

    const updatedProviders = [...providers];
    updatedProviders.splice(index, 1, updated);

    // save to database
    setOrUpdateLocalStorageValue("providers", updatedProviders);
    setProviders(updatedProviders);
  };

  useEffect(() => {
    getProviders();
  }, []);

  return {
    isLoading,
    providers,
    setIsLoading,
    setProviders,
    getProviders,
    toggleProvider,
  };
};

export default useChatProviders;
