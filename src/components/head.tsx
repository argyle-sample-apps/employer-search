import NextHead from "next/head";

export const Head = () => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes"
    />
    <meta property="title" content="Employer Search" />
    <meta
      name="description"
      content="Standardize employer names with an inline, autocomplete field for loan applicants."
    />
    <title>Employer Search</title>

    <meta property="og:type" content="website" />
    <meta
      property="og:url"
      content="https://sampleapps.argyle.com/employer-search"
    />
    <meta property="og:title" content="Employer Search" />
    <meta
      property="og:description"
      content="Standardize employer names with an inline, autocomplete field for loan applicants."
    />
    <meta
      property="og:image"
      content="/employer-search/Employer-search-meta.png"
    />

    <meta property="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:url"
      content="https://sampleapps.argyle.com/employer-search"
    />
    <meta property="twitter:title" content="Employer Search" />
    <meta
      property="twitter:description"
      content="Standardize employer names with an inline, autocomplete field for loan applicants."
    />
    <meta
      property="twitter:image"
      content="/employer-search/Employer-search-meta.png"
    />

    <meta name="description" content="Description" />
    <meta name="keywords" content="Keywords" />
    <title>Employer Search</title>
    <link
      rel="preload"
      href="/employer-search/fonts/CircularXXWebLight.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/employer-search/fonts/CircularXXWebMedium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/employer-search/fonts/CircularXXWebRegular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
    <meta name="theme-color" content="#ffffff" />
  </NextHead>
);
