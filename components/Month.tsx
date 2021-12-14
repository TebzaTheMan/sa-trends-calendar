import { useState } from "react";
import {
  Box,
  Center,
  IconButton,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Link,
} from "@chakra-ui/react";
import { FiPlus, FiHelpCircle } from "react-icons/fi";

const Month = ({
  imageURL,
  month_name,
}: {
  imageURL: string;
  month_name: string;
}) => {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let height = ["250", "200"];
  return imageURL == "" ? (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Text fontSize={"xl"} color={hover ? "gray.600" : "white"}>
        {month_name}
      </Text>
      <Center bg="primary" h={height} color="white">
        {hover ? (
          <IconButton
            aria-label="add image link"
            icon={<FiPlus color="black" />}
            isRound={true}
            variant={"solid"}
            onClick={onOpen}
          />
        ) : (
          <Text
            fontSize={"xl"}
            align={"center"}
            justifyContent={"center"}
            color={"white"}
          >
            {month_name}
          </Text>
        )}
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image for {month_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="imageURL">
              <FormLabel>
                Image URL
                <Popover placement="right">
                  <PopoverTrigger>
                    <IconButton
                      icon={<FiHelpCircle />}
                      aria-label="Help"
                      boxSize={8}
                      variant={"ghost"}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      <Text fontWeight={"normal"}>
                        The way this works is you upload an image on a free
                        image hosting of your choosing (my favs :{" "}
                        <Link href="https://postimages.org" color={"primary"}>
                          postimages.org
                        </Link>{" "}
                        and{" "}
                        <Link href="https://imgbb.com" color={"primary"}>
                          imgbb.com
                        </Link>{" "}
                        ) and copy and paste the direct link here!
                      </Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <Input type="url" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" bg="primary" color="white">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <Box>
      <Text fontSize={"xl"} color={"gray.600"}>
        {month_name}
      </Text>
      <Image
        height={height}
        width={"100%"}
        src={
          imageURL == "" ? "https://i.postimg.cc/P5K1Tfzj/tree.jpg" : imageURL
        }
        alt={`${month_name} trend`}
        fit="cover"
      />
    </Box>
  );
};

export default Month;
