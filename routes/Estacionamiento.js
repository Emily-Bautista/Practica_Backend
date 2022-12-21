const {Router} = require("express")
const {getAgent, getAgentByID, deleteCasetaByPlaca, add, updateUserByAgent, addDatos} = require("../controllers/Estacionamiento")
const router = Router()

router.get("/", getAgent)
router.get("/id/:id", getAgentByPlaca)
router.delete("/",deleteAgentByPlaca)
router.post("/",addDatos)
router.put("/",updateUserByClientes)
module.exports = router