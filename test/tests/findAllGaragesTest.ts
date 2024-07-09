import request from 'supertest'
import should from 'should'
import { app } from '../../src/server'
//import { assembleCreateGarageRequest } from '../garageUtilsTest'

describe('Find All Garages Test', () => {
  it("Should find all garages", async () => {
    const res = await request(app).get('/garages')
    should(res.status).be.eql(200)
    should(res.body).be.a.Object()
    res.body.length.should.be.eql(3)
  })
})
