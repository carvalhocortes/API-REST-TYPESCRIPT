import { Request, Response } from 'express'
import * as garageService from '../services/garageServices'
import * as validateUtils from '../util/validateUtils'
import errorMessages from '../common/errors'
import { createGarageSchema, findAllNearGaragesSchema, updateGarageSchema } from '../schemas'
import { Errors, FindAllNearGaragesRequest } from '../types'

const validate = validateUtils.validate(errorMessages.requestValidationError)

export const findAllGarages = (res: Response) =>
  garageService.findGarages()
  .then((garages) => res.json(garages))
  .catch((error) => assembleErrorResponse(error, res))

export const getGarageById = ({ params }: Request, res: Response) =>
  garageService.getGarage(params.id)
  .then((garage) => res.json(garage))
  .catch((error) => assembleErrorResponse(error, res))

export const
createGarage = ({ body }: Request, res: Response) => {
  try {
    validate(createGarageSchema, body)
    return garageService.createGarage(body)
    .then((garage) => res.status(201).json(garage))
  } catch (error) {
    return assembleErrorResponse(error, res)
  }
}

export const updateGarage = ({ body, params }: Request, res: Response) => {
  try {
    validate(updateGarageSchema, body)
    return garageService.updateGarage(params.id, body)
    .then((garage) => res.status(202).json(garage))
  } catch (error) {
    return assembleErrorResponse(error, res)
  }
}

export const deleteGarage = ({ params}: Request, res: Response) =>
  garageService.deleteGarage(params.id)
  .then(() => res.status(204).send())
  .catch((error) => assembleErrorResponse(error, res))

export const findAllNearGarages = ({ query }: Request, res: Response) => {
  try {
    validate(findAllNearGaragesSchema, query)
    return garageService.findAllNearGarages(query as FindAllNearGaragesRequest)
    .then((garages) => res.json(garages))
  } catch (error) {
    return assembleErrorResponse(error, res)
  }
}

// PRIVATE

const assembleErrorResponse = (error: Errors, res: Response): Response => {
  if (!error.code) return res.status(errorMessages.unknownError().httpCode).send(errorMessages.unknownError())
  const assembledMessageError = {
    httpCode: error.httpCode,
    message: error.message,
    internalError: error.code
  }
  return res.status(error.httpCode).send(assembledMessageError)
}
