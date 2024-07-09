import request from 'supertest'
import should from 'should'
import { app } from '../../src/server'
import { assembleCreateGarageRequest } from '../garageUtilsTest'

describe('Create Garage Test', () => {
  it("shouldn't create a garage with incorrect payload", async () => {
    const res = await request(app)
    .post('/garages')
    .send({ name: 'Nova Oficina', id: '2134' })
    should(res.status).be.eql(400)
  })
  it("Should create a garage", async () => {
    const newGarage = assembleCreateGarageRequest({ name: 'Nova Oficina', id: '2134' })
    const res = await request(app)
    .post('/garages')
    .send(newGarage)
    should(res.status).be.eql(201)
    should(res.body).property('id').which.is.eql(newGarage.id)
    should(res.body).property('name').which.is.eql(newGarage.name)
    should(res.body).property('address').which.is.deepEqual(newGarage.address)
    should(res.body).property('latitude').which.is.eql(-23.5047565)
    should(res.body).property('longitude').which.is.eql(-46.623657)
  })
})
