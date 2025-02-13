# HTTP/1.1

In HTTP/1.1, each request must be handled sequentially. Meaning, if an two JavaScript files are requested at roughly the same time, that have nothing to do with each other, the server has to fulfill the first request before it can begin processing the second request. Also, traditionally, each request required a separate HTTP connection. 

In HTTP/2, multiple requests can be sent over the same connection, and these requests can be handled in parallel. 