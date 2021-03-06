import { Switch, Route } from 'react-router-dom';
import { AdminRoom } from './pages/AdminRoom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/rooms/new" component={ NewRoom } />
      <Route path="/rooms/:id" component={ Room } />
      <Route path="/admin/rooms/:id" component={ AdminRoom } />
    </Switch>
  );
}

export default App;
