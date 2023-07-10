import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import { action, orginals, comedyMovies, HorrorMovies, RomanceMovies } from './urls';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={orginals} title='Netflix Orginals' />
      <RowPost url={action} title='Action Movies' isSmall />
      <RowPost url={comedyMovies} title='Comedy Movies' isSmall />
      <RowPost url={HorrorMovies} title='Horror Movies' isSmall />
      <RowPost url={RomanceMovies} title='Romance Movies' isSmall />
    </div>
  );
}

export default App;
