import { useQuery } from '@tanstack/react-query'
import axios from "axios"


export function getPosts() {
    return axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.data)
}

export function createPosts(data:object) {
    return axios
        .post("https://jsonplaceholder.typicode.com/posts",data)
        .then(res => res.data)
}

export function getUsers() {
    return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(res => res.data)
}

function Fetching() {

    const postQuery = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    })
    

    const userQuery = useQuery({
        queryKey: ["users"],
        enabled: postQuery.data != null,
        queryFn: getPosts,
    })

    if (postQuery.isLoading) {
        return <h1>Loading ...</h1>
    }
    if (postQuery.error) {
        return <h1>Error</h1>
    }
    return (
        <div>
            <h1>Posts List 1</h1>
            <ul>
                {postQuery.data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <h1>Users List</h1>
            <ul>
                {userQuery.isLoading ? "Loading.." :
                userQuery.error ? "Error" :
                 userQuery.data.map(user => (
                <li key={user.id}>{user.title}</li>
                ))
            }
            </ul>


        </div>
    )
}

export default Fetching
