import { SimpleGrid } from "@chakra-ui/react";
import Month from "./Month";

const Months = () => {
  const data = [
    {
      month_name: "January",
      imageURL: "",
    },
    {
      month_name: "February",
      imageURL: "",
    },
    {
      month_name: "March",
      imageURL: "",
    },
    {
      month_name: "April",
      imageURL: "",
    },
    {
      month_name: "May",
      imageURL: "",
    },
    {
      month_name: "June",
      imageURL: "",
    },
    {
      month_name: "July",
      imageURL: "",
    },
    {
      month_name: "August",
      imageURL: "",
    },
    {
      month_name: "September",
      imageURL: "",
    },
    {
      month_name: "October",
      imageURL: "",
    },
    {
      month_name: "November",
      imageURL: "",
    },
    {
      month_name: "December",
      imageURL: "",
    },
  ];
  return (
    <SimpleGrid
      mt={6}
      columns={[1, 2, 3, 4]}
      spacingX={["40px"]}
      spacingY={["20px", "50px", "12px"]}
    >
      {data.map((monthObject, index) => {
        const { month_name, imageURL } = monthObject;
        return (
          <Month key={index} month_name={month_name} imageURL={imageURL} />
        );
      })}
    </SimpleGrid>
  );
};

export default Months;
