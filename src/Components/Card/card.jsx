

export default function Card({ name, price, userName, userWhats }) {



    return (
        <div className='card'>



            <h2>{name}</h2>
            <h1>R$ {price}</h1>
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