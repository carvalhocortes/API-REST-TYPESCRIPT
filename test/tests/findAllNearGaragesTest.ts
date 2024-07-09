import request from 'supertest'
import should from 'should'
import { app } from '../../src/server'
import { assembleCreateGarageRequest, assembleGarageAddress } from '../garageUtilsTest'

describe('Find All Near Garage Test', () => {
  before(async () => {
    await request(app)
      .post('/garages')
      .send(assembleCreateGarageRequest({ id: 'Perto 1', address: assembleGarageAddress({street: 'Av. Braz Leme', number: '2378', cep: '02022020' })}))
    await request(app)
      .post('/garages')
      .send(assembleCreateGarageRequest({ id: 'Perto 2', address: assembleGarageAddress({street: 'Av. Gen. Ataliba Leonel', number: '1555', cep: '02033010', district: 'Carandiru' })}))
})
  it("shouldn't find near garage with incorrect payload", async () => {
    const res = await request(app)
      .get('/garagesNear')
      .query({ lat: '-23.5056925', radius: '1' })
    should(res.status).be.eql(400)
  })
  it("Should find near garage", async () => {
    const res = await request(app)
      .get('/garagesNear')
      .query({ lat: '-23.5056925', long: '-46.6239133', radius: '1' })
    should(res.status).be.eql(200)
    should(res.body).be.a.Object()
    res.body.length.should.be.eql(2)
  })
})
