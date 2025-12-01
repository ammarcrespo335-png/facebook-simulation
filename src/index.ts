// index.ts
import express from 'express'
import { bootstrap } from './bootstrap'
import router from './modules/Routes'

const app = express()

app.use(express.json())
app.use('/api/v1', router) 

bootstrap()
