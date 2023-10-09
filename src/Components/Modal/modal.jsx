import LoginModal from "../LoginModal/loginModal";
import RegisterModal from "../RegisterModal/registerModal";
import { useState } from "react";

export default function Modal({ closeModal }) {
    const [isLogin, setIsLogin] = useState(true)

    function setLoginForm() {
        setIsLogin(true)
    }

    function setRegisterForm() {
        setIsLogin(false)
    }



    return (
        <div className='backdrop' >

            <button id="fechar" onClick={closeModal} >Fechar</button>
            {isLogin ? <LoginModal setRegisterForm={setRegisterForm} /> : <RegisterModal setLoginForm={setLoginForm}
            />}


        </div>
    )
}