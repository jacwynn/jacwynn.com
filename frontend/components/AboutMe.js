import {
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  Link,
  Box,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'

import useMediaQuery from '../hook/useMediaQuery'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga'

export default function AboutMe() {
  const isLargerThan800 = useMediaQuery(800)
  const handleHover = (event) => {
    ReactGA.event({
      category: 'hover',
      action: event,
    })
  }
  const MoreInfo = ({ text, content }) => {
    return (
      <>
        {' '}
        {isLargerThan800 ? (
          <Popover trigger="hover" placement="right" isLazy>
            <PopoverTrigger>
              <chakra.span
                onMouseOver={() => handleHover(`about_${text}`)}
                color="primaryColor"
                cursor="help"
              >
                {text}
              </chakra.span>
            </PopoverTrigger>
            <PopoverContent
              bg="gray.900"
              borderColor="primaryColor"
              color="white"
              w={'40rem'}
            >
              <PopoverArrow bg="textSecondary" />
              <PopoverBody fontSize="sm" color="textPrimary">
                {content}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Text as="span" color="primaryColor">
            {text}
          </Text>
        )}{' '}
      </>
    )
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <SlideUpWhenVisible>
          <Stack spacing={4}>
            <Heading fontFamily="Ubuntu" color="#FFF" fontSize="2xl">
              A Little About Me...
            </Heading>
            <Text
              color="textSecondary"
              fontSize={{ base: '14px', md: '16px' }}
              whiteSpace="pre-line"
            >
              Hey! I'm Jac, I'm based out of{' '}
              <MoreInfo
                text="Pittsburgh, PA"
                content={<Image src="/images/pittsburgh.jpg" />}
              />{' '}
              and I've been in the web industry for nearly a decade.
              <br />
              <br />
              Growing up, I've always had a knack for computers. I can remember
              taking things apart and always being curious about how things
              worked.
              <br />
              <br />
              Throughout my career, I've done work on both the front and back
              end. However, I'm more comfortable on the front end and enjoy
              building modern, responsive, and performant websites.
              <br />
              <br />
              For the last 5 years, I've been working as a
              <MoreInfo
                text="Certified Salesforce Commerce Cloud"
                content={
                  <Link href="https://trailblazer.me/id/jwynn" isExternal>
                    <Image
                      src="/images/certified.png"
                      w="full"
                      objectFit="cover"
                    />
                  </Link>
                }
              />{' '}
              developer. This has allowed me to work on some of today's
              well-known brands and showcase my work to millions of people.
              <br />
              <br />
              Other than being on the computer all day, I enjoy being with
              family and friends, playing chess, and shooting hoops.
            </Text>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
          <Flex alignItems="center" justifyContent="center" position="relative">
            <Box
              maxW={{ base: '300px', lg: '350px' }}
              maxH={{ base: '300px', lg: '350px' }}
            >
              <Image
                src="https://svgsilh.com/svg/26432.svg"
                filter="invert(0.1)"
                zIndex={3}
                position="absolute"
                top={0}
                right={0}
                w={{ base: '100px', lg: '150px' }}
                alt=""
              />
              <Image
                src="/images/me.png"
                borderRadius={'50%'}
                w={{ base: '300px', lg: '350px' }}
                h={{ base: '300px', lg: '350px' }}
                loading="eager"
                alt="Jac Wynn"
              />
            </Box>
          </Flex>
        </SlideUpWhenVisible>
      </SimpleGrid>
    </>
  )
}
