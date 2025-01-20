import type { Debugger } from "@sitecore-jss/sitecore-jss";
import { createGraphQLClientFactory } from "./graphql-create-client-factory";

export default class GraphQLRequestClientFactory {
  create(debug: Debugger) {
    return createGraphQLClientFactory()();
  }
}