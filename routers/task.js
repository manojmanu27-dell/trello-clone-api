const router = require("express").Router({ caseSensitive: true });
const middleware = require("../middleware");
const validateToken = require("../webToken/validateToken");

// router.use(validateToken);
router.use("/create", middleware.validators.createTask);
router.use("/modify", middleware.validators.modifyTask);

router.get("/fetchTickets/:id", middleware.fetchTasks);
router.post("/modify", middleware.modifyTask);
router.post("/create", middleware.createTask);

module.exports = router