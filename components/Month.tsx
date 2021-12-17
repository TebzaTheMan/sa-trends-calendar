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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { FiPlus, FiHelpCircle } from "react-icons/fi";
import { useAuth } from "../context/auth.context";
import { Formik, Form, Field, FormikHelpers } from "formik";
import validator from "validator";
import axios from "axios";
import { useRouter } from "next/router";
interface MyFormValues {
  imageURL: string;
}

const Month = ({
  index,
  imageURL,
  month_name,
}: {
  index: number;
  imageURL: string;
  month_name: string;
}) => {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { user, extraInfo } = useAuth();
  const initialValues: MyFormValues = { imageURL: "" };
  const toast = useToast();
  const router = useRouter();

  let height = ["250", "200"];

  const validURLOptions = {
    protocols: ["https"],
    require_valid_protocol: true,
    require_host: true,
  };
  async function validateURL(value: string) {
    let error;
    if (!value) {
      error = "URL is required";
    } else if (validator.isURL(value, validURLOptions)) {
      try {
        const res = await fetch(value);
        const type = res.headers.get("Content-Type");
        if (type ? !type.includes("image") : false) {
          return (error = "URL is not a direct link to an image");
        }
      } catch (e) {
        error = "URL is not a direct link to an image";
      }
    } else {
      error = "invalid URL";
    }

    return error;
  }
  async function handleSubmit(
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    const urlToPatch = {
      [index]: values.imageURL,
    };
    const res = await axios
      .patch(
        `https://sa-trends-calendar-default-rtdb.firebaseio.com/years/2021/urls.json`,
        urlToPatch
      )
      .catch((error) => {
        actions.setFieldError("imageURL", "Error saving image URL to database");
      });
    actions.setSubmitting(false);
    onToggle();
    toast({
      title: "Image URL saved",
      description: "refreshing the calendar!",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    router.reload();
  }

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

          {user && extraInfo ? (
            extraInfo.moderator ? (
              <>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                  }}
                >
                  {(props) => (
                    <Form>
                      <ModalBody>
                        <Field name="imageURL" validate={validateURL}>
                          {/*TODO: remove explicit any types */}
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              id="imageURL"
                              isInvalid={
                                form.errors.imageURL && form.touched.imageURL
                              }
                              isRequired
                            >
                              <FormLabel htmlFor="imageURL">
                                Image URL
                                <Popover placement="auto">
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
                                        The way this works is you upload an
                                        image on a free image hosting of your
                                        choosing (my favs :{" "}
                                        <Link
                                          href="https://postimages.org"
                                          color={"primary"}
                                          isExternal
                                        >
                                          postimages.org
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                          href="https://imgbb.com"
                                          color={"primary"}
                                          isExternal
                                        >
                                          imgbb.com
                                        </Link>{" "}
                                        ) and copy and paste the direct link
                                        here!
                                      </Text>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </FormLabel>
                              <Input
                                {...field}
                                id="imageURL"
                                placeholder="https://"
                              />
                              <FormErrorMessage>
                                {form.errors.imageURL}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variant="solid"
                          bg="primary"
                          color="white"
                          type="submit"
                          isLoading={props.isSubmitting}
                        >
                          Save
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <ModalBody>
                <Text>
                  You have to be a moderator to make changes to the calendar. To
                  request to be a moderator, send me a
                  <Link
                    href="https://twitter.com/messages/compose?recipient_id=4775018429&text=SA-Trends-Calendar%20Moderator%20Request:"
                    isExternal
                    color={"primary"}
                  >
                    {"  "}
                    dm on Twitter
                  </Link>
                </Text>
              </ModalBody>
            )
          ) : (
            <ModalBody>
              <Text>
                You have to be signed in and be a moderator to make changes to
                the calendar. To request to be a moderator, send me a
                <Link
                  href="https://twitter.com/messages/compose?recipient_id=4775018429&text=SA-Trends-Calendar%20Moderator%20Request:"
                  isExternal
                  color={"primary"}
                >
                  {"  "}
                  dm on Twitter
                </Link>
              </Text>
            </ModalBody>
          )}
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
        src={imageURL}
        alt={`${month_name} trend`}
        fit="cover"
      />
    </Box>
  );
};

export default Month;
