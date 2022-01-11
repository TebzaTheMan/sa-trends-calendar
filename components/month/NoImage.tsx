import { useState } from "react";
import {
  Box,
  Center,
  IconButton,
  Text,
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
  Link,
  useToast,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../context/auth.context";
import { Formik, Form, Field, FormikHelpers } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
interface MyFormValues {
  imageFile: string;
}

const NoImage = ({
  index,
  month_name,
  placeholder_color,
}: {
  index: number;
  month_name: string;
  placeholder_color: string;
}) => {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { user, extraInfo } = useAuth();
  const initialValues: MyFormValues = { imageFile: "" };
  const toast = useToast();
  const router = useRouter();
  const [base64, setBase64] = useState("");

  const height = ["250", "200"];

  const handleFileChange = (e: any) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const binaryString = reader.result;
        const b64 = binaryString!.toString().split("base64,")[1];
        setBase64(b64);
      };
      reader.readAsDataURL(file);
    }
  };

  const onModalClose = () => {
    onClose();
    setBase64("");
  };

  async function handleSubmit(
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    // upload to img storage
    const bodyFormData = new FormData();
    bodyFormData.append("image", base64);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // patch URL
        const urlToPatch = {
          [index]: res.data.data.url,
        };
        axios
          .patch(
            `https://sa-trends-calendar-default-rtdb.firebaseio.com/years/${router.query.year}/urls.json`,
            urlToPatch
          )
          .then(() => {
            // trigger screenshooter!
            axios
              .post(
                "https://api.github.com/repos/TebzaTheMan/sa-trends-calendar/dispatches",
                {
                  event_type: "screenshot-calendar",
                  client_payload: { year: router.query.year },
                },
                {
                  headers: {
                    Accept: "application / vnd.github.everest - preview + json",
                    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_PAT}`,
                  },
                }
              )
              .then((res) => {
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
              })
              .catch((error) => {
                toast({
                  title: "Error taking screenshot of updated Calendar",
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                  position: "top-right",
                });
                onToggle();
              });
          })
          .catch((error) => {
            toast({
              title: "Error saving image URL to database",
              description: error.message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
            onToggle();
          });
      })
      .catch((error) => {
        toast({
          title: "Couldn't upload image to server",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        onToggle();
      });
  }

  return (
    <>
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Text fontSize={"xl"} color={hover ? "gray.600" : "white"}>
          {month_name}
        </Text>
        <Center bg={placeholder_color} h={height} color="white">
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
      </Box>
      <Modal isOpen={isOpen} onClose={onModalClose}>
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
                        <Field name="imageFile">
                          {/*TODO: remove explicit any types */}
                          {({ form }: { form: any }) => (
                            <FormControl
                              id="imageFile"
                              isInvalid={
                                form.errors.imageFile && form.touched.imageFile
                              }
                              isRequired
                            >
                              <FormLabel htmlFor="imageFile">Image</FormLabel>
                              <Input
                                id="imageFile"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                variant="unstyled"
                              />
                            </FormControl>
                          )}
                        </Field>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variant="solid"
                          bg="primary.500"
                          color="white"
                          type="submit"
                          isLoading={props.isSubmitting}
                          disabled={base64 == "" || props.isSubmitting}
                        >
                          Save
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <ModalBody>
                  <Text>
                    You have to be a moderator to make changes to the calendar.
                    To request to be a moderator, send a
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Link
                    href="https://twitter.com/messages/compose?recipient_id=1479496476527153154&text=SA-Trends-Calendar%20Moderator%20Request:"
                    isExternal
                    color={"primary.500"}
                  >
                    {"  "}
                    dm on Twitter
                  </Link>
                </ModalFooter>
              </>
            )
          ) : (
            <>
              <ModalBody>
                <Text>
                  You have to be signed in and be a moderator to make changes to
                  the calendar. To request to be a moderator, send a
                </Text>
              </ModalBody>
              <ModalFooter>
                <Link
                  href="https://twitter.com/messages/compose?recipient_id=1479496476527153154&text=SA-Trends-Calendar%20Moderator%20Request:"
                  isExternal
                  color={"primary.500"}
                >
                  {"  "}
                  dm on Twitter
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoImage;
