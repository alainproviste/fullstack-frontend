import React, {useEffect, useState} from 'react';
import TitlePage from "../../components/UI/Title/TitlePage";
import Input from "../../components/UI/Input/Input";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

const Index = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(user)
        .then((data) => {
            console.log(data);
            if (data.message) {
              return false;
            }
            localStorage.setItem("token", data.token);
            router.push("/account/profil");
          })
          .catch((err) => {
            console.log(err);
          });
    }
    return (
     
        <div>
            <TitlePage title="Login"/>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <Input 
                type="email"
                label="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={(e) => {
                    setUser({...user, email:e.target.value})
                }}
                />
                <Input 
                type="password"
                label="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={(e) => {
                    setUser({...user, password:e.target.value})
                }}
                />
                <input className="btn btn-black" type="submit"/>
            </form>
        </div>
    );
}

export default Index;