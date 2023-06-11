import { describe, expect, test } from "vitest";
import { add } from "../add";

describe("Add", () => {
  test("two numbers", () => {
    expect(add(2, 2)).to.equal(4);
  });
});
