import request from 'supertest'
import should from 'should'
import { app } from '../../src/server'
import { assembleCreateGarageRequest } from '../garageUtilsTest'

describe('Update Garage Test', () => {
  before(async () => {
    await request(app)
    .post('/garages')
    .send(assembleCreateGarageRequest({ id: 'TestUpdate' }))
  })
  it("Shouldn't update a inexistent garage ID", async () => {
    const res = await request(app).put('/garages/INEXISTENT_ID')
    should(res.status).be.eql(400)
  })
  it("Should update a garage", async () => {
    const address = {
      cep: '01328020',
      city: 'São Paulo',
      district: 'Bela Vista',
      number: '159',
      state: 'SP',
      street: 'Rua Dr. Luís Barreto'
    }
    const res = await request(app)
      .put('/garages/TestUpdate')
      .send({ name: 'Novo Nome', address })
    should(res.status).be.eql(202)
    should(res.body).property('name').which.is.eql('Novo Nome')
    should(res.body).property('address').which.is.deepEqual(address)
    should(res.body).property('latitude').which.is.eql(-23.556456)
    should(res.body).property('longitude').which.is.eql(-46.6474251)
  })
})
