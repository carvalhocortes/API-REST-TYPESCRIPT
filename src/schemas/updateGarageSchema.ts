import * as yup from 'yup'
import { addressSchema } from './addressSchema'

export const updateGarageSchema = yup
  .object({
    address: addressSchema.optional(),
    name: yup.string().optional()
  })
  .required()
