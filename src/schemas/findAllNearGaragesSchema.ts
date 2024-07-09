import * as yup from 'yup'

export const findAllNearGaragesSchema = yup
  .object({
    lat: yup.string().required(),
    long: yup.string().required(),
    radius: yup.string().required()
  }).required()
