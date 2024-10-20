import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive/Ydelser'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })

  const ydelser = await payload.find({
    collection: 'ydelser',
    depth: 1,
    limit: 12,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Ydelser vi tilbyder</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="ydelser"
          currentPage={ydelser.page}
          limit={12}
          totalDocs={ydelser.totalDocs}
        />
      </div>

      <CollectionArchive ydelser={ydelser.docs} />

      <div className="container">
        {ydelser.totalPages > 1 && ydelser.page && (
          <Pagination page={ydelser.page} totalPages={ydelser.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
