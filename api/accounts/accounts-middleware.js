exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const checkName = req.accounts.map(account => account.name == req.body.name)
  if(checkName) {
    res.status(400).json({error: "That name is already taken"})
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
   const account = req.accounts.map(account => account.id == req.params.id)
  if(!account) {
    res.status(400).json({error: "account not found"})
  } else {
    req.accountInfo === account
    next()
  }

}
