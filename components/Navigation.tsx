import { Heading, IconButton } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiDownload } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const Navigation = ({ year }: { year: number }) => {
  let d = new Date();
  let currentYear = d.getFullYear();

  return (
    <Flex align={"center"} mt={6} ml={[4, 16]} mr={[4, 16]}>
      <Link href={"https://i.postimg.cc/gjDjVCy5/feb.jpg"} passHref>
        <IconButton
          aria-label="Download calendar image"
          icon={<FiDownload />}
          boxSize={16}
          color="primary"
        />
      </Link>
      <Spacer />
      <Flex align={"center"}>
        <Link href={`/year/${year - 1}`} passHref>
          <IconButton
            aria-label="Previous year"
            icon={<FiArrowLeft />}
            boxSize={16}
            isDisabled={year - 1 == 2020 ? true : false}
            color="primary"
          />
        </Link>

        <Heading as="h1" size="lg" mr={9} ml={9} color="gray.700">
          {year}
        </Heading>
        <Link href={`/year/${year + 1}`} passHref>
          <IconButton
            aria-label="Next year"
            icon={<FiArrowRight />}
            boxSize={16}
            isDisabled={year + 1 >= currentYear + 1 ? true : false}
            color="primary"
          />
        </Link>
      </Flex>

      <Spacer />
    </Flex>
  );
};

export default Navigation;
