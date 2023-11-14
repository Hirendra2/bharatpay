const db = require("../models");
const axios = require("axios");
const VirtualAccount = db.virtualaccount;
const PayoutAccount = db.payoutaccount;
const Registration = db.registration;
const Op = db.Sequelize.Op;
const PayoutTransaction = db.payouttrxn;
const PayInTransaction = db.payintrxn;

exports.register = async (req, res) => {
    console.log(req.body)
    let name = req.body.name;
    let email_id = req.body.emailId;
    let password = req.body.password;
    let mobile_number = req.body.contact;

    const registration = {
        "name": name,
        "email": email_id,
        "contact": mobile_number,
        "password": password
    };
    // Save Registration in the database
    Registration.create(registration)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Virtual Account."
            });
        });
};

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Registration.findOne({
        where: { "email": email, "password": password }
    }).then(data => {
        if (data) {
            res.send({
                status: true, message: `Login Successfull`, data: data
            });
        } else {
            res.status(404).send({
                status: false, message: `Cannot find User Details`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: false,
            message: `Error retrieving User`
        });
    });
};

exports.createVirtualAccount = async (req, res) => {
    console.log(req.body)
    let userId = req.body.userId;
    let email_id = req.body.email_id;
    let mobile_number = req.body.mobile_number;
    let name = req.body.name;
    let account_number = req.body.account_number;
    let account_ifsc = req.body.account_ifsc;
    let bank = req.body.bank;

    if (bank == 'yes') {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.bharatpays.in/api/vpa/create?token=063ab60d627c3e4ee9f1ce6623bc8822&name=${name}&description=business&account_number=${account_number}&account_ifsc=${account_ifsc}`,
            headers: {}
        };
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    const virtualAccount = {
                        "virtual_account_id": response.data.data.virtual_account_id,
                        "virtual_account_number": response.data.data.virtual_account_number,
                        "virtual_ifsc": response.data.data.virtual_ifsc,
                        "name": response.data.data.name,
                        "email_id": email_id,
                        "mobile_number": mobile_number,
                        "created_at": response.data.data.created_at,
                        "userid": userId,
                        "bank": bank
                    };
                    // Save virtualAccount in the database
                    VirtualAccount.create(virtualAccount)
                        .then(data => {
                            res.status(201).send({
                                status: true, message: `Virtual Account Created Successfull`, data: data
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                status: false, message: `Unable to Create Virtual Account`, data: data
                            });
                        });
                }
                else {

                    res.status(500).send({
                        status: false, message: `Unable to Create Virtual Account`
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                res.json({ status: false, msg: error });
            });

    }
    if (bank == 'icici') {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.bharatpays.in/api/va/create_account?token=fab90b715d4d0f038708d9fa27926651&name=${name}&primary_contact=${mobile_number}&contact_type=Customer&email_id=${email_id}&mobile_number=${mobile_number}`,
            headers: {}
        };
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    const virtualAccount = {
                        "virtual_account_id": response.data.data.virtual_accounts_id,
                        "virtual_account_number": response.data.data.virtual_account_number,
                        "virtual_ifsc": response.data.data.virtual_account_ifsc_code,
                        "name": response.data.data.name,
                        "email_id": email_id,
                        "mobile_number": mobile_number,
                        "created_at": response.data.data.created_at,
                        "userid": userId,
                        "bank": bank
                    };
                    // Save virtualAccount in the database
                    VirtualAccount.create(virtualAccount)
                        .then(data => {
                            res.status(201).send({
                                status: true, message: `Virtual Account Created Successfull`, data: data
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                status: false, message: `Unable to Create Virtual Account`, data: data
                            });
                        });
                }
                else {

                    res.status(500).send({
                        status: false, message: `Unable to Create Virtual Account`
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                res.json({ status: false, msg: error });
            });

    }

};

exports.getVirtualAccount = async (req, res) => {
    console.log(req.params)
    const userId = req.params.id;
    const bank = req.params.bank;
    VirtualAccount.findOne({ where: { userid: userId, bank: bank } })
        .then(data => {
            if (data) {
                res.status(201).send({
                    status: true, message: `Virtual Account Found`, data: data
                });
            }
            else {
                res.status(500).send({
                    status: false, message: `Unable to Fetch Virtual Account`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false, message: `Unable to Fetch Virtual Account`
            });
        });
};

exports.createPayoutAccount = async (req, res) => {
    console.log(req.body);

    let userId = req.body.userId;
    let bene_account_number = req.body.bene_account_number;
    let ifsc_code = req.body.ifsc_code;
    let recepient_name = req.body.recepient_name;
    let email_id = req.body.email_id;
    let mobile_number = req.body.mobile_number;
    let bank = req.body.bank;

    let token;

    if (bank == 'yes') {
        token = '063ab60d627c3e4ee9f1ce6623bc8822';
    }
    if (bank == 'icici') {
        token = 'fab90b715d4d0f038708d9fa27926651';
    }



    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.bharatpays.in/api/va/create_payout_account?token=${token}&bene_account_number=${bene_account_number}&ifsc_code=${ifsc_code}&recepient_name=${recepient_name}&email_id=${email_id}&mobile_number=${mobile_number}`,
        headers: {}
    };
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.success) {
                const payoutAccount = {
                    "bank_account_id": response.data.data.bank_account_id,
                    "bene_account_number": response.data.data.bene_account_number,
                    "ifsc_code": response.data.data.ifsc_code,
                    "recepient_name": response.data.data.recepient_name,
                    "primary_contact": response.data.data.primary_contact,
                    "email_id": response.data.data.email_id,
                    "mobile_number": response.data.data.mobile_number,
                    "status": response.data.data.status,
                    "remark": response.data.data.remark,
                    "userid": userId,
                    "bank": bank
                };

                // Save PayoutAccount in the database
                PayoutAccount.create(payoutAccount)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Virtual Account."
                        });
                    });
            }
            else {
                let resp = { "status": false, "message": response.data.message };
                res.json(resp);
            }
        })
        .catch((error) => {
            res.json({ status: false, msg: error });
        });
};

exports.getPayoutAccount = async (req, res) => {
    const userId = req.params.id;
    const bank = req.params.bank;
    PayoutAccount.findAll({ where: { userid: userId, bank: bank } })
        .then(data => {
            if (data) {
                res.status(201).send({
                    status: true, message: `Payout Account Found`, data: data
                });
            }
            else {
                res.status(500).send({
                    status: false, message: `Unable to Fetch Payout Account`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false, message: `Unable to Fetch Virtual Account`
            });
        });

};

exports.removeBankDetails = async (req, res) => {

    let userId = req.body.userId;
    let recordID = req.body.id;
    try {
        pool.getConnection(function (err, connection) {

            if (err) {
                res.json({ "status": false, "message": "Connection failed" });
            } else {
                try {
                    connection.query(" DELETE  FROM payoutaccounts  WHERE id = " + recordID + " AND  tdk_userid=" + userId, async function (err, result, fields) {
                        if (err) {
                            console.log(err);

                            res.json({ "status": false, "message": "failed" });
                        } else {
                            res.json({ "status": true, "message": "Account Successfully deleted" });
                        }
                    });
                } catch (err) {
                    console.log(err)
                } finally {
                    connection.release();
                }
            }
        });
    } catch (err) {
        res.json({ status: false, msg: err });
    }

};

exports.createPayout = async (req, res) => {

    let userId = req.body.userId;
    let amount = req.body.amount;
    let ref_id = Math.floor(Math.random() * 899999 + 100000);
    let bank_account_id = req.body.bank_account_id;
    let bank = req.body.bank;

    console.log(req.body);

    let token;

    if (bank == 'yes') {
        token = '063ab60d627c3e4ee9f1ce6623bc8822';
    }
    if (bank == 'icici') {
        token = 'fab90b715d4d0f038708d9fa27926651';
    }
    let created_url = `https://api.bharatpays.in/api/va/create_payout?token=${token}&amount=${amount}&purpose=withdraw&ref_id=${ref_id}&txn_type=IMPS&bank_account_id=${bank_account_id}`;
	console.log(created_url)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.bharatpays.in/api/va/create_payout?token=${token}&amount=${amount}&purpose=withdraw&ref_id=${ref_id}&txn_type=IMPS&bank_account_id=${bank_account_id}`,
        headers: {}
    };
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));

            if (response.data.success) {

                const payoutTrxn = {
                    order_id: response.data.data.order_id,
                    bank_account_id: response.data.data.bank_account_id,
                    amount: response.data.data.amount,
                    status: response.data.data.status,
                    bank_remark: response.data.data.bank_remark,
                    ref_id: response.data.data.ref_id,
                    created_at: response.data.data.created_at,
                    userid: userId
                }

                // Save PayoutAccount in the database
                PayoutTransaction.create(payoutTrxn)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Payout Transaction."
                        });
                    });

            }
            else {
                let response = { "status": false, "message": response.data.message };
                res.json(response);
            }
        })
        .catch((error) => {
            res.json({ status: false, msg: error });
        });
};

exports.callback = async (req, res) => {
    console.log(req.body)
    console.log(req.param)
    const payinTrxn = {
        type: req.body.type,
        status: req.body.status,
        amount: req.body.amount,
        bank_ref_id: req.body.bank_ref_id,
        payment_mode: req.body.payment_mode,
        virtual_accounts_id: req.body.virtual_accounts_id,
        created_at: req.body.created_at
    }

    // Save Payin in the database
    PayInTransaction.create(payinTrxn)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Payin Transaction."
            });
        });



};

exports.getTransactions = async (req, res) => {
    console.log(req.params)

};





