import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { FC, useContext, useState } from 'react'
import Context from '../utils/context'
import history from '../utils/history';

const EditPost:FC<any> = (props) => {

  const context = useContext(Context) ;

  const [stateLocal, setStateLocal] = useState({
    title: props.location.state.post.post.title,
    body: props.location.state.post.post.body
  })
  const handleTitleChange = (event: { target: { value: any; }; }) => {
    setStateLocal({...stateLocal, title: event.target.value })
  }

  const handleBodyChange = (event: { target: { value: any; }; }) => {
    setStateLocal({...stateLocal, body: event.target.value })
  }

  const handleSubmit = async (event: { preventDefault: () => void; target: any }) => {
    const user_id = context.dbProfileState[0].uid
    const username = context.dbProfileState[0].username
    const pid = props.location.state.post.post.pid
    const title = event.target.title.value
    const body = event.target.body.value

    const data = {title: title,
                  body: body,
                  pid: pid,
                  uid: user_id,
                  username: username
                 }
    await axios.put("/api/put/post", data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      
  }

  return (
    <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id='title'
              label='title'
              margin="normal"
              value={stateLocal.title}
              onChange={handleTitleChange}
            />
            <br />
            <TextField
              id='body'
              label='body'
              multiline
              rows="4"
              margin='normal'
              value={stateLocal.body}
              onChange={handleBodyChange}
              />
          <br />
          <button type="submit"> Submit </button>
          </form>
          <br />
          <Button onClick={() => history.back()}> Cancel </Button>
        </div>
  )
}

export default EditPost