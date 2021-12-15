import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Months from "../components/Months";

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
    "https://fakerapi.it/api/v1/images?_quantity=12&_type=pokemon"
  );
  const d = await res.json();
  const data = d.data;
  let urls: string[] = [];
  data.map(({ url }: { url: string }) => urls.push(url));
  const year = params && params.year;

  return {
    props: {
      urls,
      year,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { year: "2021" } }, { params: { year: "2022" } }],
    fallback: false,
  };
};
export default YearPage;
