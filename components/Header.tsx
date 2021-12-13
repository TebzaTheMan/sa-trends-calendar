import { Heading, Image, Avatar, AvatarBadge } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex align={"center"}>
      <Image src="/logo.svg" alt="logo" boxSize="64px" />
      <Heading as="h1" size="lg" color={"gray.900"}>
        Trends Calendar
      </Heading>
      <Spacer />
      <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo">
        <AvatarBadge boxSize="1.25em" bg="primary" />
      </Avatar>
    </Flex>
  );
};

export default Header;
