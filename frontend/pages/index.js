import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import FeaturedProjects from '../components/FeaturedProjects'
import LatestArticle from '../components/LatestArticle'
import AboutMe from '../components/AboutMe'
import ContactMe from '../components/ContactMe'

export default function Index({ introduction, projects, articles, contactMe }) {
  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>Jac Wynn | Web Developer</title>
          <meta name="title" content="Jac Wynn | 👨🏾‍💻 Web Developer" />
          <meta
            name="description"
            content="I'm a web developer based in Pittsburgh, PA. I currently specialize in Salesforce Commerce Cloud, and I build websites and apps for people on the side."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jacwynn.dev" />
          <meta property="og:title" content="Jac Wynn | Web Developer" />
          <meta
            property="og:description"
            content="I'm a web developer based in Pittsburgh, PA. I currently specialize in Salesforce Commerce Cloud, and I build websites and apps for people on the side."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/wynnsolutions/image/upload/v1656783258/ogtags-image.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://jacwynn.dev/" />
          <meta property="twitter:title" content="Jac Wynn | Web Developer" />
          <meta
            property="twitter:description"
            content="I'm a web developer based in Pittsburgh, PA. I currently specialize in Salesforce Commerce Cloud, and I build websites and apps for people on the side."
          />
          <meta
            property="twitter:image"
            content="https://res.cloudinary.com/wynnsolutions/image/upload/v1656783258/ogtags-image.png"
          />
        </Head>

        <Stack
          as="main"
          spacing={28}
          justifyContent="center"
          alignItems="flex-start"
          px={{ base: '5vw', md: '10vw' }}
          mt={{ base: '15vh', md: '22.5vh' }}
        >
          <Introduction introduction={introduction} />
          <AboutMe />
          <FeaturedProjects projects={projects} />
          <LatestArticle articles={articles} />
          <ContactMe contactMe={contactMe} />
        </Stack>
      </Container>
    </>
  )
}

let client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'featuredProjects',
    order: 'fields.order',
  })

  let data2 = await client.getEntries({
    content_type: 'blogPosts',
    limit: 4,
    order: 'sys.createdAt',
  })

  let data3 = await client.getEntries({
    content_type: 'introduction',
    limit: 2,
    order: 'sys.createdAt',
  })

  let data4 = await client.getEntries({
    content_type: 'contactMe',
    limit: 1,
    order: 'sys.createdAt',
  })

  return {
    props: {
      projects: data.items,
      articles: data2.items.reverse(),
      introduction: data3.items,
      contactMe: data4.items,
    },
  }
}
