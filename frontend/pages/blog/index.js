import { useState } from 'react'
import { Stack, Heading, Text, Divider, Flex, Box } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../../components/Container'
import { FaSearch } from 'react-icons/fa'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import useMediaQuery from '../../hook/useMediaQuery'
import readingTime from 'reading-time'
import dateFormat from 'dateformat'

export default function Index({ articles }) {
  const [query, setQuery] = useState('')
  const handleChange = (e) => setQuery(e.target.value)
  const isLargerThan1024 = useMediaQuery(1024)

  return (
    <Container>
      <Head>
        <title>Blog - Jac Wynn</title>
        <meta name="title" content="Blog - Jac Wynn" />
        <meta
          name="description"
          content="Writings on programming, tutorials, and my experiences."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jacwynn.dev/blog" />
        <meta property="og:title" content="Blog - Jac Wynn" />
        <meta
          property="og:description"
          content="Writings on programming, tutorials, and my experiences."
        />
        <meta property="og:image" content="https://i.imgur.com/dWmBCSl.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jacwynn.dev/" />
        <meta property="twitter:title" content="Blog - Jac Wynn" />
        <meta
          property="twitter:description"
          content="Writings on programming, tutorials, and my experiences."
        />
        <meta
          property="twitter:image"
          content="https://i.imgur.com/dWmBCSl.png"
        />
      </Head>
      <Stack
        as="main"
        spacing={5}
        justifyContent="center"
        alignItems="flex-start"
        px={['5vw', '10vw']}
        my={['15vh', '15vh', '22.5vh', '22.5vh']}
      >
        <Heading color="white" fontSize={{ base: '4xl', md: '6xl' }}>
          Blog
        </Heading>
        <Text fontSize={{ base: '14px', md: '16px' }}>
          This is where I share my writings on programming, tutorials, and my
          experiences.
        </Text>
        <InputGroup maxW="400px">
          <InputRightElement pointerEvents="none" children={<FaSearch />} />
          <Input
            type="text"
            placeholder="Search articles"
            value={query}
            onChange={handleChange}
          />
        </InputGroup>
        <Divider />
        <Stack spacing={5}>
          {articles
            .filter((e) =>
              e.fields.title.toLowerCase().includes(query.toLowerCase()),
            )
            .map((article, index) => (
              <Stack
                key={index}
                direction={isLargerThan1024 ? 'row' : 'column'}
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Box
                  color="textSecondary"
                  display={isLargerThan1024 ? 'flex' : 'none'}
                  flexDirection={'column'}
                  minWidth={'7rem'} //TODO: edit to use theme values instead of custom
                >
                  <Text fontSize="sm">
                    {dateFormat(Date.parse(article.fields.date), 'mmm d yyyy')}
                  </Text>
                  <Text fontSize="sm">
                    {readingTime(article.fields.body).text}
                  </Text>
                </Box>
                <Text
                  color="textSecondary"
                  fontSize="sm"
                  display={isLargerThan1024 ? 'none' : 'block'}
                >
                  {dateFormat(Date.parse(article.fields.date), 'mmm d yyyy')}{' '}
                  <Box as="span" fontSize="xs">
                    &bull;
                  </Box>{' '}
                  {readingTime(article.fields.body).text}
                </Text>
                <Flex flexDirection="column" style={{ margin: '0' }}>
                  <Link href={'/blog/' + article.fields.slug}>
                    <a>
                      <Text
                        color="white"
                        fontSize="xl"
                        fontWeight="bold"
                        cursor="pointer"
                      >
                        {article.fields.title}
                      </Text>
                      <Text color="textSecondary">
                        {article.fields.summary}
                      </Text>

                      <Text color="primaryColor" cursor="pointer">
                        Learn more &rarr;
                      </Text>
                    </a>
                  </Link>
                </Flex>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </Container>
  )
}

let client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'blogPosts',
    limit: 50,
    order: 'sys.createdAt',
  })

  return {
    props: {
      articles: data.items.reverse(),
    },
  }
}
