import { Link, Button, chakra, Heading, Stack, Text } from '@chakra-ui/react'
import useMediaQuery from '../hook/useMediaQuery'
import { FaLinkedin, FaMedium, FaFileAlt } from 'react-icons/fa'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga'

export default function ContactMe({ contactMe }) {
  const isLargerThan800 = useMediaQuery(800)
  const handleClick = event => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }
  return (
    <>
      <Stack
        spacing={10}
        h="70vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <SlideUpWhenVisible>
          <Heading color="white" fontSize={{ base: '4xl', md: '5xl' }} textAlign="center">
            Get In Touch.
          </Heading>
        </SlideUpWhenVisible>

        <SlideUpWhenVisible>
          <Text fontSize="md" color="textSecondary" textAlign="center">
            {contactMe[0].fields.title}{' '}
            <chakra.span
              color="primaryColor"
              display={{ base: 'block', md: 'inline' }}
            >
              {' '}
              {contactMe[0].fields.highlightText}
            </chakra.span>
            <br />
            {contactMe[0].fields.description}
          </Text>
        </SlideUpWhenVisible>

        <SlideUpWhenVisible>
          <Stack isInline spacing={4}>
            <Link
              href="https://www.linkedin.com/in/jacwynn/"
              isExternal
              onClick={() => handleClick('contact_linkedin')}
            >
              <Button
                leftIcon={<FaLinkedin fill="#9bb5ce" />}
                position="static"
                size={isLargerThan800 ? 'md' : 'sm'}
                color="white"
              >
                LinkedIn
              </Button>
            </Link>
            <Link
              href="https://medium.com/@jacwynnjr"
              isExternal
              onClick={() => handleClick('contact_medium')}
            >
              <Button
                color="white"
                leftIcon={<FaMedium fill="#9bb5ce" />}
                transition="0.3s"
                position="static"
                size={isLargerThan800 ? 'md' : 'sm'}
              >
                Medium
              </Button>
            </Link>
            <Link
              href="/resume.pdf"
              isExternal
              onClick={() => handleClick('contact_resume')}
            >
              <Button
                leftIcon={<FaFileAlt fill="#9bb5ce" />}
                position="static"
                size={isLargerThan800 ? 'md' : 'sm'}
                color="white"
              >
                Resume
              </Button>
            </Link>
          </Stack>
        </SlideUpWhenVisible>
      </Stack>
    </>
  )
}
