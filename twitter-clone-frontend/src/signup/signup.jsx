import React, { useState } from 'react';
import './signup.css'

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrering klar', formData);
    //plats för lite API-anrop sen.
}
}

return (
    <div className="signup-container">
        <h2>Registrera dig</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="username"
            placeholder="Användarnamn"
            value={formData.username}
            onChange={handleChange}
            required
            />
            <input
            type="email"
            name="email"
            placeholder="E-post"
            value={formData.email}
            onChange={handleChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
            />
            <button type="submit">Skapa konto</button>
        </form>
    </div>
)

export default Signup;