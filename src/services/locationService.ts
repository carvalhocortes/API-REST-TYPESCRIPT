import { Address, GeoCode } from '../types'
import axios from 'axios'
import * as geolib from 'geolib'
import { GOOGLE_API_KEY } from './../../.env'

export const getGeoCodeByAddress = async (address: Address): Promise<GeoCode> => {
  const addressString = `${address.street}, Cidade: ${address.city}, Estado: ${address.state}, CEP: ${address.cep}`
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${GOOGLE_API_KEY}`)
  const { lat, lng } = response.data.results[0].geometry.location
  return { latitude: lat, longitude: lng }
}

export const getAllInsideRadius = <T extends GeoCode>(center: GeoCode, radius: number, locations: T[]): T[] =>
  locations.filter(location => geolib.isPointWithinRadius(
    { latitude: location.latitude, longitude: location.longitude },
    center,
    radius
  ))
