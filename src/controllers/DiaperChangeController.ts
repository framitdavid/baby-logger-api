import { Request, Response } from "express";
import { DiaperChangeInputDTO } from "../dtos";
import { DiaperChange } from "../models";
import { DiaperChangeService } from "../services";
import { ControllerUtils } from "../utils";

export const DiaperChangeController = {
  get: async (req: Request, res: Response) => {
    const user = ControllerUtils.getCurrentUser(req);
    const result = ControllerUtils.response(
      await DiaperChangeService.getAll(user.id)
    );

    res.status(result.statusCode).send(result.value);
  },

  post: async (req: Request<{}, {}, DiaperChangeInputDTO>, res: Response) => {
    const { comment, disaperType, amount } = req.body;

    const user = ControllerUtils.getCurrentUser(req);
    const payload = {
      disaperType,
      comment,
      amount,
      user,
    } as DiaperChange;
    res.send(await DiaperChangeService.updateOrCreate(payload));
  },

  patch: async (req: Request, res: Response) => {
    const requestPayload = req.body;
    const user = ControllerUtils.getCurrentUser(req);

    const result = ControllerUtils.response(
      await DiaperChangeService.getById(requestPayload.id)
    );

    if (!ControllerUtils.hasAccessToEntity(result.value, user.id)) {
      return res.sendStatus(403);
    }

    const payload = {
      ...requestPayload,
      user,
    };
    res.send(await DiaperChangeService.updateOrCreate(payload));
  },

  delete: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = ControllerUtils.getCurrentUser(req);

    const result = ControllerUtils.response(
      await DiaperChangeService.getById(id)
    );

    if (!ControllerUtils.hasAccessToEntity(result.value, user.id)) {
      return res.sendStatus(403);
    }

    const deleted = await DiaperChangeService.delete(id);
    if (deleted.affected === 1) {
      return res.sendStatus(204);
    }
    return res.sendStatus(500);
  },
};
