import React, { useContext } from 'react'
import Context from '../utils/context'
import { TextField } from '@mui/material';
import history from '../utils/history';
import axios from 'axios';

const AddPost = () => {

    const context = useContext(Context) ;

    const submitHandler = async  (e: { preventDefault: () => void; target: any }) => {
        e.preventDefault()
        const user_id = context.dbProfileState[0].uid
        const username = context.dbProfileState[0].username
        const data = {title: e.target.title.value,
                  body: e.target.body.value,
                  username: username,
                  uid: user_id}
                  await axios.post('/api/post/posttodb', data)
                  .then(response => console.log(response))
                  .catch((err) => console.log(err)) 
    }


  return (
    <div>
    <form onSubmit={submitHandler}>
      <TextField
        id='title'
        label='Title'
        margin='normal'
        />
      <br />
      <TextField
        id='body'
        label='Body'
        multiline
        maxRows={4}
        margin="normal"
        />
       <br />
       <button type='submit'> Submit </button>
       </form>
    <br />
    <button onClick={() => history.replace('/posts')}> Cancel </button>
  </div>
  )
}

export default AddPost