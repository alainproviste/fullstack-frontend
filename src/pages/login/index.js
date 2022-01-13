import React, { useState } from 'react';
import { useRouter } from "next/router";
import authService from "../../services/auth.service";
import TitlePage from "../../components/UI/Title/TitlePage";
import Message from "../../components/UI/Message/Message";
import Input from "../../components/UI/Input/Input";
import style from './index.module.scss'

const Index = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(user)
        .then((data) => {
            console.log(data);
            if (data.message) {
            setError(true);
            setErrorMessage(data.message);
            return false;
            }
            localStorage.setItem("token", data.token);
            router.push("/account/profil");
        })
        .catch((err) => {
            console.log(err);
            setError(true);
            setErrorMessage(err.message)
        });
    };

    return (
        <div className='page_login'>
            <TitlePage title="Login"/>
            <form className={style.form__login} onSubmit={(e) => handleSubmit(e)}>
                <Input
                    type="text"
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="Mon adresse email"
                    required={true}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                />
                <Input
                    type="password"
                    label="Mot de passe"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    required={true}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                />
                <input className="btn btn-black" type="submit" value="M'inscrire" />
                {
                    error ? (
                        <Message message={errorMessage} type="error"/>
                    )
                    :
                    ""  
                    }
            </form>
        </div>
    );
}

export default Index;
