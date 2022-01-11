import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const WithImage = ({
  imageURL,
  month_name,
}: {
  imageURL: string;
  month_name: string;
}) => {
  const height = ["250", "200"];

  return (
    <Box>
      <Text fontSize={"xl"} color={"gray.600"}>
        {month_name}
      </Text>
      <Box height={height} width="100%" sx={{ position: "relative" }}>
        <Image
          layout="fill"
          objectFit="cover"
          src={imageURL}
          alt={`${month_name} trend`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsYOifCQADgQGaQYZS1gAAAABJRU5ErkJggg=="
        />
      </Box>
    </Box>
  );
};

export default WithImage;
