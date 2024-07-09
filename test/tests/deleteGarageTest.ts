import request from 'supertest'
import should from 'should'
import { app } from '../../src/server'
import { assembleCreateGarageRequest } from '../garageUtilsTest'

describe('Delete Garage Test', () => {
  before(async () => {
    await request(app)
    .post('/garages')
    .send(assembleCreateGarageRequest({ id: 'TestDelete' }))
  })
  it("Shouldn't delete a inexistent garage ID", async () => {
    const res = await request(app).delete('/garages/INEXISTENT_ID')
    should(res.status).be.eql(404)
  })
  it("Should delete a garage", async () => {
    const res = await request(app).delete('/garages/TestDelete')
    should(res.status).be.eql(204)
  })
})
