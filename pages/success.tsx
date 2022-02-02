import { Box, Heading } from "@chakra-ui/react";

const success = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflowX="hidden"
      bgColor="red.100"
      height="100vh"
    >
      <Heading as="h2" fontWeight="semibold">Thank you for sponsoring me! 💙</Heading>
    </Box>
  );
};

export default success;
