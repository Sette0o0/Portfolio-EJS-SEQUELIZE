const router = require("express").Router();

const disciplinas = require("../controllers/disciplinasController");
const projetos = require("../controllers/projetosController");
const tecnologias = require("../controllers/tecnologiasController");
const estudante = require("../controllers/estudanteController");
const contato = require("../controllers/contatoController");

router.use("/disciplinas", disciplinas);
router.use("/projetos", projetos);
router.use("/tecnologias", tecnologias);
router.use("/estudante", estudante);
router.use("/contato", contato);

module.exports = router;
