declare global {
  interface Window {
    Argyle: any;
  }
}

import { useEffect, useState } from "react";
import { useUser } from "./use-user";

type ArgyleLinkProps = {
  isLinkLoaded: boolean;
  selectedItem?: string;
  onClose?: () => void;
};

export const useArgyleLink = ({
  isLinkLoaded,
  onClose,
  selectedItem,
}: ArgyleLinkProps) => {
  const [linkInstance, setLinkInstance] = useState(null);

  const { data: user } = useUser();

  useEffect(() => {
    if (!isLinkLoaded || !user?.user_token) {
      return;
    }

    const link = window.Argyle.create({
      sandbox: true,
      flowId: process.env.CUSTOMIZATION_ID,
      userToken: user.user_token,
      onClose,
      ...(selectedItem && { items: [selectedItem] }),
    });

    setLinkInstance(link);
  }, [isLinkLoaded, user, onClose, selectedItem]);

  return {
    linkInstance,
  };
};
