import UserProvider from "./Context/userContext";
import { Rotas } from "./Routes/Routes";
import './styles/Global.css'

function App() {
  return (
    <div className="app">

      <UserProvider>
        <Rotas />
      </UserProvider>


    </div>
  )
}

export default App;
