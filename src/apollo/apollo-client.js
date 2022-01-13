import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: `${config.env.API_URL}graphql`,
    cache: new InMemoryCache()
})

export default client;