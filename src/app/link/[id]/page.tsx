"use client"

import { UPDATE_POST, VOTE } from '@/graphql/mutations'; // Import the VOTE mutation
import { GET_POST } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { IPost } from '../../../../typing';
import Link from 'next/link';

interface pageProps {
    params: {
        id: string;
    };
}

const Page: FC<pageProps> = ({ params }) => {
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const id = params.id;

    const { data, loading, error } = useQuery(GET_POST, {
        variables: { id },
    });

    const [updatePost] = useMutation(UPDATE_POST, {
        variables: { id: id, title: title, url: url },
        refetchQueries: [{ query: GET_POST, variables: { id } }]
    });

    // Use the useMutation hook to execute the VOTE mutation
    const [voteMutation] = useMutation(VOTE);

    const post: IPost = data?.post;

    const handleUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "" || url === "") return alert("Please enter fields");
        updatePost({ variables: { id: id, title: title, url: url } });
        setTitle("");
        setUrl("");
    };

    // Function to handle the voting action
    const handleVote = () => {
        // Assuming userId is obtained from user authentication
        const userId = 123; // Replace with actual userId
        voteMutation({ variables: { postId: id, userId: userId } });
    };

    if (loading)
        return (
            <p className="text-black text-3xl flex items-center justify-center">
                Loading ....
            </p>
        );
    if (error)
        return (
            <p className="text-black text-3xl flex items-center justify-center">
                Oops! Something went wrong ....
            </p>
        );

    return (
        <article className="max-w-5xl mx-auto text-white">
            <section className="flex gap-2 ">
                {post.url && (
                    <h1 className='text-3xl'><Link href={post.url}>{post.title}</Link></h1>
                )}
            </section>
            {/* update form */}
            <form onSubmit={handleUpdatePost} className="flex gap-2 ">
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
                    placeholder="new url"
                    className="bg-transparent border text-white p-2 rounded-lg"
                />
                <button className="bg-yellow-500 rounded-lg p-2">Update</button>
            </form>

            {/* Voting button */}
            <button onClick={handleVote} className="bg-blue-500 rounded-lg p-2 mt-2">Vote</button>
        </article>
    );
};

export default Page;
