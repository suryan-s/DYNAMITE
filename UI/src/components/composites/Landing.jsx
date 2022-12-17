import { Box, Heading, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { HiArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box
      w="100vw"
      minH="100vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
    >
      <Heading size="4xl" textAlign="center">
        I'm a <strong>working</strong> Heading
      </Heading>
      <Text fontSize="lg" mx="auto" textAlign="center" my="2rem">
        Made for HACK'24 Machine Learning hackathon.
      </Text>
      <ButtonGroup
        display="flex"
        flexDir={["column", "row"]}
        px="2rem"
        justifyContent="center"
        alignItems="center"
        w="100%"
        gap="1rem"
      >
        <Link to="/home">
          <Button
            colorScheme="yellow"
            variant="outline"
            px="2em"
            py="1.8rem"
            rightIcon={<HiArrowRight />}
          >
            Get Started!
          </Button>
        </Link>
        <Button
          colorScheme="yellow"
          variant="solid"
          px="2em"
          py="1.8em"
          rightIcon={<HiOutlineExternalLink />}
        >
          GitHub
        </Button>
      </ButtonGroup>
    </Box>
  );
}
