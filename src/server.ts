import express, { Request, Response } from 'express'
import * as garageController from './controllers/garageController'

export const app = express()
const port = 3000

app.use(express.json())

app.get('/garages', async (req: Request, res: Response) => garageController.findAllGarages(res))

app.get('/garages/:id', async (req: Request, res: Response) => garageController.getGarageById(req, res))

app.post('/garages', async (req: Request, res: Response) => garageController.createGarage(req, res))

app.put('/garages/:id', async (req: Request, res: Response) => garageController.updateGarage(req, res))

app.delete('/garages/:id', async (req: Request, res: Response) => garageController.deleteGarage(req, res))

app.get('/garagesNear', async (req: Request, res: Response) => garageController.findAllNearGarages(req, res))

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
