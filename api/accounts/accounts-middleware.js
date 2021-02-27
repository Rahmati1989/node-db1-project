const accountModle = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (req.body.name === undefined || req.body.budget === undefined) {
		return res.status(400).json({
			message: 'name and budget required.'
		})
	}
	if (typeof req.body.name !== 'string' || req.body.name === 0) {
		return res.status(400).json({
			message: 'Name of account must be a string.'
		})
	}
	if (req.body.name.length < 3 || req.body.name.length > 100) {
		return res.status(400).json({
			message: 'Name of account must be between 3 and 100.'
		})
	}
	if (typeof req.body.budget === 'string') {
		return res.status(400).json({
			message: 'Budget of account must be a number.'
		})
	}
	if (req.body.budget < 0 || req.body.budget > 1000000) {
		return res.status(400).json({
			message: 'Budget of account is too large or too small.'
		})
	}
	next();

}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
const accounts = await accountModle.getAll()
const [account] = accounts.filter(acnt => acnt.name === req.body.name)
if(account.name === req.body.name) {
  return res.status(400).json({Message: "The name is already taken "})
}
  else{
    next();
  }
}


exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await accountModle.getById(req.params.id)
    if(account) {
      next()
    }else{
      res.status(404).json({Message: "account not found"})
    }
  }catch(err) {
    next(err)
  }
}
