import {
  Heading,
  Image,
  Avatar,
  AvatarBadge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Badge,
  Divider,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import { FiMessageCircle, FiPower } from "react-icons/fi";
import { Flex, Spacer } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex align={"center"} mt={2} ml={[4, 16]} mr={[4, 16]}>
      <Image src="/logo.svg" alt="logo" boxSize="40px" />
      <Heading as="h1" size="lg" color={"gray.900"}>
        Trends Calendar
      </Heading>
      <Spacer />
      <Popover placement={"bottom-end"} trigger="hover">
        <PopoverTrigger>
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo">
            <AvatarBadge boxSize="1.25em" bg="primary" />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent width="100">
          <PopoverBody>
            <Text fontSize="lg" fontWeight={"bold"}>
              Segun Adebayo{" "}
            </Text>

            <Text fontSize="sm">@SegunAdebayo </Text>
            <Badge variant={"solid"} bg="primary">
              MODERATOR
            </Badge>
            <Divider mt={4} mb={4} />
            <List spacing={7}>
              <Link
                href="https://twitter.com/messages/compose?recipient_id=4775018429&text=SA-Trends-Calendar%20Feedback:"
                isExternal
              >
                <ListItem color={"gray.700"}>
                  <ListIcon as={FiMessageCircle} color={"gray.700"} />
                  Feedback
                </ListItem>
              </Link>

              <ListItem color={"gray.700"}>
                <ListIcon as={FiPower} color={"gray.700"} />
                Logout
              </ListItem>
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Header;
