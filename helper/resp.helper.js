function ResponseFormatter(data, message, error, status) {
    return {
        data,
        message,
        error,
        status
    }
}

function Pagination(currentPage, totalCount, totalPages) {
    return {
        currentPage,
        totalPages,
        totalCount,
    }
}


module.exports = {
    ResponseFormatter,
    Pagination
}