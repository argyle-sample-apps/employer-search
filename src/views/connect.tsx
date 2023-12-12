import { Button } from "components/button";
import { Paragraph, Subheading } from "components/typography";

type ConnectViewProps = {
  handleLinkOpen: () => void;
};

export const ConnectView = ({ handleLinkOpen }: ConnectViewProps) => {
  return (
    <div>
      <Subheading className="mb-3">
        Let&apos;s connect to your employer online.
      </Subheading>
      <Paragraph className="mb-6">
        Login to your employers online portal to verify your income without any
        extra paperwork.
      </Paragraph>
      <div className="mb-4 flex">
        <Button onClick={handleLinkOpen}>Connect now</Button>
      </div>
    </div>
  );
};
