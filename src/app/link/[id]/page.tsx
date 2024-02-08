"use client"

import { UPDATE_POST, VOTE } from '@/graphql/mutations';
import { GET_POST } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { IPost } from '../../../../typing';
import Link from 'next/link';
import { format } from 'date-fns';

interface PageProps {
    params: {
        id: string;
    };
}

const Page: FC<PageProps> = ({ params }) => {
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const id = params.id;

    console.log("id:", id)

    const { data, loading, error } = useQuery(GET_POST, {
        variables: { id },
    });

    const [updatePost] = useMutation(UPDATE_POST, {
        variables: { id: id, title: title, url: url },
        refetchQueries: [{ query: GET_POST, variables: { id } }]
    });

    const [voteMutation] = useMutation(VOTE);

    const post: IPost = data?.post;

    console.log("post: ", post)

    const handleUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "" || url === "") return alert("Please enter fields");
        updatePost({ variables: { id: id, title: title, url: url } });
        setTitle("");
        setUrl("");
    };

    const handleVote = () => {
        const userId = 123; // Replace with actual userId
        voteMutation({ variables: { postId: id, userId: userId } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (post === undefined || post === null) return <p>No post found.</p>;

    console.log("post.createdAt: ", post.createdAt)

    return (
        <article className="max-w-5xl mx-auto text-white">
            <section>
                <h1 className="text-black font-bold text-3xl">
                    {post.url ? (
                        <Link href={post.url}>{post.title}</Link>
                    ) : (
                        post.title
                    )}
                </h1>
                <h3 className='font-bold text-black text-3xl'><span>▲</span>{post.id}</h3>
                <p className='text-black text-2xl'>
                    Created at: {post.createdAt ? format(new Date(post.createdAt), 'MMMM dd, yyyy HH:mm:ss') : "Not createdAt"}
                </p>
                <p className='text-black text-2xl'>
                    Updated at: {post.updatedAt ? format(new Date(post.updatedAt), 'MMMM dd, yyyy HH:mm:ss') : "Not updatedAt"}
                </p>
            </section>

            <form onSubmit={handleUpdatePost} className="flex gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter new title"
                    className="bg-transparent border text-white p-2 rounded-lg"
                />
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    placeholder="New URL"
                    className="bg-transparent border text-white p-2 rounded-lg"
                />
                <button className="bg-yellow-500 rounded-lg p-2">Update</button>
            </form>

            <button onClick={handleVote} className="bg-blue-500 rounded-lg p-2 mt-2">Vote</button>
        </article>
    );
};

export default Page;
