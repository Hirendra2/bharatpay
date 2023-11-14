module.exports = app => {
    const virtualcontroller = require("../controllers/virtualaccount.controller.js"); 
    var router = require("express").Router();

    router.post("/register", virtualcontroller.register);
    router.post("/login", virtualcontroller.login);
    
    router.post("/createVirtualAccount", virtualcontroller.createVirtualAccount);
    router.post("/createPayoutAccount", virtualcontroller.createPayoutAccount)
    router.post("/createPayout", virtualcontroller.createPayout);
    router.post("/removeBankDetails", virtualcontroller.removeBankDetails)
    
    router.get("/getPayoutAccount/:id/:bank", virtualcontroller.getPayoutAccount);
    router.get("/getVirtualAccount/:id/:bank", virtualcontroller.getVirtualAccount);

    router.get("/getTransactions/:id/:bank/:action", virtualcontroller.getTransactions);

    router.post("/callback", virtualcontroller.callback);

    app.use('/api/bharatpay', router);
  };