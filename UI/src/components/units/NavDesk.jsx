import { useState } from "react";
import {
  Box,
  Button,
  scaleFadeConfig,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BsChatText } from "react-icons/bs";
import { GrYoga } from "react-icons/gr";
import Chat from "./Chat";
import FormComp from "./FormComp";
export default function NavDesk() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [component, setComponent] = useState(<div />);
  const [title, setTitle] = useState("");
  return (
    <Box
      position="fixed"
      top="40%"
      right="5%"
      display="flex"
      flexDir="column"
      gap="2rem"
      transform="translateY(-25%)"
    >
      <Button
        colorScheme="whatsapp"
        size="lg"
        padding="3em 3em"
        fontSize="1.3em"
        onClick={(e) => {
          setComponent(<Chat />);
          setTitle("SympCheck");
          onOpen(e);
        }}
        leftIcon={
          <Box pr="0.5rem">
            <BsChatText fontSize="2.5em" style="" />
          </Box>
        }
      >
        {/* SympCheck */}
      </Button>
      <Button
        colorScheme="telegram"
        size="lg"
        padding="3em 3em"
        fontSize="1.3em"
        leftIcon={
          <Box pr="0.5rem">
            <GrYoga fontSize="2.5em" style="" />
          </Box>
        }
      >
        {/* PoseTrack */}
      </Button>
      <Button
        colorScheme="pink"
        size="lg"
        padding="3em 3em"
        fontSize="1.3em"
        onClick={(e) => {
          setComponent(<FormComp />);
          setTitle("DiagnosePro");
          onOpen(e);
        }}
        leftIcon={
          <Box pr="0.5rem">
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 32 32"
              id="icon"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scale(1.4)" }}
            >
              <title>machine-learning</title>
              <path d="M16,25a6.9908,6.9908,0,0,1-5.833-3.1287l1.666-1.1074a5.0007,5.0007,0,0,0,8.334,0l1.666,1.1074A6.9908,6.9908,0,0,1,16,25Z" />
              <path d="M20,14a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,20,14Z" />
              <path d="M12,14a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,12,14Z" />
              <path d="M30,16V14H28V10a4.0045,4.0045,0,0,0-4-4H22V2H20V6H12V2H10V6H8a4.0045,4.0045,0,0,0-4,4v4H2v2H4v5H2v2H4v3a4.0045,4.0045,0,0,0,4,4H24a4.0045,4.0045,0,0,0,4-4V23h2V21H28V16ZM26,26a2.0023,2.0023,0,0,1-2,2H8a2.0023,2.0023,0,0,1-2-2V10A2.0023,2.0023,0,0,1,8,8H24a2.0023,2.0023,0,0,1,2,2Z" />
              <rect
                id="_Transparent_Rectangle_"
                data-name="&lt;Transparent Rectangle&gt;"
                class="cls-1"
                width="32"
                height="32"
                fill="none"
              />
            </svg>
          </Box>
        }
      >
        {/* DiagnosePro */}
      </Button>
      <ModalLayout
        isOpen={isOpen}
        onClose={onClose}
        component={component}
        title={title}
      />
    </Box>
  );
}
function ModalLayout({ isOpen, onClose, component, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent bgColor="" bgGradient="linear(to-br,gray.800 30%,#440000)">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{component}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
