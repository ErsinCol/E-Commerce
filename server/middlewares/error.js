function errMiddleware(err, req, res, next){
    console.error(err);
    res.status(500).send("Internal server error");
}

export default errMiddleware;