import * as yup from 'yup'
import { addressSchema } from './addressSchema'

export const createGarageSchema = yup
  .object({
    address: addressSchema.required(),
    id: yup.string().optional(),
    name: yup.string().required()
  }).required()
