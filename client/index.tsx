import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {createEventBus} from 'ts-event-bus'
import HTTPClientChannel from 'ts-event-bus-http-client-channel'
import { Post } from './../api'
import Api from './../api'

import {PostList} from './components/PostList'
import {PostView} from './components/PostView'
import {PostEdition} from './components/PostEdition'

const getDefautPost = (): Post => ({
    author: '',
    title: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content: '',
    id: '',
    keywords: []
})

type AppState = {
    view: 'edit' | 'list' | 'read',
    posts: Post[],
    current?: Post
    newPost?: boolean
}

class App extends React.Component<AppState> {

    state: AppState = {
        view: 'list',
        posts: []
    }

    api = createEventBus({
        events: Api,
        channels: [ new HTTPClientChannel() ]
    })

    componentDidMount() {
        this.api.getPosts(null).then(posts => {
            this.setState({
                ...this.state,
                posts
            })
        })
    }
    render() {
        switch (this.state.view) {
            case 'list':
                return <PostList
                    posts={this.state.posts}
                    viewPost={(p: Post) => this.setState({ posts: this.state.posts, view: 'read', current: p })}
                    createNew={() => this.setState({
                        view: 'edit',
                        current: getDefautPost(),
                        newPost: true
                    })}
                />
            case 'read':
                return <PostView
                    post={this.state.current}
                    back={() => this.setState({ posts: this.state.posts, view: 'list'})}
                    editPost={() => this.setState({ ...this.state, view: 'edit'})}
                />
            case 'edit':
                return <PostEdition
                    post={this.state.current}
                    savePost={(p: Post) => this._savePost(p)}
                    deletePost={() => this._deletePost()}
                    back={() => this.setState({ posts: this.state.posts, view: 'list'})}
                />
        }
    }

    private _savePost(p: Post) {
        if (this.state.newPost) {
            this.api
                .createPost(p)
                .then(p => this.setState({ view: 'list', posts: this.state.posts.concat(p)}))
                .catch(console.error)
        } else {
            this.api
                .updatePost(p)
                .then(() => {
                    const idx = this.state.posts.findIndex(p2 => p.id === p2.id)
                    this.state.posts[idx] = p
                    this.setState({ view: 'list', posts: this.state.posts })
                })
                .catch(console.error)
        }
    }

    private _deletePost() {
        this.api
            .deletePost({ id: this.state.current.id })
            .then(() => {
                const idx = this.state.posts.findIndex(p => p.id === this.state.current.id)
                this.state.posts.splice(idx, 1)
                this.setState({ view: 'list', posts: this.state.posts })
            })
    }

}

ReactDOM.render(
    <App
        view='list'
        posts={[]}
    />,
    document.getElementById('app')
)