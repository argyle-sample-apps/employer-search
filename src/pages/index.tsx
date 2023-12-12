import Script from "next/script";
import { useEffect, useState } from "react";
import { LinkItem } from "models/item";
import { Combobox } from "components/combobox";
import { useSearch } from "hooks/use-search";
import { useSearchPlatforms } from "hooks/use-search-platforms";
import { ConnectView } from "views/connect";
import { DocumentView } from "views/document";
import { Paragraph, Subheading } from "components/typography";
import { ChevronDownIcon } from "components/icons";
import { useArgyleLink } from "hooks/use-argyle-link";

export default function Index() {
  const [isLinkLoaded, setIsLinkLoaded] = useState(false);

  const [firstQuery, setFirstQuery] = useState("");
  const [secondQuery, setSecondQuery] = useState("");
  const [firstItem, setFirstItem] = useState<LinkItem | null>(null);
  const [secondItem, setSecondItem] = useState<LinkItem | null>(null);

  const getItemForLink = () => {
    if (secondItem && secondItem.is_fallback) {
      return undefined;
    }
    if (secondItem) {
      return secondItem.id;
    }
    if (firstItem) {
      return firstItem.id;
    }
    return undefined;
  };

  const { linkInstance } = useArgyleLink({
    isLinkLoaded,
    selectedItem: getItemForLink(),
  });

  const { data: searchResults, isLoading: isSearchLoading } =
    useSearch(firstQuery);
  const { data: searchPlatformResults, isLoading: isSearchPlatformLoading } =
    useSearchPlatforms(secondQuery);

  const handleLinkOpen = () => {
    if (linkInstance) {
      linkInstance.open();
    }
  };

  useEffect(() => {
    if (secondItem && !firstItem) {
      setSecondItem(null);
    }
  }, [firstItem, secondItem]);

  return (
    <main className="mx-auto mt-4 max-w-lg lg:mt-20">
      <div className="rounded p-2">
        <Combobox
          isLoading={isSearchLoading}
          label="Employer"
          placeholder="Where do you work?"
          items={searchResults || []}
          setQuery={setFirstQuery}
          selectedItem={firstItem}
          setSelectedItem={setFirstItem}
        />
        {firstItem && (
          <div className="mt-2 mb-6 rounded bg-white p-3">
            {firstItem.is_supported ? (
              <ConnectView handleLinkOpen={handleLinkOpen} />
            ) : (
              <div>
                <Subheading className="mb-2">
                  Next, let&apos;s find your payroll provider.
                </Subheading>
                <Paragraph>
                  {firstItem.name} is not eligible for instant verification.
                  Let&apos;s find your payroll provider as an alternative.
                </Paragraph>
              </div>
            )}
          </div>
        )}
        {firstItem && !firstItem.is_supported && (
          <>
            <div className="mb-2 flex justify-center text-slate-400">
              <ChevronDownIcon />
            </div>
            <Combobox
              isLoading={isSearchPlatformLoading}
              label="Payroll platform"
              placeholder="What's your payroll provider?"
              items={searchPlatformResults || []}
              setQuery={setSecondQuery}
              selectedItem={secondItem}
              setSelectedItem={setSecondItem}
            />
            {secondItem && (
              <div className="mt-2 mb-6 rounded bg-white p-3">
                {secondItem.is_fallback ? (
                  <DocumentView handleLinkOpen={handleLinkOpen} />
                ) : (
                  <ConnectView handleLinkOpen={handleLinkOpen} />
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Script
        src="https://plugin.argyle.com/argyle.web.v5.js"
        onReady={() => setIsLinkLoaded(true)}
      />
    </main>
  );
}
