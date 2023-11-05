import React, { useRef } from 'react'
import {
  Button,
  Flex,
  Box,
  Text,
  Slide,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Icon,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import useMediaQuery from '../hook/useMediaQuery'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Navbar({ enableTransition }) {
  const isLargerThan768 = useMediaQuery(768)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const Bracket = styled.span`
    color: #8f9094;
    font-weight: 600;
  `
  const NavbarDrawer = () => (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="gray.900">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px">
            <Text color="white">
              <Bracket>&#60;</Bracket> JW <Bracket>&frasl; &#62;</Bracket>
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <NextLink href="/" passHref>
                <Button
                  as="a"
                  color="white"
                  variant="ghost"
                  fontSize="16px"
                >
                  Home
                </Button>
              </NextLink>
              <NextLink href="/projects" passHref>
                <Button
                  as="a"
                  color="white"
                  variant="ghost"
                  fontSize="16px"
                >
                  Projects
                </Button>
              </NextLink>
              <NextLink href="/blog" passHref>
                <Button
                  as="a"
                  color="white"
                  variant="ghost"
                  fontSize="16px"
                >
                  Blog
                </Button>
              </NextLink>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

  return (
    <Box zIndex="99">
      <Slide
        direction="top"
        reverse
        in={true}
        transition={
          enableTransition
            ? { enter: { duration: 0.5, delay: 0.01 } }
            : { enter: { duration: 0, delay: 0 } }
        }
        background="black"
      >
        <Flex
          as="nav"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          px="3vw"
          py="3"
          borderBottom="0.5px solid #1e2029"
          background="black"
        >
          <NextLink href="/" passHref>
            <Text
              cursor="pointer"
              color="white"
              fontWeight="bold"
              fontSize="32px"
            >
              <Bracket>&#60;</Bracket> JW <Bracket>&frasl; &#62;</Bracket>
            </Text>
          </NextLink>
          {isLargerThan768 ? (
            <Box color="textSecondary">
              <NextLink href="/" passHref>
                <Button
                  as="a"
                  color="white"
                  variant="ghost"
                  p="4"
                  ml="3vw"
                  fontSize="13px"
                  textTransform="uppercase"
                  _hover={{ bg: 'primaryColor' }}
                >
                  Home
                </Button>
              </NextLink>
              <NextLink href="/projects" passHref>
                <Button
                  as="a"
                  color="white"
                  variant="ghost"
                  p="4"
                  ml="3vw"
                  fontSize="13px"
                  textTransform="uppercase"
                  _hover={{ bg: 'primaryColor' }}
                >
                  Projects
                </Button>
              </NextLink>
              <NextLink href="/blog" passHref>
                <Button
                  as="a"
                  color="white"
                  variant="ghost"
                  p="4"
                  ml="3vw"
                  fontSize="13px"
                  textTransform="uppercase"
                  _hover={{ bg: 'primaryColor' }}
                >
                  Blog
                </Button>
              </NextLink>{' '}
            </Box>
          ) : (
            <Icon
              as={AiOutlineMenu}
              w={7}
              h={7}
              color="white"
              onClick={onOpen}
            />
          )}
        </Flex>
      </Slide>
      <NavbarDrawer />
    </Box>
  )
}
