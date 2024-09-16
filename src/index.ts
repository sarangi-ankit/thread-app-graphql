import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express()
    const port = process.env.PORT || 8000

    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
            hello:String,
            say(name:String):String
        }
        `,
        resolvers: {
            Query: {
                hello: () => "Hey there! I am a graphql server",
                say: (_, { name }: { name: String })=>`hey ${name}! Welcome to graphql`
            }
        },
    });

    await gqlServer.start()


    app.get("/", (req, res) => {
        res.json("server is running")
    })
    app.use('/graphql', express.json(), expressMiddleware(gqlServer));

    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    })
}

init();
