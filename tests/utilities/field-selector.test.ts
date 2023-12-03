import { expect, it } from "vitest";
import { fieldSelector } from "@/lib/utilities";

it("should correctly convert empty objects to true", () => {
  const data = {
    level1: {
      level2a: {
        level3a: {
          level4a: {},
        },
        level3b: {},
      },
      level2b: {
        level3c: {},
      },
    },
  };

  const expectedResult = {
    level1: {
      level2a: {
        level3a: {
          level4a: true,
        },
        level3b: true,
      },
      level2b: {
        level3c: true,
      },
    },
  };

  const result = fieldSelector(data as any);
  expect(result).toEqual(expectedResult);
});


it("prisma should correctly convert empty objects to true", () => {
  const data = {
    level1: {
      level2a: {
        level3a: {
          level4a: {},
        },
        level3b: {},
      },
      level2b: {
        level3c: {},
      },
    },
  };

  const expectedResult = {
    select: {
      level1: {
        select: {
          level2a: {
            select: {
              level3a: {
                select: {
                  level4a: true,
                },
              },
              level3b: true,
            },
          },
          level2b: {
            select: {
              level3c: true,
            },
          },
        },
      },
    },
  };

  const result = fieldSelector(data as any);
  expect(result).toEqual(expectedResult);
});
