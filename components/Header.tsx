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
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FiMessageCircle, FiPower } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { Flex, Spacer, Spinner } from "@chakra-ui/react";
import { signInWithTwitter, signInWithGoogle, logout } from "../firebase";
import { useAuth } from "../context/auth.context";
const Header = () => {
  const { user, loading, extraInfo, collectionLoading } = useAuth();

  return (
    <Flex align={"center"} mt={4} ml={[4, 16]} mr={[4, 16]}>
      <Image src="/logo.svg" alt="logo" boxSize="40px" />
      <Heading as="h1" size="lg" color={"gray.900"}>
        Trends Calendar
      </Heading>
      <Spacer />
      {loading && collectionLoading ? (
        <Spinner />
      ) : user && extraInfo ? (
        <Popover placement={"bottom-end"}>
          <PopoverTrigger>
            <IconButton
              aria-label="avatar"
              icon={
                <Avatar
                  name={user.photoURL == null ? undefined : user.photoURL}
                  src={user.photoURL == null ? undefined : user.photoURL}
                >
                  {extraInfo.moderator ? (
                    <AvatarBadge boxSize="1.25em" bg="primary" />
                  ) : null}
                </Avatar>
              }
              variant={"ghost"}
              isRound
            />
          </PopoverTrigger>
          <PopoverContent width="100">
            <PopoverBody>
              <Text fontSize="lg" fontWeight={"bold"}>
                {user.displayName}
              </Text>

              {user.providerData[0].providerId == "google.com" ? (
                <>
                  <Text>{user.email}</Text>
                  <Flex align={"center"} mt={2}>
                    <Text mr={2}>Authenticated via</Text>
                    <Icon as={FcGoogle} />
                  </Flex>
                </>
              ) : (
                <>
                  <Text fontSize="sm">@user.twitterHandle</Text>
                  <Flex align={"center"}>
                    <Text mr={2}>Authenticated via</Text>
                    <Icon as={FaTwitter} color={"twitter.500"} />
                  </Flex>
                </>
              )}
              {extraInfo.moderator ? (
                <Badge variant={"solid"} bg="primary" mt={2}>
                  MODERATOR
                </Badge>
              ) : null}
              <Divider mt={4} mb={2} />
              <List spacing={7}>
                <ListItem color={"gray.700"}>
                  <Link
                    href="https://twitter.com/messages/compose?recipient_id=4775018429&text=SA-Trends-Calendar%20Feedback:"
                    isExternal
                  >
                    <ListIcon as={FiMessageCircle} color={"gray.700"} />
                    Feedback
                  </Link>
                </ListItem>

                <ListItem color={"gray.700"}>
                  <Link onClick={logout}>
                    <ListIcon as={FiPower} color={"gray.700"} />
                    Logout
                  </Link>
                </ListItem>
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Popover placement={"bottom-end"}>
          <PopoverTrigger>
            <IconButton
              aria-label="avatar"
              icon={<Avatar />}
              variant={"ghost"}
              rounded={"full"}
            />
          </PopoverTrigger>
          <PopoverContent width="100">
            <PopoverBody>
              <List spacing={7}>
                <ListItem color={"gray.700"}>
                  <Link onClick={signInWithGoogle}>
                    <ListIcon as={FcGoogle} color={"gray.700"} />
                    Sign in with Google
                  </Link>
                </ListItem>

                <ListItem color={"gray.700"}>
                  <Link onClick={signInWithTwitter}>
                    <ListIcon as={FaTwitter} color={"twitter.500"} />
                    Sign in with Twitter
                  </Link>
                </ListItem>
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Flex>
  );
};

export default Header;
