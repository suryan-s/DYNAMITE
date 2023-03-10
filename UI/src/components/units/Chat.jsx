import {
  Box,
  Input,
  Text,
  FormControl,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
export default function Chat() {
  const [chatarray, setChatarrray] = useState([
    <Sent text="Hi" />,
    <Recieved text="Hey! How can I help you?" />,
    <Sent text="hi, im not feeling well and i think i might have a cold" />,
    <Recieved text="Im sorry to hear that. Can you tell me a little bit more about your symptoms?" />,
    <Sent text="I have" />,
    <Recieved text="Could you elaborate your symptoms a bit more?" />,
    <Sent text="I have" />,
    <Recieved text="Do you have any skin rash?" />,
    <Sent text="No" />,
    <Recieved text="Do you have body pain?" />,
    <Sent text="No" />,
  ]);
  let cachearray = [...chatarray];
  function sendUserData(data, value) {
    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data, value: value }),
    })
      .then((res) => res.json())
      .then((val) => {
        cachearray = [
          ...chatarray,
          <Sent text={data} />,
          <Recieved text={val} />,
        ];
        setChatarrray(cachearray);
      });
  }
  useEffect(() => {
    sendUserData("hi");
  }, []);
  return (
    <Box>
      <Box
        height="50vh"
        bgColor="blackAlpha.400"
        my="2rem"
        rounded="lg"
        overflowY="scroll"
      >
        {chatarray.map((en) => {
          return en;
        })}
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
