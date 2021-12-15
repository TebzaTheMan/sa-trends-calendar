import { SimpleGrid } from "@chakra-ui/react";
import Month from "./Month";

const Months = ({ urls }: { urls: string[] }) => {
  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <SimpleGrid
      mt={6}
      ml={[8, 16]}
      mr={[8, 16]}
      columns={[1, 2, 3, 4]}
      spacingX={["40px"]}
      spacingY={["20px", "50px", "12px"]}
    >
      {urls.map((url, index) => {
        return (
          <Month key={index} month_name={monthsName[index]} imageURL={url} />
        );
      })}
    </SimpleGrid>
  );
};

export default Months;
