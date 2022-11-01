import express = require ('express')
import middleware from '../middleware/middleware'
import * as controller from '../controller/usercontroller'
import { RouterProps } from '../types'
const Router:RouterProps=express.Router()

Router.post('/signup',middleware,controller.SignIn)
Router.post('/login',middleware,controller.LoginValidation)
Router.get('/authstatus',middleware,controller.AuthStatus)
Router.post('/forgetpassword',middleware,controller.Forgetpassword)
Router.post('/resetpassword/:token',middleware,controller.resetpassword)

export default Router