import React from 'react'
import { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'


const Login = () => {

    const { user,handleLogin,loading } =useAuth()

    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate()

    
    const handleSubmit = async(e)=>{
        e.preventDefault()

        await handleLogin(username,password)
        console.log("User loggedIn")


        navigate('/')

    }

    if(loading){
        return(<main>
            <h1>Loading..</h1>
        </main>)
    }


    
    
    return (
        <main>
            <div className="form-container">
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name="username"
                        placeholder="Username" />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name="password"
                        placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuth' to='/register'>Register</Link></p>

            </div>
        </main>
    )
}

export default Login
