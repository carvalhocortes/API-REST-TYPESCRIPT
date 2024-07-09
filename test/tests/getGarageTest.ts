import request from 'supertest'
import should from 'should'
import { app } from '../../src/server'
import { assembleCreateGarageRequest } from '../garageUtilsTest'

describe('Get Garage Test', () => {
  before(async () => {
    await request(app)
    .post('/garages')
    .send(assembleCreateGarageRequest({ id: 'TESTE' }))
  })
  it("Shouldn't get a inexistent garage ID", async () => {
    const res = await request(app).get('/garages/INEXISTENT_ID')
    should(res.status).be.eql(404)
  })
  it("Should get a garage", async () => {
    const res = await request(app).get('/garages/TESTE')
    should(res.status).be.eql(200)
    should(res.body).property('id').which.is.eql('TESTE')
  })
})
