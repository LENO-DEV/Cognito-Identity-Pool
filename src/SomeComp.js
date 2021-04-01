import React, { useContext, useState } from 'react'
import { AccountContext } from './Account';

const SomeComp = ({ load }) => {
  const [oldPass, setoldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const { changePass } = useContext(AccountContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    changePass(oldPass, newPass)
      .then(e => console.log(e))
      .catch(err => console.log(err));
    setoldPass('');
    setNewPass('');
  }
  if (load) {
    return <h1>Loadin....</h1>
  }


  return <div className='container mt-5'>
    <form action="">
      <input type='password' placeholder='enter old' onChange={(e) => setoldPass(e.target.value)} className='form-control' />
      <input type='text' placeholder='enter new' onChange={(e) => setNewPass(e.target.value)} className='form-control' />
      <button className='btn btn-secondary' type='submit' onClick={handleSubmit} >Submit</button>
    </form>
  </div>
}

export default SomeComp
