import Head from "next/head";
import React from "react";

const AppHeads: React.FC = () => {
  return (
    <Head>
      <title>Chemaxon homework</title>
      <meta
        name="description"
        content="Chemaxon homework create using next app"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Sabolch Varha" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default AppHeads;
