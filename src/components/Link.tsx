import { DELETE_POST } from '@/graphql/mutations'
import { GET_POSTS } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { FC } from 'react'
import { IPost } from '../../typing'
import Link from 'next/link'

interface LinksProps {
    post: IPost
}

const Links: FC<LinksProps> = ({ post }) => {
    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [{ query: GET_POSTS }]
    })

    return (
        <article className="flex flex-col p-4  bg-slate-200 dark:bg-zinc-800 hover:scale-110 shadow-sm hover:shadow-lg hover:bg-slate-300 transition duration-300 ease-out text-white ">
            {
                post.url && (
                    <div>
                        <Link href={post.url}>{post.title}</Link>
                    </div>
                )
            }
            <h1 className="font-bold text-xl my-2">{post.title}</h1>
        </article>
    )
}

export default Links