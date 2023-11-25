import { EmptyObject, Projection } from "@/core";
import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";

export const fieldSelector = <T>(data: GraphQLResolveInfo): Projection<T> => {
  const traverse = (obj: EmptyObject) => {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      return true;
    }
    let result: EmptyObject = {};
    if (isConnectionType<T>(obj)) {
      result = traverse(obj.edges.node as EmptyObject) as EmptyObject;
      return result;
    }

    keys.forEach((key) => {
      result[key] = traverse(obj[key] as EmptyObject);
    });

    return { select: result };
  };

  return traverse(graphqlFields(data)) as Projection<T>;
};

function isConnectionType<T>(value: any): value is { edges: { node: T } } {
  if (typeof value !== "object") return false;
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return false;
  }
  type Edges = keyof { edges: { node: T } };
  type Node = keyof { edges: { node: T } }["edges"];
  const edges: Edges = "edges";
  const node: Node = "node";
  return edges in value && node in value.edges;
}
