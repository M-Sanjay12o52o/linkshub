"use client"

import { ADD_POST } from '@/graphql/mutations'
import { GET_POSTS } from '@/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { IPost } from '../../typing'
import LinkI from './Link'

const Links = () => {
    const [title, setTitle] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const { data, loading, error } = useQuery(GET_POSTS)
    const authorId = "testAuthorId"


    const [addPost] = useMutation(ADD_POST, {
        variables: { title, url, authorId },
        refetchQueries: [{ query: GET_POSTS }]
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (url === "" || title === "") return alert("Enter fields");

        addPost({ variables: { title, url } });
        setTitle("");
        setUrl("");
    };

    const posts: IPost[] = data?.posts;

    console.log("posts: ", posts)

    if (loading)
        return (
            <p className="text-white flex items-center justify-center">
                Loading ....
            </p>
        );
    if (error)
        return (
            <p className="text-white flex items-center justify-center">
                Oops! Something went wrong ....
            </p>
        );

    return <div className="mt-5">
        <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter title"
                className="bg-transparent border text-black p-2 rounded-lg"
            />
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Enter your Link address"
                className="bg-transparent border text-black p-2 rounded-lg"
            />
            <button className="bg-yellow-500 p-2 rounded-lg ">
                Add Post
            </button>
        </form>
        <div className="grid grid-cols-4 gap-2">
            {posts.map((post) => (
                <LinkI key={post.id} post={post} />
            ))}
        </div>
    </div>
}

export default Links