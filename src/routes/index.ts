import express from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import income from "./income.routes";
import expense from "./expense.routes";
import balance from "./balance.routes";
import HttpStatusCode from "../../utils/HttpStatusCode";

const router = express.Router();

router.get("/health", (_, res) => {
  res.sendStatus(HttpStatusCode.OK);
});

router.use("/sessions", auth);
router.use("/users", user);
router.use("/incomes", income);
router.use("/expenses", expense);
router.use("/balance", balance);

export default router;
