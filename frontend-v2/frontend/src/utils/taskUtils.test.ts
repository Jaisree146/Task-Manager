import { describe, it, expect } from "vitest";
import { countCompletedTasks } from "./taskUtils";

describe("countCompletedTasks", () => {
  it("counts completed tasks correctly", () => {
    const tasks = [
      { completed: true },
      { completed: false },
      { completed: true },
    ];

    expect(
      countCompletedTasks(tasks)
    ).toBe(2);
  });
});