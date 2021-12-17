import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SA Trends Calendar</title>
        <meta
          name="description"
          content="SA-Trends-Calendar is an open source web app 
          showing trends of the month in South Africa in the year calendar style."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
