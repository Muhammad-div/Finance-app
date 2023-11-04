import MainDash from "dashboard/MainDash";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Your Finance | Dashboard</title>
      </Head>
      <MainDash />;
    </>
  );
};

export default index;
