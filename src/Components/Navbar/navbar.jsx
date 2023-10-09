import { BiCartDownload } from 'react-icons/bi';
import { Context } from '../../Context/userContext';
import { useContext } from 'react';

export default function Navbar({ openModal }) {
  const [userData, setUserData] = useContext(Context);

  async function logoutHandler(e) {
    e.preventDefault()

    setUserData(prevState => ({
      ...prevState,
      isLogged: false,
      email: '',
      name: '',
      _id: '',
    }))
  }

  return (
    <nav>
      <div className="nav-container">
        <BiCartDownload className='logo' size={40} />

        {userData.isLogged ?
          <>
            <p>Olá, {userData.name}</p>
            <button onClick={logoutHandler}>Sair</button>
          </> :
          <button onClick={openModal}>Entrar</button>
        }

      </div>
    </nav>
  );
}
