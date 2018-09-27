const { GraphQLServer } = require("graphql-yoga");

// mock json 
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }];
var linksCount = links.length;

// implementation of the schema
const mocks = {
    Query:() =>(
        {
            info: () => `Sample content`,
            feeds: () => links,
            link: (root, args) => {
                console.log(args)
                let link = null;
                links.forEach(element => {
                    if( element.id == args.id ){
                        link = element;
                    }
                });
                return link;
            } 
        }
    ),
    Link: () => ({
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url,
    }),
    Mutation: () => ({
        postFeed: (root, args) => {
            const link = {
                id: `link-${linksCount++}`,
                url: args.url,
                description: args.description
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            let link = null
            for (let linkIndex = 0; linkIndex < links.length; linkIndex++) {
                if( links[linkIndex].id == args.id ){
                    links[linkIndex].url = args.url
                    links[linkIndex].description = args.description
                    link = links[linkIndex]
                }
            }
            return link
        },
        deleteLink: (root, args) => {
            let link = null
            links.forEach( (element, index) => {
                if( element.id == args.id ){
                    link = element;
                    links.splice(index, 1);
                }
            });
            return link
        }
    })
}

const server = new GraphQLServer(
    { 
        typeDefs: "./src/schema.graphql", 
        resolvers: () => true, 
        mocks 
    })

server.start(() => console.log("server started at http://localhost:4000") )