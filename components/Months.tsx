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
      spacingX={["10px"]}
    >
      {urls.map((url, index) => {
        return (
          <Month
            key={index}
            month_name={monthsName[index]}
            imageURL={url}
            index={index}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default Months;
