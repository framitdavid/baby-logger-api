import { DeleteResult, getRepository } from "typeorm";
import { DiaperChange } from "../models";
import { StatusCode } from "../enums";
import { ServerResponse } from "../interfaces";
import { DiaperRepository } from "../repositories";

interface IDiaperChangeService {
  getAll: (userId: number) => Promise<ServerResponse<DiaperChange[]>>;
  getById: (id: number) => Promise<ServerResponse<DiaperChange | undefined>>;
  updateOrCreate: (
    diaperChange: DiaperChange
  ) => Promise<ServerResponse<DiaperChange>>;
  delete: (id: number) => Promise<DeleteResult>;
}

export const DiaperChangeService: IDiaperChangeService = {
  getAll: async (userId: number): Promise<ServerResponse<DiaperChange[]>> => {
    return {
      entity: await getRepository(DiaperChange).find({
        where: {
          userId,
        },
        order: {
          dateTime: "DESC",
        },
      }),
      statusCode: StatusCode.Success,
    };
  },

  getById: async (
    id: number
  ): Promise<ServerResponse<DiaperChange | undefined>> => {
    const diaperChange = await DiaperRepository.getById(id);

    if (!diaperChange) {
      return {
        entity: null,
        error: { message: "DiaperChange not found" },
        statusCode: StatusCode.NotFound,
      };
    }

    return {
      entity: diaperChange,
      statusCode: StatusCode.Success,
    };
  },

  updateOrCreate: async (
    diaperChange: DiaperChange
  ): Promise<ServerResponse<DiaperChange>> => {
    return {
      entity: await DiaperRepository.updateOrCreate(diaperChange),
      statusCode: StatusCode.Created,
    };
  },

  delete: async (id: number): Promise<DeleteResult> => {
    return DiaperRepository.delete(id);
  },
};
