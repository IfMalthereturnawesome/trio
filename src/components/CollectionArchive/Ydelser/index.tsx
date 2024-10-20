import { cn } from '@/utilities/cn'
import React from 'react'

import type { Ydelser } from '@/payload-types'

import { Card } from '@/components/Card/Ydelser'

export type Props = {
  ydelser: Ydelser[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { ydelser } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {ydelser?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="ydelser"  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
