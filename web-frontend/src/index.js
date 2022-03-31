import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { backendUrl } from './config';

const link = createHttpLink({
  uri: `${backendUrl}/graphql`,
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
