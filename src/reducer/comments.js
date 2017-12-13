import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_ALL_COMMENTS, LOAD_COMMENTS_PAGE, START , SUCCESS, FAIL } from '../constants'
import {arrToImmutableMap, arrToMap} from './utils'
import {OrderedMap, Record} from 'immutable'

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const ReducerRecord = Record({
    entities: new OrderedMap({}),
    pages: new OrderedMap({}),
    total: null,
    loading: false,
    loadedL: false,
    error: null
})


export default (comments = new ReducerRecord(), action) => {
    const { type, payload, response, randomId, error } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', randomId], new CommentRecord({...payload.comment, id: randomId}))

        case LOAD_ALL_COMMENTS + START:
            return comments.set('loading', true)

        case LOAD_ALL_COMMENTS + SUCCESS:
            return comments
                .set('total', response.total)
                .set('loading', false)
                .set('entities', arrToImmutableMap(response.records, CommentRecord))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments.mergeIn(['entities'], arrToMap(response, CommentRecord))

        case LOAD_COMMENTS_PAGE + START:
            return comments.set('loading', true)

        case LOAD_COMMENTS_PAGE + SUCCESS:{
            return comments
                .set('loading', false)
                .setIn(['pages', payload.page], arrToImmutableMap(response.records, CommentRecord))
        }

        case LOAD_COMMENTS_PAGE + FAIL:
            return comments.set('error', error)
    }

    return comments
}