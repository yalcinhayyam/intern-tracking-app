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
    if (isConnectionEdgeType<T>(obj)) {
      result = traverse(obj.edges as EmptyObject) as EmptyObject;
      return result;
    }
    if (isConnectionNodeType<T>(obj)) {
      result = traverse(obj.node as EmptyObject) as EmptyObject;
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

function isConnectionNodeType<T>(value: any): value is { node: T } {
  if (typeof value !== "object") return false;
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return false;
  }
  type Node = keyof { node: T };
  const node: Node = "node";
  return node in value;
}

function isConnectionEdgeType<T>(value: any): value is { edges: {} } {
  if (typeof value !== "object") return false;
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return false;
  }
  type Edges = keyof { edges: {} };
  const edges: Edges = "edges";
  return edges in value;
}
