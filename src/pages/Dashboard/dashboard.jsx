
import Navbar from '../../Components/Navbar/navbar'
import DeletCard from '../../Components/DeletCard/deletCard'
import { useState, useContext, useEffect } from 'react'
import api from '../../services/api'
import { Context } from '../../Context/userContext'



export default function Dashboard() {

    const [userData, setUserData] = useContext(Context);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const [productsData, setProductsData] = useState([])

    useEffect(() => {
        getUserProducts()
    }, [productsData])

    async function postProduction(e) {
        e.preventDefault()

        try {
            await api.post(`${userData._id}/products`, {
                name,
                price
            }, {
                headers: {
                    auth: userData._id
                }
            })

            alert('produto cadastrado com sucesso')
            setName('')
            setPrice('')

        } catch (error) {
            alert('produto não cadastrado')
        }


    }

    async function getUserProducts() {

        try {
            const userProductsData = await api.get(`products/${userData._id}`,{
                headers: {
                    auth: userData._id
                }
            })
            const { data } = userProductsData
            setProductsData(data)
            
        } catch (error) {
            alert('produtos não listados')
        }
    
    }

    async function deleteProductHandler(product_id){
        try {
             await api.delete(`products/${product_id}`)

             alert('produto removido com sucesso')

        } catch (error) {
            alert('erro ao deletar produto')
        }
      
    }


    return (

        <>
            <Navbar />
            <section className='dashboard-inputs'>
                <form>
                    <h1>Cadastrar Produtos</h1>
                    <div className='form-inputs'>
                        <input
                            type="text"
                            placeholder='Nome do Produto'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='Preço do Produto'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <button id='button-dashboard' onClick={postProduction}>Adicionar Produto</button>
                    </div>


                </form>
            </section>

            <section className='products-section'>

                <div className='products-container'>
                    {productsData.map(product => (
                        <DeletCard key={product._id}
                            name={product.name}
                            price={product.price}
                            userName={product.user.name}
                            userWhats={product.user.whatsapp}
                            deleteProductHandler={()=>{deleteProductHandler(product._id)}}
                        />
                    ))}
                  

                </div>

            </section>
        </>
    )
}