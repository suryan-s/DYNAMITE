import { Box,Heading,Text } from "@chakra-ui/react"
export default function Landing(){
    return (
        <Box w="100vw" >
            <Heading size="4xl" textAlign="center" mt="30vh">I'm a <strong>working</strong> Heading</Heading>
            <Text fontSize="lg" mx="auto" textAlign="center" my="2rem">Made for HACK'24 Machine Learning hackathon.</Text>
        </Box>
    )
}