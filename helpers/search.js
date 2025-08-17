module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    }
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i")   // khái niệm tìm kiếm regex trong js
        objectSearch.regex = regex;
    }
    return objectSearch
}