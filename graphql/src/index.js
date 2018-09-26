const { GraphQLServer } = require("graphql-yoga");

// simple schema that defines a Query type
const typeDefs = `
    type Query {
        info: String!
    }
    `
// implementation of the schema
const mocks = {
    Query:() =>({
        info: () => `Sample content`
    })
}

const server = new GraphQLServer({ typeDefs, resolvers: () => true, mocks })

server.start(() => console.log("server started at http://localhost:4000") )