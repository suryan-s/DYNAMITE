import {
  Box,
  Input,
  Text,
  FormControl,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
export default function Chat() {
  return (
    <Box>
      <Box
        height="50vh"
        bgColor="blackAlpha.400"
        my="2rem"
        rounded="lg"
        overflowY="scroll"
      >
        <Recieved text="Hello!" />
        <Recieved text="Hello!" />
        <Sent text="hi" />
        <Recieved text="Hello!" />
        <Recieved text="Hello!" />
        <Sent
          text={`egenbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`}
        />
        <Recieved text="Hello!" />
        <Recieved text="Hello!" />
        <Sent text="hi" />
        <Recieved text="Hello!" />
        <Recieved text="Hello!" />
        <Sent text="hi" />
      </Box>

      <form>
        <FormControl display="flex" gap="1rem">
          <Input />
          <IconButton
            type="submit"
            icon={<IoSend />}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </FormControl>
      </form>
    </Box>
  );
}

function Recieved({ text }) {
  return (
    <Box
      w="70%"
      bgColor="whatsapp.400"
      ml="2rem"
      mt="2rem"
      p="1rem"
      rounded="xl"
      roundedBottomStart="none"
      color="black"
    >
      <Text>{text}</Text>
    </Box>
  );
}
function Sent({ text }) {
  return (
    <Box
      w="70%"
      bgColor="linkedin.100"
      mr="2rem"
      ml="auto"
      mt="2rem"
      p="1rem"
      rounded="xl"
      roundedBottomRight="none"
      color="black"
    >
      <Text>{text}</Text>
    </Box>
  );
}
