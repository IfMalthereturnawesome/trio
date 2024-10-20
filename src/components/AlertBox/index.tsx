import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Index: React.FC = () => {
  return (
    <Alert >
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>Please add an appropriate title.</AlertDescription>
    </Alert>
  )
}

export default Index
