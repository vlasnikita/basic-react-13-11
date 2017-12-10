import {createSelector} from 'reselect'

export const articlesMapSelector = state => state.articles.entities
export const articlesLoadingSelector = state => state.articles.loading
export const filtersSelector = state => state.filters
export const commentListMapSelector = state => state.comments.entities
export const commentIdsByArticleIdSelector = (_, props) => props.article.comments
export const idSelector = (_, props) => props.id

export const articlesSelector = createSelector(articlesMapSelector, articles => articles.valueSeq().toArray())

export const filtratedArticlesSelector = createSelector(articlesSelector, filtersSelector, (articles, filters) => {
    console.log('---', 1)
    const {selected, dateRange: {from, to}} = filters

    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const createCommentListByArticleSelector =()=> createSelector(commentListMapSelector, commentIdsByArticleIdSelector, (comments, articleCommentIds) => {
    return comments.filter((value, key) => articleCommentIds.includes(key)).toJS()
})

export const createCommentSelector = () => createSelector(commentListMapSelector, idSelector, (comments, id) => {
    return comments[id]
})

