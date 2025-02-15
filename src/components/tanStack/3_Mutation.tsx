import { keepPreviousData, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
export function getUsers(id) {
    return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.data)
}
function Mutation() {

    const [page,setPage] = useState(1)

    const mutation = useMutation({
        mutationFn: getUsers,
        onSuccess(data, variables, context) {
            setPage((prev)=>prev+1)
        },
    })
    if(mutation.isSuccess){
        console.log(mutation.data)
    }

  return (
    <div>
      <button onClick={()=>mutation.mutate(page)}>click here</button>
    </div>
  )
}

export default Mutation
