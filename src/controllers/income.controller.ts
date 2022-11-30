import { Request, Response } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";
import {
  createIncomeInput,
  modifyIncomeParams,
  updateIncomeInput,
} from "../schema/income.schema";
import {
  createIncome,
  deleteIncome,
  getIncome,
  getIncomes,
  updateIncome,
} from "../services/income.service";

/**
 * @desc get Incomes
 * @route GET /api/incomes
 * @access Private
 */
export async function getIncomesHandler(req: Request, res: Response) {
  const incomes = await getIncomes();
  return res.status(HttpStatusCode.OK).json(incomes);
}

/**
 * @desc get Income
 * @route GET /api/income/:id
 * @access Private
 */
export async function getIncomeHandler(
  req: Request<modifyIncomeParams>,
  res: Response
) {
  const params = req.params;
  try {
    const income = await getIncome(params);
    return res.send(income);
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc Add new Income
 * @route POST /api/incomes
 * @access Private
 */
export async function createIncomeHandler(
  req: Request<{}, {}, createIncomeInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createIncome(body);
    return res.send("Income added successfully");
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc update Income
 * @route PUT /api/incomes/:id
 * @access Private
 */
export async function updateIncomeHandler(
  req: Request<modifyIncomeParams, {}, updateIncomeInput>,
  res: Response
) {
  const { params, body } = req;
  try {
    const income = await updateIncome(params, body);
    return res.send({
      message: `Income: ${params.id} updated successfully`,
      income,
    });
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc delete Income
 * @route DELETE /api/incomes/:id
 * @access Private
 */
export async function deleteIncomeHandler(
  req: Request<modifyIncomeParams>,
  res: Response
) {
  const params = req.params;
  try {
    const income = await deleteIncome(params);
    return res.send({
      message: `Income: ${params.id} successfully deleted`,
      income,
    });
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}
