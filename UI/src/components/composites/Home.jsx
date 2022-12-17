import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";

import NavDesk from "../units/NavDesk";
import NavMob from "../units/NavMob";
export default function Home() {
  const variant = useBreakpointValue({
    xl: true,
  });

  return (
    <>
      <Box p="3rem">
        <Heading size="4xl">
          I'm a <strong>working</strong> Heading
        </Heading>
        <Text fontSize="lg" mx="auto" my="2rem">
          Made for HACK'24 Machine Learning hackathon.
        </Text>
        <Block
          heading="About"
          content={`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus ligula arcu, ut euismod magna consequat in. Suspendisse risus turpis, efficitur at vulputate ut, placerat eget dolor. Fusce non enim et nisi aliquet pellentesque id eget odio. Vivamus pulvinar tristique commodo. Nulla facilisis tempor dictum. Praesent eget volutpat neque. Vivamus auctor magna quis quam bibendum, in aliquam ante tempor.
        Sed maximus, est at tincidunt ornare, massa eros faucibus metus, eu venenatis tortor justo hendrerit lacus. Vivamus sed iaculis eros. Praesent eu rutrum felis. Integer vitae est vitae enim elementum luctus ac eu leo. Integer in sollicitudin neque. Sed rhoncus nibh erat, quis mattis lacus convallis nec. Cras dictum, tellus a vestibulum ultricies, orci leo imperdiet quam, non eleifend nibh justo a nulla.
        `}
        />
        <Block
          heading="Problem it solves"
          content={`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus ligula arcu, ut euismod magna consequat in. Suspendisse risus turpis, efficitur at vulputate ut, placerat eget dolor. Fusce non enim et nisi aliquet pellentesque id eget odio. Vivamus pulvinar tristique commodo. Nulla facilisis tempor dictum. Praesent eget volutpat neque. Vivamus auctor magna quis quam bibendum, in aliquam ante tempor.
Sed maximus, est at tincidunt ornare, massa eros faucibus metus, eu venenatis tortor justo hendrerit lacus. Vivamus sed iaculis eros. Praesent eu rutrum felis. Integer vitae est vitae enim elementum luctus ac eu leo. Integer in sollicitudin neque. Sed rhoncus nibh erat, quis mattis lacus convallis nec. Cras dictum, tellus a vestibulum ultricies, orci leo imperdiet quam, non eleifend nibh justo a nulla
        `}
        />
        <Block
          heading="How it works"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus ligula arcu, ut euismod magna consequat in. Suspendisse risus turpis, efficitur at vulputate ut, placerat eget dolor. Fusce non enim et nisi aliquet pellentesque id eget odio. Vivamus pulvinar tristique commodo. Nulla facilisis tempor dictum. Praesent eget volutpat neque. Vivamus auctor magna quis quam bibendum, in aliquam ante tempor
        Sed maximus, est at tincidunt ornare, massa eros faucibus metus, eu venenatis tortor justo hendrerit lacus. Vivamus sed iaculis eros. Praesent eu rutrum felis. Integer vitae est vitae enim elementum luctus ac eu leo. Integer in sollicitudin neque. Sed rhoncus nibh erat, quis mattis lacus convallis nec. Cras dictum, tellus a vestibulum ultricies, orci leo imperdiet quam, non eleifend nibh justo a nulla.
        "
        />
      </Box>
      {variant ? <NavDesk /> : <NavMob />}
    </>
  );
}
function Block({ heading, content }) {
  return (
    <>
      <Heading size="xl">{heading}</Heading>
      <Text fontSize="sm" py="1.5em" maxW="100ch">
        {content}
      </Text>
    </>
  );
}
