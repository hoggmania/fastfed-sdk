import express from 'express';
import controller from './controller';

/*
Class that defines the routes (api) for the JWKS endpoint
 */
export default express.Router()
    .get('/keys', (req, res) => controller.get(req, res))

