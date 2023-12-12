import { Button } from "components/button";
import { Paragraph, Subheading } from "components/typography";

type DocumentViewProps = {
  handleLinkOpen: () => void;
};

export const DocumentView = ({ handleLinkOpen }: DocumentViewProps) => {
  return (
    <div>
      <Subheading className="mb-3">Document upload</Subheading>
      <Paragraph className="mb-6">
        Without a selected payroll prover we will need to verify your income
        manually.
      </Paragraph>
      <div className="mb-4 flex">
        <Button onClick={handleLinkOpen}>Start manual verification</Button>
      </div>
    </div>
  );
};
