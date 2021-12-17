import type { GetServerSideProps } from "next";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Months from "../../components/Months";

const YearPage = ({ urls, year }: { urls: string[]; year: number }) => {
  return (
    <>
      <Head>
        <title>SA Trends Calendar - {year}</title>
        <meta
          name="description"
          content={`SA-Trends-Calendar is an open source web app calendar
          showing trends of the month in South Africa for the year ${year}.`}
        />
        <meta property="og:image" content="/og-image.jpeg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation year={year} />
      <Months urls={urls} />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const year = parseInt(params!.year?.toString()!);
  let d = new Date();
  let currentYear = d.getFullYear();

  if (year <= 2020 || year >= currentYear + 1) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(
    `https://sa-trends-calendar-default-rtdb.firebaseio.com/years/${year}/urls.json`
  );
  const urls = await res.json();

  return {
    props: {
      urls,
      year,
    },
  };
};

export default YearPage;
