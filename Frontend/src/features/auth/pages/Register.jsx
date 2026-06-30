import React from 'react'
import { useState } from 'react'
// import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// import axios from 'axios'

const Register = () => {
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleRegister(username, email, password)

        navigate("/")
    }

    if (loading) {
        return (<main> <h1>Loading....</h1></main>)

    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='Username'
                        placeholder='Enter Username' />
                    <input
                        onInput={(e) => { setEmail(e.target.value) }}
                        type="email"
                        name="email"
                        placeholder="Email" />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='Password'
                        placeholder='Enter Password' />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link className='toggleAuth' to='/login'>Login</Link></p>
            </div>
        </main>
    )
}

export default Register

