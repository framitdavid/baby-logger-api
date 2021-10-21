import { Request, Response } from "express";
import { StatusCode } from "../enums";
import { BrestfeedingInputDTO } from "../dtos/BrestfeedingDTO";
import { Breastfeeding } from "../models/Breastfeeding";
import { BreastFeedingService } from "../services";
import { ControllerUtils } from "../utils";

export const BreastFeedingController = {
  get: async (req: Request, res: Response) => {
    const user = ControllerUtils.getCurrentUser(req);
    res.send(await BreastFeedingService.get(user.id));
  },

  post: async (
    req: Request<{}, {}, BrestfeedingInputDTO>,
    res: Response
  ): Promise<void> => {
    const { duration, comment, leftOrRight } = req.body;

    const user = ControllerUtils.getCurrentUser(req);

    const payload = {
      dateTime: new Date(),
      duration,
      comment,
      leftOrRight,
      user,
    } as Breastfeeding;

    const result = await BreastFeedingService.updateOrCreate(payload);
    res.send(result);
  },

  patch: async (req: Request<{}, {}, BrestfeedingInputDTO>, res: Response) => {
    const { id, comment, leftOrRight } = req.body;

    const breastfeeding = await BreastFeedingService.getById(id);
    
    if (!breastfeeding) {
      return res.sendStatus(StatusCode.NotFound);
    }
    
    const user = ControllerUtils.getCurrentUser(req);
    if (!ControllerUtils.hasAccessToEntity(breastfeeding, user.id)) {
      return res.sendStatus(StatusCode.Forbidden);
    }

    const payload = {
      id,
      comment,
      leftOrRight,
      user,
    } as Breastfeeding;
    const updated = await BreastFeedingService.updateOrCreate(payload);
    res.send(updated);
  },

  delete: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const breastfeeding = await BreastFeedingService.getById(id);
    const user = ControllerUtils.getCurrentUser(req);

    if (!breastfeeding) {
      return res.sendStatus(404);
    }

    if (!ControllerUtils.hasAccessToEntity(breastfeeding, user.id)) {
      return res.sendStatus(403);
    }

    const deleted = await BreastFeedingService.delete(id);
    if (deleted.affected === 1) {
      return res.sendStatus(204);
    }
    return res.sendStatus(500);
  },
};
