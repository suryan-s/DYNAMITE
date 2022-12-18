import { Box, Text } from "@chakra-ui/react";

export default function EmoTrack() {
  return (
    <Box display="flex" minH="50vh">
      <Text w="50%" px="1rem">
        When was the last time you looked at yourself and smiled? mental health
        is just as important as your normal health.Mental health is an integral
        part of overall health and well-being, and it is important to prioritize
        and take care of it just like any other aspect of your health. One
        simple way to do this is by taking a moment to reflect on yourself and
        your progress, and to find joy and satisfaction in who you are and what
        you have accomplished. Smiling at yourself and acknowledging your own
        worth and value can be a small but meaningful step towards improving
        your mental health and overall well-being.
      </Text>
      <Box border="1px solid black">
        <img src="/Emotion" w="100%" h="100%" />
      </Box>
    </Box>
  );
}
