import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SA Trends Calendar</title>
        <meta
          name="description"
          content="an open-source web app showing trends of the month in South Africa in the year calendar from a Twitter trend and makes it easy to download an updated calendar image."
        />
        <meta property="og:title" content="SA Trends Calendar" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sa-trends-calendar.appspot.com/o/calendar-screenshots%2F2022.jpg?alt=media&token=f1cf12e3-4a61-4cbc-bf37-4d0f7df55818"
        />
        <meta
          property="og:description"
          content="an open-source web app showing trends of the month in South Africa in the year calendar from a Twitter trend and makes it easy to download an updated calendar image."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
