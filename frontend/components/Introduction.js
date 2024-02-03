import {
  Link,
  Text,
  Stack,
  Heading,
  Box,
  Button,
  SlideFade,
  Image,
} from '@chakra-ui/react'
import { FaPhoneAlt, FaSuitcase } from 'react-icons/fa'
import useMediaQuery from '../hook/useMediaQuery'
import ReactGA from 'react-ga'

export default function Introduction({ introduction }) {
  const isLargerThan800 = useMediaQuery(800)
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }
  return (
    <>
      <Stack spacing={8} justifyContent="flex-start" alignItems="flex-start">
        <SlideFade
          direction="top"
          in={true}
          transition={{ enter: { duration: 0.4, delay: 0.7 } }}
        >
          <Box position="relative">
            <Image
              src="https://svgsilh.com/svg/26432.svg"
              filter="invert(0.1)"
              w={{ base: '70px', md: '150px' }}
              position="absolute"
              top={{ base: '0', md: '-15' }}
              left={{ base: '-5', md: '-10' }}
              zIndex={0}
              alt=""
            ></Image>
            <Text
              color="primaryColor"
              fontSize="display2"
              fontWeight="medium"
              position="relative"
              zIndex={1}
            >
              Hello 👋🏾, I'm-
            </Text>
          </Box>
          <Heading
            fontSize="display"
            lineHeight={'95%'}
            color="white"
            letterSpacing={{ sm: '-1.2px', md: '-1.8px' }}
            position="relative"
            zIndex={1}
          >
            Jac Wynn.
          </Heading>
        </SlideFade>

        <SlideFade
          direction="top"
          in={true}
          transition={{ enter: { duration: 0.4, delay: 0.8 } }}
        >
          <Heading
            color="textSecondary"
            fontSize="display2"
            fontWeight="medium"
            whiteSpace="pre-wrap"
            letterSpacing="-1.6px"
          >
            An{' '}
            <Box color="white" as="span">
              experienced web developer
            </Box>{' '}
            that specializes in building{' '}
            {isLargerThan800
              ? 'modern\nweb experiences and solving unique UX problems.'
              : 'modern web experiences and solving unique UX problems.'}
          </Heading>
        </SlideFade>

        <SlideFade
          direction="top"
          in={true}
          transition={{ enter: { duration: 0.4, delay: 1.0 } }}
        >
          <Stack isInline spacing={4}>
            <Link href="https://calendly.com/wynn-solutions/web-e-commerce-problem-solving-session" isExternal>
              <Button
                leftIcon={<FaPhoneAlt color="#000" />}
                position="static"
                size={isLargerThan800 ? 'md' : 'sm'}
                background="gray.200"
                color="black"
                onClick={() => handleClick('introduction_scheduleCall')} >
                Schedule Call
              </Button>
            </Link>
            <Link href="#work">
              <Button
                leftIcon={<FaSuitcase color="#FFF" />}
                position="static"
                size={isLargerThan800 ? 'md' : 'sm'}
                backgroundColor="black"
                color="white"
                _hover={{ backgroundColor: 'transparent' }}
                onClick={() => handleClick('introduction_work')}
              >
                See Work
              </Button>
            </Link>
          </Stack>
        </SlideFade>
      </Stack>
    </>
  )
}

{
  /* TODO: Remove this line of code when content in contentful is gone       */
}
{
  /* <SlideFade
  direction="top"
  in={true}
  transition={{ enter: { duration: 0.4, delay: 0.9 } }}
>
  <Text fontSize="display3" color="textSecondary">
    {introduction[0].fields.description}
  </Text>
</SlideFade> */
}
