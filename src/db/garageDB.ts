
import { Garage } from '../types'

const garages = new Map<string, Garage>()

export const get = (id: string): Promise<Garage | void> => {
  const garage = garages.get(id)
  return Promise.resolve(garage)
}

export const findAll = (): Promise<Garage[]> => {
  return Promise.resolve(Array.from(garages.values()))
}

export const save = (newGarage: Garage): Promise<Garage> => {
  garages.set(newGarage.id, newGarage)
  return Promise.resolve(newGarage)
}

export const update = (updatedGarage: Garage): Promise<Garage> => {
  garages.set(updatedGarage.id, updatedGarage)
  return Promise.resolve(updatedGarage)
}

export const remove = (id: string): Promise<void> => {
  garages.delete(id)
  return Promise.resolve()
}
