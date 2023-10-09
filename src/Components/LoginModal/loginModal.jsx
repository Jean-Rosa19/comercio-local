import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Context } from '../../Context/userContext';
import api from '../../services/api'


export default function LoginModal({ setRegisterForm }) {

    const [userData, setUserData] = useContext(Context);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const redirectDashboard =() =>{
        navigate('/dashboard')
    }

    async function loginHandler(e) {
        e.preventDefault()

        try {
            
           const userData =  await api.post('session',{
                email,
                password
               
            })

           const userInfo = userData.data
           console.log(userInfo)

            setUserData(prevState => ({
                ...prevState, 
                isLogged: true,
                email: userInfo.email,
                name: userInfo.name,
                _id: userInfo._id

            }))

       

            redirectDashboard()

        } catch (error) {
            alert('falha login, tente novamente')
        }
    }
    return (
        <div className='modal'>
            <h1>Entrar</h1>
            <form action="">
                <input
                    type="text"
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Senha'
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                    
                />
                <button onClick={loginHandler}>ENTRAR</button>
                <Link onClick={setRegisterForm}>Criar Conta</Link>

            </form>
        </div>
    )
}