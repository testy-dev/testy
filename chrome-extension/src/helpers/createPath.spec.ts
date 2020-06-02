import createPath from "./createPath";

const graph: [string, string][] = [
  ["a0", "a1"],
  ["a1", "a2"],
  ["a2", "a3"],
  ["a3", "a4"],
  ["a4", "a5"],
  ["a5", "a6"],
  ["a6", "a7"],
  ["a7", "a8"],
  ["a8", "a9"],

  ["b0", "b1"],
  ["b1", "a2"],

  ["a3", "b4"],
  ["b4", "b5"],
  ["b5", "a6"],

  ["a7", "b8"],
  ["b8", "b9"],
];

describe("createPath", () => {
  it("single line", () => {
    expect(
      createPath(
        [
          ["1", "2"],
          ["2", "3"],
        ],
        [],
        "2"
      )
    ).toStrictEqual(["1", "2", "3"]);
  });

  it("direct blocks are in path", () => {
    expect(createPath(graph, [], "a0")).toStrictEqual(["a0", "a1", "a2", "a3"]);
    expect(createPath(graph, [], "b1")).toStrictEqual(["b0", "b1", "a2", "a3"]);
    expect(createPath(graph, [], "a2")).toStrictEqual(["a2", "a3"]);
    expect(createPath(graph, [], "a5")).toStrictEqual([
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
    ]);
    expect(createPath(graph, [], "a7")).toStrictEqual(["a6", "a7"]);
    expect(createPath(graph, [], "a9")).toStrictEqual(["a6", "a7", "a8", "a9"]);
  });

  it("extend path, select block after", () => {
    expect(createPath(graph, ["a0", "a1", "a2", "a3"], "a5")).toStrictEqual([
      "a0",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
    ]);
  });

  it("extend path, select block before", () => {
    expect(createPath(graph, ["a6", "a7", "a8", "a9"], "a5")).toStrictEqual([
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
    ]);
  });

  it("extend path, select other branch", () => {
    expect(
      createPath(graph, ["a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"], "b5")
    ).toStrictEqual(["a2", "a3", "b4", "b5", "a6", "a7", "a8", "a9"]);
  });

  it("dont extend path", () => {
    expect(createPath(graph, ["a6", "a7", "a8", "a9"], "a0")).toStrictEqual([
      "a0",
      "a1",
      "a2",
      "a3",
    ]);
  });

  it("selected block is on same path", () => {
    expect(createPath(graph, ["a6", "a7", "a8", "a9"], "a7")).toStrictEqual([
      "a6",
      "a7",
      "a8",
      "a9",
    ]);
  });
});
