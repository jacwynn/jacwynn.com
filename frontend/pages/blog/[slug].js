import { useEffect, useState } from 'react'
import { Avatar, Text, Heading, Stack } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import { ArticleJsonLd, NextSeo } from 'next-seo'

import mdxPrism from 'mdx-prism'
import dateFormat from 'dateformat'
import readingTime from 'reading-time'

import Image from '../../components/ChakraNextImage'
import Container from '../../components/Container'
import PostContainer from '../../components/PostContainer'
import MDXComponents from '../../components/MDXComponents'

export default function Post({ metadata, source }) {
  return (
    <>
      <NextSeo
        title={metadata.title}
        description={metadata.summary}
        canonical={`https://jacwynn.dev/blog/${metadata.slug}`}
        openGraph={{
          url: `https://jacwynn.dev/blog/${metadata.slug}`,
          site_name: 'Jac Wynn',
          title: metadata.title,
          description: metadata.summary,
          type: 'article',
          article: {
            authors: ['Jac Wynn'],
            publishedTime: metadata.date,
            modifiedTime: metadata.date,
            tags: ['Programming', 'Web Development', 'Front End Developering'],
          },
          images: [
            {
              url: metadata.image,
              alt: metadata.title,
            },
          ],
        }}
        additionalMetaTags={[
          { property: 'twitter:card', content: 'summary_large_image' },
          {
            property: 'twitter:url',
            content: `https://jacwynn.dev/blog/${metadata.slug}`,
          },
          { property: 'twitter:title', content: metadata.title },
          { property: 'twitter:description', content: metadata.summary },
          { property: 'twitter:image', content: metadata.image },
        ]}
      />
      <ArticleJsonLd
        url={`https://jacwynn.dev/blog/${metadata.slug}`}
        title={metadata.title}
        images={[metadata.image]}
        datePublished={metadata.date}
        dateModified={metadata.date}
        authorName="Jac Wynn"
        publisherName="Jac Wynn"
        publisherLogo="https://res.cloudinary.com/wynnsolutions/image/upload/v1656741119/blog-me.png"
        description={metadata.summary}
      />
      <Container>
        <Stack my="15vh" justifyContent="center" alignItems="center">
          <Stack
            w={['100vw', '95vw']}
            maxW="680px"
            p={['20px', '20px', '24px', '24px']}
          >
            <Heading
              fontSize={['3xl', '3xl', '5xl', '5xl']}
              color="white"
            >
              {metadata.title}
            </Heading>
            <Stack
              py={4}
              direction={{ base: 'column', md: 'row' }}
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Stack isInline alignItems="center">
                <Avatar
                  name="Jac Wynn"
                  size="xs"
                  src="https://res.cloudinary.com/wynnsolutions/image/upload/v1656741119/blog-me.png"
                  border="1px solid textPrimary"
                />
                <Text fontSize={['xs', 'xs', 'sm', 'sm']} color="textPrimary">
                  Jac Wynn /{' '}
                  {dateFormat(Date.parse(metadata.date), 'mmmm d, yyyy')}
                </Text>
              </Stack>
              <Stack>
                {/* <Text fontSize={['xs', 'xs', 'sm', 'sm']} color="textSecondary">
                  {metadata.readingTime} &bull; {views} views
                </Text> */}
              </Stack>
            </Stack>
            <Stack
              bg="gray.900"
              borderRadius="10px"
              minH="200px"
              border="1px"
              borderColor={{ base: '#333', md: 'borderColor' }}
            >
              <Image
                src={metadata.image}
                borderRadius="10px"
                width={1367}
                height={892}
                objectFit="cover"
                w="auto"
                h="auto"
                mx="auto"
                alt=""
                priority
              ></Image>
            </Stack>
            <PostContainer>
              <MDXRemote {...source} components={MDXComponents} />
            </PostContainer>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

let client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticPaths() {
  let data = await client.getEntries({
    content_type: 'blogPosts',
  })
  return {
    paths: data.items.map((item) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  let data = await client.getEntries({
    content_type: 'blogPosts',
    'fields.slug': params.slug,
  })

  const article = data.items[0].fields
  const source = article.body
  article.readingTime = readingTime(source).text
  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [mdxPrism],
    },
  })

  // const views = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/views/${params.slug}`,
  // )
  //   .then((res) => res.json())
  //   .then((json) => json.views)

  return {
    props: {
      metadata: article,
      source: mdxSource,
      // views: views,
    },
    revalidate: 30,
  }
}
