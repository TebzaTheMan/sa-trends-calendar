import { Heading, IconButton, Spinner } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiDownload } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { storage } from "../firebase";

const Navigation = ({ year }: { year: number }) => {
  const [value, Loading] = useDownloadURL(
    ref(storage, `calendar-screenshots/${year}.jpg`)
  );
  let d = new Date();
  let currentYear = d.getFullYear();

  return (
    <Flex align={"center"} mt={6} ml={[4, 16]} mr={[4, 16]}>
      {Loading ? (
        <Spinner color="primary.500" thickness="4px" />
      ) : (
        <Link href={value!} passHref>
          <IconButton
            aria-label="Download calendar image"
            icon={<FiDownload />}
            boxSize={16}
            color="white"
            colorScheme="primary"
          />
        </Link>
      )}

      <Spacer />
      <Flex align={"center"}>
        <Link href={`/year/${year - 1}`} passHref>
          <IconButton
            aria-label="Previous year"
            icon={<FiArrowLeft />}
            boxSize={16}
            isDisabled={year - 1 == 2020 ? true : false}
            color="primary.500"
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
            color="primary.500"
          />
        </Link>
      </Flex>

      <Spacer />
    </Flex>
  );
};

export default Navigation;
