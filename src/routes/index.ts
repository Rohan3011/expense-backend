import express from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import income from "./income.routes";
import expense from "./expense.routes";
import HttpStatusCode from "../../utils/HttpStatusCode";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.sendStatus(HttpStatusCode.OK);
});

router.use("/sessions", auth);
router.use("/users", user);
router.use("/incomes", income);
router.use("/expenses", expense);

export default router;
