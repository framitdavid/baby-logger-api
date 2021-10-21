import { ValidationUtils } from "../../src/utils";

describe("testing invalid and valid input for required validation", () => {
  test("should return invalid state", () => {
    const result = ValidationUtils.validate("", {
      isRequired: true,
    });
    expect(result.errors).toContain("Field is required!");
  });

  test("should return valid state", () => {
    const result = ValidationUtils.validate("David", {
      isRequired: true,
    });
    expect(result.errors.length).toBe(0);
  });
});

describe("testing invalid and valid input for email validation", () => {
  test("should return invalid state", () => {
    const result = ValidationUtils.validate("david@", {
      isEmail: true,
    });
    expect(result.errors).toContain("Invalid e-mail!");
  });

  test("should return valid state", () => {
    const result = ValidationUtils.validate("david@email.com", {
      isEmail: true,
    });
    expect(result.errors.length).toBe(0);
  });
});

describe("testing invalid and valid input for isNumber validation", () => {
  test("should return invalid state", () => {
    const result = ValidationUtils.validate("to", {
      isNumber: true,
    });
    expect(result.errors).toContain("Numberformat is requried!");
  });

  test("should return valid state", () => {
    const result = ValidationUtils.validate("2", {
      isNumber: true,
    });
    expect(result.errors.length).toBe(0);
  });
});

xdescribe("testing invalid and valid input for maxLength validation", () => {
  test("should return invalid state", () => {
    const result = ValidationUtils.validate("name", {
      maxLength: 2,
    });
    expect(result.errors).toContain(
      "String is to long, max length is: 2 signs!"
    );
  });

  test("should return valid state", () => {
    const result = ValidationUtils.validate("na", {
      maxLength: 2,
    });
    expect(result.errors.length).toBe(0);
  });
});

xdescribe("testing invalid and valid input for minLength validation", () => {
  test("should return invalid state", () => {
    const result = ValidationUtils.validate("name", {
      minLength: 5,
    });
    expect(result.errors).toEqual([
      "String is to short, min length is: 5 signs!",
    ]);
  });

  test("should return valid state", () => {
    const result = ValidationUtils.validate("firstName", {
      minLength: 5,
    });
    expect(result.errors.length).toBe(0);
  });
});
