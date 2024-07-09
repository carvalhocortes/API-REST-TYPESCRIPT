import { AnyObjectSchema, ValidateOptions, ValidationError } from 'yup'
import { Errors } from '../types'

export const validate =
  (errorFunction: (error: ValidationError) => Errors) =>
  <T = unknown>(schema: AnyObjectSchema, objectToBeValidated: unknown, options: ValidateOptions = { strict: false }): T => {
    try {
      return schema.validateSync(objectToBeValidated, options)
    } catch (err) {
      if (err instanceof ValidationError) throw errorFunction(err)
      throw err
    }
  }
