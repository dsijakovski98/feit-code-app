import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

type Props = {
  title?: string;
  description?: string;
};

const BASE_URL = "https://app.feitcode.dev";

const PageMeta = ({ title = "FEIT Code", description = "" }: Props) => {
  const { pathname } = useLocation();
  const pageUrl = BASE_URL + pathname;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta property="og:url" content={pageUrl} />
      <meta property="twitter:url" content={pageUrl} />

      <link rel="canonical" href={pageUrl} />
    </Helmet>
  );
};

export default PageMeta;
