
import { v4 as uuid } from 'uuid'
import { Address, CreateGarageRequest } from '../src/types'

export const assembleCreateGarageRequest = ({ id = uuid(), name = 'Oficina Teste', address = assembleGarageAddress() }: Partial<CreateGarageRequest> ={}): CreateGarageRequest => ({
  id,
  name,
  address
})

export const assembleGarageAddress = ({
  cep = '02034000',
  city = 'São Paulo',
  complement = 'Sala 86',
  district = 'Santana',
  number = '51',
  state = 'SP',
  street = 'Rua Ezequiel Freire'
}: Partial<Address> = {}): Address => ({
  cep,
  city,
  complement,
  district,
  number,
  state,
  street
})
