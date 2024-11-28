import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../API/axiosInstance';

const CustomerLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const dashboard = () => {
    navigate('/Customer/')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
    .post("login/", {email, password})
    .then(response => {
      console.log('1',response.data)
        if (response.data.status == false){
          setErrorMessage("You are blocked by Admin")
        }
        else if (response.data) { // Check if data is present before accessing properties
          localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh));
          localStorage.setItem('accessToken', JSON.stringify(response.data.access));
          localStorage.setItem('type', JSON.stringify(response.data.type))
          localStorage.setItem('id',JSON.stringify(response.data.id))
          if (response.data.type=='Customer') {
            // author_home()
            dashboard();
          }
          else if (response.data.id==1){
            // go_home()
          }
          else{
            setErrorMessage('Invalid Credentials');
          }
        } else {
          // Handle the case where data is not present (e.g., log error, display message)
          console.error('Error: Data is missing in the response.');
          
        }
      })
    
    .catch(error => { console.log('no'); console.error('Error:', error);  setErrorMessage('Invalid Credentials'); });
};

  return (
    <div className='flex items-center h-screen justify-center'>

    <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" value={email} onChange={email => setEmail(email.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" value={password} onChange={password => setPassword(password.target.value)} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}    
    </form>
    
    </div>
  )
}

export default CustomerLogin