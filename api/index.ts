import {slot} from 'ts-event-bus'

export interface Post {
    title: string
    id: string
    content: string
    createdAt: number
    updatedAt: number
    author: string
}

/**
 * The API of the application, shared by the client and server code
 * 
 * Matches the EventDeclaration interface
 */
export default {
    savePost: slot<{ type: 'create' | 'update', post: Post }>(),
    deletePost: slot<{ id: string }>(),
    getPost: slot<{ id: string }, Post>(),
    getPosts: slot<null, Post[]>(),
}
