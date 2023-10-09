
import Card from '../../Components/Card/card'
import Modal from '../../Components/Modal/modal'
import Navbar from '../../Components/Navbar/navbar'
import '../../pages/Home/home.css'


import api from '../../services/api'

import { useState, useEffect } from 'react'


export default function Home() {

    const [isModalOpen, setModalOpen] = useState(false)


    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const [productsData, setProductsData] = useState([])

    const [productsByName, setProductsByName] = useState('')
    const [productsByMaxPrice, setProductsByMaxPrice] = useState(100)

    const [filteredProductsData, setFilteredProductsData] = useState([])

    const [viewPort, setViewport] = useState({
        latitude: 18,
        longitude: 44,
        width:"100vw",
        height:"100vh",
        zoom: 15
    })

    useEffect(() => {
        getUserLocation()
    }, [])


    async function getUserLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            });

            const { latitude, longitude } = position.coords;

            setLatitude(longitude)
            setLongitude(latitude)
        } catch (err) {
            console.error(err);
        }
    }



    useEffect(() => {
        getNearProducts()
    }, [latitude, longitude])

    async function getNearProducts() {
        try {
            const nearProducts = await api.get(`/products?latitude=${longitude}&longitude=${latitude}`)
            const { data } = nearProducts

            setProductsData(data)

        } catch (error) {
            alert('erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getFilteredProducts()
    }, [productsData, productsByName, productsByMaxPrice])


    function getFilteredProducts() {
        const filteredProducts = productsData.filter(product =>
            (!productsByName || product.name.toLowerCase().includes(productsByName.toLowerCase())) &&
            (!productsByMaxPrice || product.price <= productsByMaxPrice)
        )
        setFilteredProductsData(filteredProducts)
    }


    function openModal() {
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }

    return (

        <>

            <Navbar openModal={openModal} />
            <section className='input-section'>
                <form>
                    <h1>Pesquisar Produtos</h1>

                    <div className='form-inputs'>
                        <input
                            type="text"
                            placeholder='pesquisar por nome'
                            value={productsByName}
                            onChange={e => setProductsByName(e.target.value)}
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder='preço máximo'
                            value={productsByMaxPrice}
                            onChange={e => setProductsByMaxPrice(e.target.value)}
                        />
                    </div>


                </form>
            </section>

            <section className='products-section'>

                <div className='products-container'>
                    {filteredProductsData.map(product => (
                        <Card key={product._id}
                            name={product.name}
                            price={product.price}
                            userName={product.user.name}
                            userWhats={product.user.whatsapp}
                        />
                    ))}


                </div>

            </section>


            {isModalOpen ? <Modal closeModal={closeModal} /> : null}


        </>
    )
}