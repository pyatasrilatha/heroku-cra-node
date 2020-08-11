import React, { useCallback, useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Flights from './Flights';
import Header from '/Header';
import Footer from './Footer';
import './Source.css'
import './App.css';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <div className="App-header">
        <div className="container d-flex flex-column">
          <Header/>
          <Flights/>
          <Footer/>
        </div>
      </div> 
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     { process.env.NODE_ENV === 'production' ?
    //         <p>
    //           This is a production build from create-react-app.
    //         </p>
    //       : <p>
    //           Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //     }
    //     <p>{'« '}<strong>
    //       {isFetching
    //         ? 'Fetching message from API'
    //         : message}
    //     </strong>{' »'}</p>
    //     <p><a
    //       className="App-link"
    //       href="https://github.com/mars/heroku-cra-node"
    //     >
    //       React + Node deployment on Heroku
    //     </a></p>
    //     <p><a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a></p>
    //   </header>
    // </div>
  );

}

export default App;
