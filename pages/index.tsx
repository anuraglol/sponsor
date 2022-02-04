import type { NextPage } from "next";

import { Checkout } from "../components";
import { Box, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const App: NextPage = () => {
  return (
    <Box
      display="flex"
      flexDir={{ base: "column", lg: "row" }}
      columnGap="10"
      justifyContent={{ base: "", lg: "space-between" }}
      alignItems="center"
      overflowX="hidden"
      bgColor="red.100"
      px="32"
      py="10"
      gap="10"
      height="100vh"
      fontFamily="Poppins"
    >
      <Box lineHeight="short">
        <Text fontSize="2xl">👋</Text>
        <Text fontWeight="bold" textColor="orange.500" fontSize="2xl">
          Anurag
        </Text>
        <Text fontSize="5xl" fontWeight="bold" textColor="blackAlpha.800">
          Love my work?
        </Text>
        <Text fontSize="xl" fontWeight="medium">
          Feel free to support me with a donation. <br />
          No matter how little it might be, it helps!
        </Text>

        <Link href="https://anurag.tech" passHref>
          <a target="_blank">
            <Button
              colorScheme="orange"
              textColor="white"
              fontWeight="medium"
              mt="8"
              borderRadius="full"
              borderBottomRightRadius="0"
              p="4"
              py="6"
            >
              Checkout my Portfolio
            </Button>
          </a>
        </Link>
      </Box>
      <Checkout />
    </Box>
  );
};

export default App;
