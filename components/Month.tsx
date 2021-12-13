import { useState } from "react";
import { Box, Center, IconButton, Text, Image } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const Month = ({
  imageURL,
  month_name,
}: {
  imageURL: string;
  month_name: string;
}) => {
  const [hover, setHover] = useState(false);
  let height = "200";
  return imageURL == "" ? (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Text fontSize={"xl"} color={hover ? "gray.600" : "white"}>
        {month_name}
      </Text>
      <Center bg="#70008F" h={height} color="white">
        {hover ? (
          <IconButton
            aria-label="add image link"
            icon={<FiPlus color="black" />}
            isRound={true}
            variant={"solid"}
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
