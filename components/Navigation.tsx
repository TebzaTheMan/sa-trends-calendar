import { Heading, IconButton, useTheme } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const Navigation = ({ year }: { year: number }) => {
  const theme = useTheme();
  let d = new Date();
  let currentYear = d.getFullYear();

  return (
    <Flex align={"center"} mt={6}>
      <Spacer />
      <Link href={`/year/${year - 1}`} passHref>
        <IconButton
          aria-label="Previous year"
          icon={<FiArrowLeft color={theme.colors.primary} />}
          boxSize={16}
          isDisabled={year - 1 == 2020 ? true : false}
        />
      </Link>

      <Heading as="h1" size="lg" mr={9} ml={9} color="gray.700">
        {year}
      </Heading>
      <Link href={`/year/${year + 1}`} passHref>
        <IconButton
          aria-label="Next year"
          icon={<FiArrowRight color={theme.colors.primary} />}
          boxSize={16}
          isDisabled={year + 1 >= currentYear + 1 ? true : false}
        />
      </Link>

      <Spacer />
    </Flex>
  );
};

export default Navigation;
