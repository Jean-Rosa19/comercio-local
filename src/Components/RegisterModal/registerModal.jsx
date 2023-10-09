
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { useEffect, useState } from 'react'

export default function RegisterModal({ setLoginForm }) {

    const [name, setName] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)



    useEffect(() => {
        getUserLocation()
    }, [])

    async function registrationHandler(e) {
        e.preventDefault(e)

        try {
            await api.post('/user', {
                name,
                whatsapp,
                email,
                password,
                latitude,
                longitude

            })

            alert('cadastro realizado com sucesso, você já pode acessar sua conta')
            setName('')
            setWhatsapp('')
            setEmail('')
            setPassword('')
         
           

        } catch (error) {
            alert('erro ao cadastrar usuário')
        }
    }

    async function getUserLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            });
    
            const { latitude, longitude } = position.coords;
    
           setLatitude(latitude)
           setLongitude(longitude)
        } catch (err) {
            console.error(err);
        }
    }
    


    return (


        <div className='modal'>
            <h1>Cadastrar</h1>
            <form action="">
                <input
                    type="text"
                    placeholder='Nome'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Whatsapp'
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />
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
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={registrationHandler}>CADASTRAR</button>
                <Link onClick={setLoginForm}>Já tenho conta</Link>

            </form>
        </div>

    )
}