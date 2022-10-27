import express = require ('express')
import middleware from '../middleware/middleware'
import * as controller from '../controller/usercontroller'
import { RouterProps } from '../types'
const Router:RouterProps=express.Router()

Router.post('/signin',middleware,controller.SignIn)
Router.post('/login',middleware,controller.LoginValidation)

export default Router