import Api from './../api'
import {Post} from './../api'
import {createEventBus} from 'ts-event-bus'
import HTTPServerChannel from 'ts-event-bus-http-server-channel'
import * as Nedb from 'nedb'

const uuidv4: Function = require('uuid/v4')

/**
 * Entry point of the server code.
 * 
 * the API and the databse are injected, allowing to unit test the server code
 * in-process, without having to fire up an HTTP server or a database instance
 */
export function main(app: typeof Api, database: { posts: Nedb }): void {

    app.getPost.on(({ id }) => new Promise((resolve, reject) =>
        database.posts.findOne({ id }, (err, document) =>
            err ? reject(err) : resolve(document as Post)
        )
    ))

    app.getPosts.on(() => database.posts.getAllData())

    app.savePost.on(({type, post}) => new Promise((resolve, reject) => {
        if (type === 'create') {
            post.id = uuidv4()
            return database.posts
                .insert(post, err => err ? reject(err) : resolve())
        } else {
            return database.posts.update(
                { id: post.id },
                post,
                { upsert: true },
                err => err ? reject(err) : resolve()
            )
        }
    }))
    
    app.deletePost.on(({ id }) => new Promise((resolve, reject) =>
    database.posts
    .remove({ id }, err => err ? reject(err) : resolve())
))

}

// When launching directly server/index.js, `main` is called with real API and datbase
// instances, created with `makeApi` and `makeDatabase`

const makeApi = () => {
    const channel = new HTTPServerChannel({
        port: 4000,
        static: {
            folder: 'public'
        }
    })
    return createEventBus({
        events: Api,
        channels: [ channel ]
    })
}


const makeDatabase = () => new Promise<Nedb>((resolve, reject) => {
    const posts = new Nedb({
        filename: 'database.json'
    })
    posts.loadDatabase(err => err ? reject(err) : resolve(posts))
})

if (module === require.main) {
    makeDatabase().then(posts => {
        const app = makeApi()
        main(app, { posts })
    })
}