import { SimpleGrid } from "@chakra-ui/react";
import NoImage from "./month/NoImage";
import WithImage from "./month/WithImage";

const Months = ({
  urls,
  placeholder_color,
}: {
  urls: string[];
  placeholder_color: string;
}) => {
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
        return url == "" ? (
          <NoImage
            key={index}
            month_name={monthsName[index]}
            index={index}
            placeholder_color={placeholder_color}
          />
        ) : (
          <WithImage
            key={index}
            month_name={monthsName[index]}
            imageURL={url}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default Months;
