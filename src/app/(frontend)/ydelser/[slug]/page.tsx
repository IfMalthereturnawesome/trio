import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { YdelseHero } from '@/heros/YdelseHero'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const ydelser = await payload.find({
    collection: 'ydelser',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return ydelser.docs?.map(({ slug }) => slug)
}

export default async function Ydelse({ params: { slug = '' } }) {
  const url = '/ydelser/' + slug
  const ydelse = await queryYdelseBySlug({ slug })

  if (!ydelse) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <YdelseHero ydelse={ydelse} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={ydelse.content}
            enableGutter={false}
          />
        </div>

        {ydelse.relatedPosts && ydelse.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={ydelse.relatedPosts.filter((ydelse) => typeof ydelse === 'object')}
          />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const ydelse = await queryYdelseBySlug({ slug })

  return generateMeta({ doc: ydelse })
}

const queryYdelseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'ydelser',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
