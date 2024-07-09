
import { v4 as uuid } from 'uuid'
import { CreateGarageRequest, Garage, FindAllNearGaragesRequest, UpdateGarageRequest } from '../types'
import * as garageDB from '../db/garageDB'
import * as locationService from './locationService'
import errorMessages from '../common/errors'

export const findGarages = (): Promise<CreateGarageRequest[]> => garageDB.findAll()

export const getGarage = (id: string): Promise<CreateGarageRequest> => getValidGarage(id)

export const createGarage = async (data: CreateGarageRequest): Promise<Garage> => {
  const garage = data.id ? await garageDB.get(data.id) : undefined
  if (garage) return garage
  const geoCode = await locationService.getGeoCodeByAddress(data.address)
  const newGarage = {
    id: data.id || uuid(),
    ...data,
    ...geoCode }
  return garageDB.save(newGarage)
}

export const updateGarage = async (id: string, data: UpdateGarageRequest): Promise<Garage> => {
  const garage = await getValidGarage(id)
  const updateGarageData = {
    id,
    name: data.name || garage.name,
    address: data.address || garage.address,
    latitude: garage.latitude,
    longitude: garage.longitude
  }
  if (data.address) {
    const geoCode = await locationService.getGeoCodeByAddress(data.address)
    updateGarageData.latitude = geoCode.latitude
    updateGarageData.longitude = geoCode.longitude
  }
  return garageDB.update(updateGarageData)
}

export const deleteGarage = async (id: string): Promise<void> => {
  const garage = await getValidGarage(id)
  return garageDB.remove(garage.id)
}

export const findAllNearGarages = async (request: FindAllNearGaragesRequest): Promise<Garage[]> => {
  const garages = await garageDB.findAll()
  const radius = Number(request.radius) * 1000
  const point = {
    latitude: Number(request.lat),
    longitude: Number(request.long)
  }
  return locationService.getAllInsideRadius(point, radius, garages)
}

// PRIVATE

const getValidGarage = async (id: string): Promise<Garage> => {
  const garage = await garageDB.get(id)
  if (!garage) throw errorMessages.garageNotFound(id)
  return garage
}
