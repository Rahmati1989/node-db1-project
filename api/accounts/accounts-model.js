const db = require("../../data/db-config")

const getAll = () => {
  // DO YOUR MAGIC
   db.select("*").from("accounts")
}

const getById = id => {
  // DO YOUR MAGIC
  db.select("*").from("accounts").where(id)

}

const create = async account => {
  // DO YOUR MAGIC
db("accounts").insert(account)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
   db("accounts").where(id).insert(account)
}

const deleteById = async id => {
  // DO YOUR MAGIC
   db("Accounts").where(id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
