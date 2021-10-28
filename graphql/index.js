import {ApolloServer} from "apollo-server-express";
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import {env} from "../config/environment";
import schema from "./schema";
import express from "express";
import http from "http";

export async function startApolloServer(typeDefs, resolvers, port) {
    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        typeDefs,
        plugins: [
            env.development ? ApolloServerPluginLandingPageGraphQLPlayground()
                : ApolloServerPluginLandingPageDisabled(),
        ],
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app,
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({port: port}, resolve));
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
}


export default startApolloServer;