import Api from './../api'
import {Post} from './../api'
import {createEventBus} from 'ts-event-bus'
import HTTPServerChannel from 'ts-event-bus-http-server-channel'
import * as Nedb from 'nedb'

const uuidv4: Function = require('uuid/v4')

// Both API and database are injected, allowing to unit-test the server code
// in-process, with a local event bus and a mock or in-memory database
function main(app: typeof Api, database: { posts: Nedb }): void {

    app.getPost.on(({ id }) => new Promise((resolve, reject) =>
        database.posts
            .findOne({ id }, (err, document) => err ? reject(err) : resolve(document as Post)
        )
    ))

    app.getPosts.on(() => database.posts.getAllData())

    app.createPost.on(post => new Promise((resolve, reject) => {
        post.id = uuidv4()
        return database.posts
            .insert(post, err => err ? reject(err) : resolve(post))
    }))

    app.deletePost.on(({ id }) => new Promise((resolve, reject) =>
        database.posts
            .remove({ id }, err => err ? reject(err) : resolve())
    ))

}

if (module === require.main) {

    const api = createEventBus({
        events: Api,
        channels: [ new HTTPServerChannel({
            port: 4000,
            static: {
                folder: 'public'
            }
        }) ]
    })
    const posts = new Nedb({
        filename: 'database.json'
    })
    posts.loadDatabase(err => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        main(api, { posts })
    })
}