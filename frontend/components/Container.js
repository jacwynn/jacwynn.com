import React, { useEffect } from 'react'
import { chakra, Flex, Stack, Text } from '@chakra-ui/react'
import Navbar from './Navbar'
import ReactGA from 'react-ga'

const Container = ({ enableTransition, children }) => {
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_UA_CODE)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <>
      <Navbar enableTransition={enableTransition} />
      <Flex as="main" justifyContent="center" flexDirection="column">
        {children}
      </Flex>
      <Stack alignItems="center" mt={10} mb={5}>
        <Text textAlign="center" fontSize="sm">
          Built with{' '}
          <chakra.span fontWeight="semibold" color="primaryColor">
            Next.js
          </chakra.span>{' '}
          &{' '}
          <chakra.span fontWeight="semibold" color="primaryColor">
            Chakra UI
          </chakra.span>
          . Hosted on{' '}
          <chakra.span fontWeight="semibold" color="primaryColor">
            Vercel
          </chakra.span>
          .
        </Text>
      </Stack>
    </>
  )
}

export default Container
