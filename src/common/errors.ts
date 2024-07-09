import { Errors } from '../types'
import * as yup from 'yup'

const errorMessages = {
  requestValidationError: ({ message }: yup.ValidationError): Errors => ({
    code: 'VALIDATION_ERROR',
    httpCode: 400,
    message
  }),
  garageNotFound: (id: string): Errors => ({
    code: 'NOT_FOUND',
    httpCode: 404,
    message: `Garage id: ${id} not found`
  }),
  unknownError: (): Errors => ({
    code: 'UNKNOWN_ERROR',
    httpCode: 500,
    message: `Internal error`
  })
}

export default errorMessages
