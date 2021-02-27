const router = require('express').Router()
const dbModel = require('./accounts-model')
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require("./accounts-middleware")

// const dbModel = require("./accounts-model")
const { limit, del } = require('../../data/db-config')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
		const accounts = await dbModel.getAll();
		res.json(accounts);
	} catch (err) {
		next(err);
	}

})

router.get('/:id', checkAccountId(), async (req, res, next) => {
  // DO YOUR MAGIC
 try {
		const account = await dbModel.getById(req.params.id);
		res.status(200).json(account);
	} catch (err) {
		next(err)
	}
})

router.post('/', checkAccountPayload(), checkAccountNameUnique(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
		const account = await dbModel.create(req.body);
		res.status(201).json(account);
	} catch (err) {
		next(err);
	}
})

router.put('/:id', checkAccountPayload(), checkAccountId(), async (req, res, next) => {
  // DO YOUR MAGIC
  try {
		const account = await accountsModel.updateById(req.params.id, req.body);
		res.status(200).json(account);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
try {
		accountsModel.deleteById(req.params.id);
		res.status(200).json({
			message: 'Account has been deteled.'
		});
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
  
})

module.exports = router;
