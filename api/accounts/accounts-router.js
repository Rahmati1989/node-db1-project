const router = require('express').Router()
const db = require('../../data/db-config')
// const dbModel = require("./accounts-model")
const { limit, del } = require('../../data/db-config')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await db.select("*").from("accounts")
    res.json(accounts)
  }catch(err) {
    next(err)
  }

})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
const budgets = await db.select("*")
.from("accounts")
.where("id", req.params.id)
res.json(budgets)
limit(1)
  }catch (err) {
    next(err)
  }

})

router.post('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const [id] = await db.insert({
      name: req.body.name,
      budget: req.body.budget
    }).into("accounts")
    const budgets = await db("accounts")
    .where("id",id)
    .first()
    res.status(201).json(budgets)
    
  }catch (err) {
    next(err)
  }
})

router.put('/:id', async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    await db("accounts")
    .update({
      name: req.body.name,
      budget: req.body.budget
    })
    .where("id", req.params.id)
    const budgets = await db("accounts")
    .where("id",id)
    .first()
    res.json(budgets)
  }catch(err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
try {
await db("accounts")
.where("id",req.params.id)
del()
}catch (err) {
  next(err)
}
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
  
})

module.exports = router;
