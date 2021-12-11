import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SA Trends Calendar</title>
        <meta
          name="description"
          content="SA Trends Calendar is an open source app 
          showing glimpses of what happened in a year in the iconic calendar style."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
