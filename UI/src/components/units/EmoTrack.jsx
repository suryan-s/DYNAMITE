import { Box, Text } from "@chakra-ui/react";

export default function EmoTrack() {
  return (
    <Box display="flex" minH="50vh">
      <Text w="50%"></Text>
      <Box border="1px solid black">
        <img src="/Emotion" w="100%" h="100%" />
      </Box>
    </Box>
  );
}
