import { useRouter } from "next/router";
import Head from "next/head";
import { siteURL } from "utils/env";


type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
};

export const SEO = ({
  title,
  description,
  image,
  url,
  keywords = [],
}: SEOProps) => {
  const { asPath } = useRouter();
  const metaDescription =
    description || "Agrega aquí la descripción de tu sitio web";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="Nombre de tu sitio web" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={`${siteURL}${asPath === "/" ? "" : asPath}`}
      />
    </Head>
  );
};
