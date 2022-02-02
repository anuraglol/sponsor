import { Box, Heading } from "@chakra-ui/react";

const success = () => {
  return (
    <Box
      className="min-h-screen min-w-screen"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflowX="hidden"
      bgColor="red.100"
    >
      <Heading as="h2" fontWeight="semibold">Thank you for sponsoring me! 💙</Heading>
    </Box>
  );
};

export default success;
