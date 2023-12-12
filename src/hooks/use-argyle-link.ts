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
  const [showCredentials, setShowCredentials] = useState(false);
  const [showCredentialsButton, setShowCredentialsButton] = useState(false);

  const { data: user } = useUser();

  const onUIEvent = (event: { name: string }) => {
    switch (event.name) {
      case "search - opened":
      case "success - opened":
      case "pd success - opened":
        setShowCredentialsButton(false);
        break;

      case "login - opened":
      case "mfa - opened":
        setShowCredentialsButton(true);
        break;

      case "link closed":
        setShowCredentialsButton(false);
        setShowCredentials(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!isLinkLoaded || !user?.user_token) {
      return;
    }

    const link = window.Argyle.create({
      sandbox: true,
      flowId: process.env.CUSTOMIZATION_ID,
      userToken: user.user_token,
      onUIEvent,
      onClose,
      ...(selectedItem && { items: [selectedItem] }),
    });

    setLinkInstance(link);
  }, [isLinkLoaded, user, onClose, selectedItem]);

  return {
    linkInstance,
    showCredentials,
    showCredentialsButton,
    setShowCredentials,
  };
};
