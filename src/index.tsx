import React from 'react';
import ReactDOM from 'react-dom';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const restLink = new RestLink({
  uri: 'https://api.songkick.com/api/3.0/',
  responseTransformer: async response => response.json().then((data: any) => { return data.resultsPage.results})
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<ApolloApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
