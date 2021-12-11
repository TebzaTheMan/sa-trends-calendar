import { Heading, IconButton } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Flex align={"center"}>
      <Spacer />
      <IconButton
        aria-label="Previous year"
        icon={<FiArrowLeft />}
        boxSize={16}
      />
      <Heading as="h1" size="lg" mr={9} ml={9} color="gray.700">
        2021
      </Heading>
      <IconButton aria-label="Next year" icon={<FiArrowRight />} boxSize={16} />
      <Spacer />
    </Flex>
  );
};

export default Navigation;
