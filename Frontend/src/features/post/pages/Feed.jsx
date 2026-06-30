import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'

const Feed = () => {

    const { feed, handleGetFeed, loading } = usePost() 

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (<main><h1>Feed is Loading..</h1></main>)
    }

    console.log(feed)

    return (
        <div>
            <main className='feed-page'>
                <div className="feed">
                    <div className="posts">
                        {feed.map(post=>{
                            return <Post users={post.users} post={post} />
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Feed
