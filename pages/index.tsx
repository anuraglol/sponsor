import type { NextPage } from "next";

import { Checkout } from "../components";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

import axios from "axios";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key!);

const App: NextPage = () => {
  const [amount, setAmount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const defaultAmounts = [100, 250, 500];

  const checkoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      amount: amount,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result?.error.message);
      setLoading(false);
    }
  };

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
      gap="10"
      height="100vh"
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
      <Checkout
        amount={amount}
        loading={loading}
        setAmount={setAmount}
        setLoading={setLoading}
        checkoutSession={checkoutSession}
        defaultAmounts={defaultAmounts}
      />
    </Box>
  );
};

export default App;
