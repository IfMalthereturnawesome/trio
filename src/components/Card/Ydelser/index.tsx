'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Ydelser } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent, CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Ydelser
  relationTo?: 'ydelser'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, card: cardData } = doc || {}
  const { description, image: metaImage } = meta || {}
  const { cardDescription, bulletPoints } = cardData || {}
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <ShadcnCard className={cn('hover:cursor-pointer', className)} ref={card.ref}>
      {/* Render the image if available */}
      {metaImage && typeof metaImage !== 'string' && (
        <div className="relative w-full">
          <Media resource={metaImage} size="360px" />
        </div>
      )}

      {/* Card Header with Title and Description */}
      <CardHeader>
        {titleToUse && (
          <CardTitle>
            <Link href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </CardTitle>
        )}
        {(cardDescription?.trim() || sanitizedDescription) && (
          <CardDescription>{cardDescription?.trim() || sanitizedDescription}</CardDescription>
        )}
      </CardHeader>

      {/* Render Bullet Points if available */}
      {bulletPoints && (
        <CardContent>
          <RichText
            enableProse
            className={'prose mx-0 p-0 my-0 marker:text-primary'}
            content={bulletPoints}
          />
        </CardContent>
      )}

      {/*  Add a footer with a button */}
      <CardFooter>
        <Link href={href} ref={link.ref}>
          <Button variant="default">Se mere</Button>
        </Link>
      </CardFooter>
    </ShadcnCard>
  )
}
