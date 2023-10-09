
import { Context } from "../../Context/userContext"
import { useContext } from "react"

export default function DeletCard({name, price, userName, userWhats, deleteProductHandler}) {

    const [userData, setUserData] = useContext(Context);
    return (
        <div className='card'>

            {userData.isLogged ? <button onClick={deleteProductHandler}>Excluir</button> : null}
            
            <h2>{name}</h2>
            <h1>R${price}</h1>
            <div className='card-info'>
                <img src="" alt="" />
                <p>{userName}</p>
            </div>

            <div className='card-info'>
                <img src="" alt="" />
                <p>{userWhats}</p>
            </div>

        </div>
    )
}