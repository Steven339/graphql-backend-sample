import {port, env} from './config/environment';
import {startApolloServer} from "./graphql";
import schema from "./graphql/schema";

startApolloServer(schema, null, port).then(r => null);