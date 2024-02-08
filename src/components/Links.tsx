"use client"

import { ADD_POST } from '@/graphql/mutations'
import { GET_POSTS } from '@/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { IPost } from '../../typing'
import Link from './Link';

const Links = () => {
    const [title, setTitle] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const { data, loading, error } = useQuery(GET_POSTS)

    const [addPost] = useMutation(ADD_POST, {
        variables: { title, url },
        refetchQueries: [{ query: GET_POSTS }]
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (url === "" || title === "") return alert("Enter fields");

        addPost({ variables: { url, title } });
        setTitle("");
        setUrl("");
    };

    const posts: IPost[] = data?.posts;

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
                className="bg-transparent border text-white p-2 rounded-lg"
            />
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Enter Image url"
                className="bg-transparent border text-white p-2 rounded-lg"
            />
            <button className="bg-yellow-500 p-2 rounded-lg ">
                Add Novel
            </button>
        </form>
        <div className="grid grid-cols-4 gap-2">
            {posts.map((post) => (
                <Link key={post.id} post={post} />
            ))}
        </div>
    </div>
}

export default Links