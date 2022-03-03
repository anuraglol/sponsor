import { Box, Heading } from "@chakra-ui/react";

const success = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflowX="hidden"
      bgGradient="linear(to-l, #531CB3, #944BBB)"
      height="100vh"
      fontFamily="inter"
      textColor="white"
    >
      <Heading as="h2" fontWeight="semibold">
        Thank you for sponsoring me!{" "} 
      </Heading>
    </Box>
  );
};

export default success;
