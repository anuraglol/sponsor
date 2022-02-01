import type { NextPage } from "next";

import { Checkout } from "../components";
import { Box, Text, Button, Link } from "@chakra-ui/react";

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
    <div className="h-screen w-screen bg-red-100 font-poppins flex flex-row justify-between items-center px-32">
      <Box lineHeight="short" position="absolute">
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

        <Link href="https://anurag.tech" isExternal>
          <Button
            colorScheme="orange"
            textColor="white"
            fontWeight="medium"
            mt="8"
            borderRadius="full"
            borderBottomRightRadius="0"
            p="4"
            py="6"
            position="absolute"
            _hover={{
              marginTop: "12",
            }}
            style={{
              transition: "all",
              transitionDuration: "200ms",
            }}
          >
            Checkout my Portfolio
          </Button>
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
    </div>
  );
};

export default App;
