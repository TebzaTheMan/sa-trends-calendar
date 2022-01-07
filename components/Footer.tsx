import { Text, IconButton, Stack, Box, Icon, Link } from "@chakra-ui/react";
import { FiCoffee, FiTwitter, FiGithub } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg={"gray.100"}>
      <Stack
        direction={["column", "row"]}
        align={"center"}
        mt={16}
        ml={[4, 16]}
        mr={[4, 16]}
        pt={4}
        pb={4}
      >
        <Text fontSize="sm" color={"gray.700"}>
          © {new Date().getFullYear()} SA-Trends-Calendar
        </Text>
        <Spacer />
        <Flex align={"center"}>
          <Text fontSize="sm" color={"gray.700"} mr={2}>
            Made with
          </Text>
          <Icon as={FiCoffee} color={"primary.500"} viewBox="12 0 55 55" />
          <Spacer />
          <Text fontSize="sm" color={"gray.700"} ml={2}>
            by Tebogo Nomnqa
          </Text>
        </Flex>

        <Spacer />
        <Flex>
          <Link href={"https://twitter.com/sa_trends_cal"} isExternal>
            <IconButton
              aria-label="Twitter"
              variant={"outline"}
              icon={<Icon as={FiTwitter} color={"gray.700"} />}
              boxSize={12}
              mr={4}
            />
          </Link>
          <Link
            href={"https://github.com/TebzaTheMan/sa-trends-calendar"}
            isExternal
          >
            <IconButton
              aria-label="Github"
              variant={"outline"}
              icon={<Icon as={FiGithub} color={"gray.700"} />}
              boxSize={12}
            />
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Footer;
