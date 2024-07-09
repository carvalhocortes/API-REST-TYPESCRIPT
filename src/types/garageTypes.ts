import { InferType } from 'yup'
import { createGarageSchema, findAllNearGaragesSchema, updateGarageSchema } from '../schemas'
import { Address } from './commonTypes'

export type CreateGarageRequest = InferType<typeof createGarageSchema>

export type UpdateGarageRequest = InferType<typeof updateGarageSchema>

export type FindAllNearGaragesRequest = InferType<typeof findAllNearGaragesSchema>

export type Garage = {
  id: string
  name: string
  address: Address
  latitude: number
  longitude: number
}
