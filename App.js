/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

// Screens
import Login from './src/screens/Login';
import Movies from './src/screens/Movies';
import CharacterList from './src/screens/CharacterList';
import CharacterDetail from './src/screens/CharacterDetail';
import AddMovie from './src/screens/AddMovie';

const App = () => {

  return (
    <Router>
      <Scene key="root">
        <Scene key="login"
          component={Login}
          title="Login"
          initial
        />
        <Scene
          key="movies"
          component={Movies}
          title="Movies"
        />
        <Scene
          key="characterList"
          component={CharacterList}
          title="Characters"
        />

        <Scene
          key="characterDetail"
          component={CharacterDetail}
          title="Details"
        />

        <Scene
          key="addMovie"
          component={AddMovie}
          title="Add Movie"
        />
      </Scene>
    </Router>
  );

};


export default App;
