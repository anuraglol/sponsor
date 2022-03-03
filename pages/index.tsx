import type { NextPage } from "next";

import axios from "axios";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key!);

import {
  Box,
  Button,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  Link,
  HStack,
} from "@chakra-ui/react";

import { BiRupee } from "react-icons/bi";

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

  const handleClick = () => {
    setLoading(true);
    checkoutSession();
  };

  return (
    <>
      <Box
        minH="100vh"
        minW="100vw"
        bgGradient="linear(to-l, #531CB3, #944BBB)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontFamily="inter"
      >
        <Box
          bgColor="white"
          rounded="md"
          py="12"
          px="28"
          display="flex"
          flexDir="column"
          rowGap={4}
          justifyContent="center"
        >
          <Text
            fontSize="2xl"
            textColor="gray.800"
            fontWeight="semibold"
            textAlign="center"
          >
            Love my work? <br />
            Sponsor Me!
          </Text>

          <Text fontWeight="medium" textColor="gray.600" textAlign="center">
            feel free to support me with a donation!
          </Text>

          <InputGroup mt="2">
            <InputLeftAddon>
              <BiRupee size="24" />
            </InputLeftAddon>
            <Input
              w="80"
              type="number"
              placeholder="enter an amount..."
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
            />
          </InputGroup>

          <HStack w="full" spacing="4" justifyContent="center">
            {defaultAmounts?.map((btnAmount: number) => (
              <Box
                py="1"
                px="6"
                rounded="full"
                fontSize="lg"
                fontWeight="500"
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

          <Box display="flex" justifyContent="center">
            <Button
              mt="4"
              colorScheme="purple"
              textColor="white"
              fontWeight="medium"
              w="80"
              isLoading={loading}
              onClick={handleClick}
            >
              checkout
            </Button>
          </Box>
          <Text fontSize="14px" textColor="gray.500" textAlign="center">
            crafted by anurag,{" "}
            <Link textColor="gray.700" href="https://www.anurag.tech">
              portfolio
            </Link>{" "}
            <br />
            this website is open source on{" "}
            <Link
              textColor="gray.700"
              href="https://www.github.com/kr-anurag/sponsor"
            >
              github
            </Link>{" "}
            <br />
            powered by{" "}
            <Link textColor="gray.700" href="https://www.stripe.com">
              stripe
            </Link>{" "}
            and hosted on{" "}
            <Link textColor="gray.700" href="https://www.vercel.com">
              vercel
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default App;
