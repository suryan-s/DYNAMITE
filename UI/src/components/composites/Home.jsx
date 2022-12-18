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
          We The <strong>Dynamite</strong>
          {/* <GiDynamite /> */}
        </Heading>
        <Text fontSize="lg" mx="auto" my="2rem">
          Made for HACK'24 Machine Learning hackathon.
        </Text>
        <Block
          heading="About"
          content={`
          Healthcare is a critical aspect of society that involves the provision of medical services to individuals in need. It encompasses a wide range of activities, including preventive care, diagnosis and treatment of illnesses, and rehabilitation. Healthcare is important because it plays a vital role in promoting the well-being of individuals and communities. It helps people maintain good physical and mental health, and can prevent or mitigate the effects of various medical conditions. 
          
          We can revolutionize healthcare by utilizing advance technologies such as machine learning and artificial intelligence.   
          `}
        />
        <Block
          heading=""
          content={`
          Our team consists of three young passionate innovators: Suryan, Fabin and Arjun.

          
          `}
        />
        <Block
          heading="Problem it solves"
          content={`
        We know that healthcare is a very important sector. Which calls for innovations in this field. 
        We have identified some problems that we thought we could solve during the last 24 hours. These are:
        `}
        />
        <Block2
          content={[
            "1. Identifying symptoms of a patient using a chatbot",
            "2. Encouraging better mental health among people",
            "3. Disease diagnosis, given a patient's report",
          ]}
        />
        <Block2
          heading="How it works"
          content={[
            `
        1. Program collects data via a chatbot named "Thakkudu", which is specifically designed for this ML Model.`,

            `2. We use computer vision to identify the mental heatlth of the user.`,

            `3. We trained a model using traditional Machine-Learning techniques to diagnose a disease from a valid report.`,
          ]}
        />
        <Links
          heading={"References"}
          content={[
            "https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data ",
            "https://www.kaggle.com/code/ananthr1/parkinson-disease-detection-using-xgbooster/data",
            "https://www.kaggle.com/datasets/rishidamarla/heart-disease-prediction",
            "https://www.kaggle.com/datasets/tom99763/affectnethq?select=labels.csv",
          ]}
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
function Block2({ heading, content }) {
  return (
    <>
      <Heading size="xl" pb="1rem">
        {heading}
      </Heading>
      {content.map((item) => {
        return (
          <Text fontSize="sm" py="0.5em" maxW="100ch">
            {item}
          </Text>
        );
      })}
    </>
  );
}
function Links({ heading, content }) {
  return (
    <>
      <Heading size="xl" pb="1rem">
        {heading}
      </Heading>
      <Box display="flex" flexDir="column">
        {content.map((item) => {
          return (
            <a
              style={{ color: "cyan" }}
              href={item}
              fontSize="sm"
              py="0.5em"
              maxW="100ch"
              target="_blank"
            >
              {item}
            </a>
          );
        })}
      </Box>
    </>
  );
}
