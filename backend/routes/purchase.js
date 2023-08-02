const express=require('express');
const route=express.Router();
const middleware=require('../middlewares/token')
const purchaseController=require('../controllers/purchase');
route.get('/buypremium',middleware.jwtCheck,purchaseController.buyPremium);
module.exports=route;