import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Months from "../components/Months";
import { ParsedUrlQuery } from "querystring";

type parameters = {
  params: ParsedUrlQuery;
};
const YearPage = ({ urls, year }: { urls: string[]; year: number }) => {
  return (
    <>
      <Head>
        <title>SA Trends Calendar - {year}</title>
        <meta
          name="description"
          content="SA Trends Calendar is an open source app 
          showing glimpses of what happened in a year in the iconic calendar style."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation year={year} />
      <Months urls={urls} />
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://sa-trends-calendar-default-rtdb.firebaseio.com/years/${
      params!.year
    }/urls.json`
  );
  const urls = await res.json();
  const year = params!.year;

  return {
    props: {
      urls,
      year,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://sa-trends-calendar-default-rtdb.firebaseio.com/years.json"
  );
  const data = await res.json();
  const years = Object.keys(data);
  const paths: parameters[] = [];

  years.map((year) => {
    paths.push({
      params: {
        year,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
};
export default YearPage;
