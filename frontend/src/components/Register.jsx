import React, { useState } from "react";
import axiosInstance from "../API/axiosInstance";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const type = 'Customer' 
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [actual_otp, setActualOtp] = useState(0);
  const navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("check_email/", {email})
      .then((response) => {
        console.log(response)
        if (response.status===226) {
          setErrorMessage("User already exists");
        }if(response.status===202){
          console.log('hai')
          setOpenModal(true)
          axiosInstance.post("send_otp_email/",{email})
          .then((response) => {
            console.log(response)
            setActualOtp(response.data)
            
          })
          
        }
      })
      .catch((error) => console.error("Error:", error));
  
  };

  const handleVerify = (e) => {
    e.preventDefault();
    console.log('value',actual_otp)
    if (otp == actual_otp){
      axiosInstance.post("register/",{username, email, password, type, contact})
      .then((response) => {
        if (response.status===201){
            setOtp('')
            setActualOtp(0)
            setOpenModal(false)
            setUsername('')
            setEmail('')
            setContact('')
            setPassword('')
            setErrorMessage('')
          go_login()
        }
        
      })
      .catch((error) => console.error("Error:", error));
    }else{
      setErrorMessage("Incorrect Otp")
    }
  };

    function onCloseModal() {
        setOpenModal(false);
        setOtp("");
        setActualOtp(0)
      }

  return (
    <>
    <div className='flex items-center h-screen justify-center'>
      
      <div className="bg-blue-200  p-11 rounded-lg">
      <p className="text-blue-700 text-3xl font-medium tracking-tighter py-1.5">Register</p>
        <form class="max-w-md mx-auto" className='' onSubmit={handleSubmit}>
  <div class="relative z-0 w-full mb-5 group">
      <input type="email" value={email}  onChange={(email) => setEmail(email.target.value)} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="password" value={password}
              onChange={(password) => setPassword(password.target.value)} name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" value={username}
              onChange={(username) => setUsername(username.target.value)} name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="tel" value={contact}
              onChange={(contact) => setContact(contact.target.value)} name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
    </div>
  </div>
  <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
  Submit
</button>
  <div className="flex space-x-1.5 py-3"><p className="text-sm">Already a Customer</p><span className="text-sm underline cursor-pointer" onClick={login}>Login Here</span></div>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
</form>
</div>


    </div>
    
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
          <form onSubmit={handleVerify}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Verify Otp</h3>
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Otp" />
              </div>
              <TextInput value={otp}
                onChange={(otp) => setOtp(otp.target.value)} id="password" type="number" required />
            </div>
            <div className="w-full p-2">
            <Button type="submit">Verify</Button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </Modal.Body>
      </Modal> 

    </>
  )
}

export default Register