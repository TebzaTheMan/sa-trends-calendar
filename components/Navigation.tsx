import { Heading, IconButton } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiDownload } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { storage } from "../firebase";
import { useRouter } from "next/router";
import { useAnalyticsEvent } from "../hooks/useAnalytics";

const Navigation = ({ year }: { year: number }) => {
  const [value, loading] = useDownloadURL(
    ref(storage, `calendar-screenshots/${year}.jpg`)
  );
  const router = useRouter();
  const { trackCustomEvent } = useAnalyticsEvent();
  let d = new Date();
  let currentYear = d.getFullYear();

  const download = () => {
    router.push(value!);
    trackCustomEvent({ eventName: `download-${year}-screenshot` });
  };
  return (
    <Flex align={"center"} mt={6} ml={[4, 16]} mr={[4, 16]}>
      <IconButton
        aria-label="Download calendar image"
        icon={<FiDownload />}
        boxSize={16}
        color="white"
        colorScheme="primary"
        isLoading={loading}
        onClick={() => download()}
      />
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
            isDisabled={year + 1 > currentYear + 1 ? true : false}
            color="primary.500"
          />
        </Link>
      </Flex>

      <Spacer />
    </Flex>
  );
};

export default Navigation;
