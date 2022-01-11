import type { GetServerSideProps } from "next";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Months from "../../components/Months";

const YearPage = ({
  urls,
  year,
  placeholder_color,
}: {
  urls: string[];
  year: number;
  placeholder_color: string;
}) => {
  return (
    <>
      <Head>
        <title>SA Trends Calendar - {year}</title>
        <meta
          name="description"
          content={`Trends of ${year} in South Africa shown in calendar style taken from a Twitter trend and able to easily download an updated calendar image.`}
        />
        <meta
          property="og:description"
          content={`Trends of ${year} in South Africa shown in calendar style taken from a Twitter trend and able to easily download an updated calendar image.`}
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sa-trends-calendar.appspot.com/o/calendar-screenshots%2F2022.jpg?alt=media&token=f1cf12e3-4a61-4cbc-bf37-4d0f7df55818"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation year={year} />
      <Months urls={urls} placeholder_color={placeholder_color} />
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
    `https://sa-trends-calendar-default-rtdb.firebaseio.com/years/${year}.json`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  const placeholder_color = data.placeholder_color;
  const urls = data.urls;

  return {
    props: {
      urls,
      year,
      placeholder_color,
    },
  };
};

export default YearPage;
