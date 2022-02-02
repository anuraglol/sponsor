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

interface props {
  amount: any;
  loading: boolean;
  defaultAmounts: number[];
  setLoading: any;
  setAmount: any;
  checkoutSession: any;
}

const Checkout: FC<props> = ({
  amount,
  loading,
  setAmount,
  setLoading,
  checkoutSession,
  defaultAmounts,
}) => {
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
