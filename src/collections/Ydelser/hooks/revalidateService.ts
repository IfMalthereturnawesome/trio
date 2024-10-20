import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Ydelser } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Ydelser> = ({
                                                                  doc,
                                                                  previousDoc,
                                                                  req: { payload },
                                                                }) => {
  if (doc._status === 'published') {
    const path = `/ydelser/${doc.slug}`

    payload.logger.info(`Revalidating post at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/ydelser/${previousDoc.slug}`

    payload.logger.info(`Revalidating old ydelser at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
