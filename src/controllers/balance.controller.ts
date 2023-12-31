import { Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import {
  createBalanceInput,
  modifyBalanceParams,
  updateBalanceInput,
} from "../schema/balance.schema";
import {
  createBalance,
  deleteBalance,
  getBalance,
  updateBalance,
} from "../services/balance.service";

/**
 * @desc get Balance
 * @route GET /api/balance/:id
 * @access Private
 */
export async function getBalanceHandler(req: Request, res: Response) {
  const user = res.locals.user;

  try {
    const balance = await getBalance({ userId: user._id });
    return res.send(balance);
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc Add new Balance
 * @route POST /api/balance
 * @access Private
 */
export async function createBalanceHandler(
  req: Request<{}, {}, createBalanceInput>,
  res: Response
) {
  const body = req.body;
  const user = res.locals.user;
  try {
    const balance = await createBalance({ user_id: user._id, ...body });
    return res.send({ success: "Balance added successfully", data: balance });
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc update Balance
 * @route PUT /api/balances/:id
 * @access Private
 */
export async function updateBalanceHandler(
  req: Request<modifyBalanceParams, {}, updateBalanceInput>,
  res: Response
) {
  const { params, body } = req;
  try {
    const balance = await updateBalance(params, body);
    return res.send({
      message: `Balance: ${params.id} updated successfully`,
      balance,
    });
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc delete Balance
 * @route DELETE /api/balances/:id
 * @access Private
 */
export async function deleteBalanceHandler(
  req: Request<modifyBalanceParams>,
  res: Response
) {
  const params = req.params;
  try {
    const balance = await deleteBalance(params);
    return res.send({
      message: `Balance: ${params.id} successfully deleted`,
      balance,
    });
  } catch (e: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}
