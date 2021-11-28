import { StatusCode } from "../../src/enums";
import { ControllerUtils } from "../../src/utils";

describe("Test ControllerUtils.response method", () => {
  test("should return 400 Bad Request", async () => {
    const mockedResponse = {
      entity: undefined,
      statusCode: StatusCode.BadRequest,
    };

    const result = ControllerUtils.response(mockedResponse);
    expect(result.statusCode).toBe(400);
  });

  test("should return successfully with a entity", async () => {
    const mockedResponse = {
      entity: {
        firstName: "David",
      },
      statusCode: StatusCode.Success,
    };

    const result = ControllerUtils.response(mockedResponse);
    expect(result.statusCode).toBe(200);
    expect(result.value).toEqual({ firstName: "David" });
  });
});

describe("Test ControllerUtils.hasAccessToEntity method", () => {
  test("should return false when the user does not have access to the entity", () => {
    const currentUserId = 2;
    const entity = {
      userId: 1,
      car: "Mazda",
    };

    const result = ControllerUtils.hasAccessToEntity(entity, currentUserId);
    expect(result).toBe(false);
  });

  test("should return true when the user has access to the entity", async () => {
    const currentUserId = 2;
    const entity = {
      userId: 2,
      car: "Volvo",
    };

    const result = ControllerUtils.hasAccessToEntity(entity, currentUserId);
    expect(result).toBe(true);
  });
});
