import * as yup from 'yup'

const cepRegex = /^\d{8}$/
const ufRegex = /^(A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[ABREI]|R[JNSOR]|S[CPE]|TO)$/i

export const addressSchema = yup
  .object({
    cep: yup.string().matches(cepRegex, { message: 'The field ${path} does not have a valid ZIP code.' }).required(),
    city: yup.string().required(),
    complement: yup.string().optional(),
    district: yup.string().required(),
    number: yup.string().required(),
    state: yup.string().matches(ufRegex, { message: 'The field ${path} has an invalid state (UF).' }).required(),
    street: yup.string().required()
  }).required()
