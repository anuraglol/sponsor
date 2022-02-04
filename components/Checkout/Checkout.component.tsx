import { FC } from "react";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Center,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key!);

const Checkout: FC = () => {
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

  const handleClick = () => {
    setLoading(true);
    checkoutSession();
  };

  return (
    <>
      <Box
        p="10"
        py="16"
        width="sm"
        bgColor="#ffffffd4"
        rounded="md"
        boxShadow="md"
        display="flex"
        justifyContent="center"
        flexDir="column"
        gap="8"
        shadow="md"
      >
        <InputGroup>
          <InputLeftAddon>INR</InputLeftAddon>
          <Input
            w="full"
            type="number"
            placeholder="enter the amount..."
            onChange={(e: any) => setAmount(e.target.value)}
          />
        </InputGroup>

        <HStack w="full" spacing="8" justifyContent="center">
          {defaultAmounts?.map((btnAmount: number) => (
            <Box
              py="1"
              px="6"
              rounded="full"
              textColor={amount === btnAmount ? "white" : "black"}
              bgColor={amount === btnAmount ? "purple.500" : "gray.100"}
              cursor="pointer"
              onClick={() => setAmount(btnAmount)}
              key={btnAmount}
            >
              {btnAmount}
            </Box>
          ))}
        </HStack>

        <Center>
          <Button
            onClick={handleClick}
            colorScheme="purple"
            fontWeight="500"
            w="64"
            isLoading={loading}
            isDisabled={!amount && true}
          >
            Checkout
          </Button>
        </Center>
      </Box>
    </>
  );
};

export default Checkout;
