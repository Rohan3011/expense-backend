import { Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import {
  createExpenseInput,
  modifyExpenseParams,
  updateExpenseInput,
} from "../schema/expense.schema";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../services/expense.service";

/**
 * @desc get Expenses
 * @route GET /api/expenses
 * @access Private
 */
export async function getExpensesHandler(req: Request, res: Response) {
  const user = res.locals.user;
  try {
    const expenses = await getExpenses({ userId: user._id });
    return res.status(HttpStatusCode.OK).json(expenses);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc get Expense
 * @route GET /api/expense/:id
 * @access Private
 */
export async function getExpenseHandler(
  req: Request<modifyExpenseParams>,
  res: Response
) {
  const params = req.params;
  const user = res.locals.user;
  try {
    const expense = await getExpense(params, { userId: user._id });
    return res.send(expense);
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc Add new Expense
 * @route POST /api/expenses
 * @access Private
 */
export async function createExpenseHandler(
  req: Request<{}, {}, createExpenseInput>,
  res: Response
) {
  const body = req.body;
  const user = res.locals.user;

  try {
    const resp = await createExpense({ userId: user._id, ...body });
    console.log(resp);
    return res.send({ success: "Expense added successfully" });
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc update Expense
 * @route PUT /api/expenses/:id
 * @access Private
 */
export async function updateExpenseHandler(
  req: Request<modifyExpenseParams, {}, updateExpenseInput>,
  res: Response
) {
  const { params, body } = req;
  const user = res.locals.user;

  try {
    const expense = await updateExpense(params, body, { userId: user._id });
    return res.send({
      message: `Expense: ${params.id} updated successfully`,
      expense,
    });
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc delete Expense
 * @route DELETE /api/expenses/:id
 * @access Private
 */
export async function deleteExpenseHandler(
  req: Request<modifyExpenseParams>,
  res: Response
) {
  const params = req.params;
  const user = res.locals.user;
  try {
    const expense = await deleteExpense(params, { userId: user._id });
    return res.send({
      message: `Expense: ${params.id} successfully deleted`,
      expense,
    });
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}
