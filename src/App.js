import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null)

  const handleSubmit = async() =>{
    // console.log(email,'this is email')
    fetch("http://localhost:8000/user", {
      method: "POST",
      headers:{
          "Content-Type":"application/json",
          // "Authorization":"Bearer " + token
      },
      body: JSON.stringify({email:email})
      
    })
    .then((res)=>{
      console.log(res, 'this is res')
      getData();
    })
    .catch((err)=> {
      console.log(err, 'err')
    })
  }

  const getData = async() =>{
    fetch("http://localhost:8000/")
    .then((res)=>{
      return res.json();
    })
    .then((res)=>{
      console.log(res, 'thsi is res')
      setUserData(res.data)
    })
    .catch((err)=>{
      console.log(err, 'err')
    })
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="App">
      
      <h1>Welcom, this is demo frontend</h1>

      <div>
        <p>Enter email: </p>
        <input onChange={(e)=> setEmail(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <div>
        {userData && userData.map((user, index)=> <h3 key={index}>{user.email}</h3>)}
      </div>
    </div>
  );
}

export default App;
