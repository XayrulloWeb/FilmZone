import React from 'react';


function Login(props) {
    return (
        
        <div className='login-page'>
        <div class="card">
        <h2>Login Form</h2>
        
        
        <div class="login_register">
        <a href="#" class="login" target="blank">Login</a>
        <a href="#" class="register" target="blank">Signup</a>
        </div>
        
        <form class="form">
        <input type="email" placeholder="Email Adress" class="email"></input>
        <input type="password" placeholder="password" class="pass"></input>
        </form>
        
        
        <a href="#" class="fp">Forgot password?</a>
        
        
        <button type="button" class="login_btn">Login</button>
        
        
        <div class="footer_card">
        <p>Not a member?</p>
        <a href="#">Singup now</a>
        </div>
        </div>
        </div>
        
        
    );
}

export default Login;