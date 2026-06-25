import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = 'https://buildcorp.com/og-image.jpg',
  schema 
}) {
  const siteTitle = 'BuildCorp | Enterprise Construction & Development';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl || 'https://buildcorp.com'} />
      
      {}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      )}
    </Helmet>
  );
}
