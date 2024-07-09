import { InferType } from 'yup'
import { addressSchema } from '../schemas'

export type Address = InferType<typeof addressSchema>

export type Errors = {
  code: string
  httpCode: number
  message: string
}

export type GeoCode = {
  latitude: number
  longitude: number
}
