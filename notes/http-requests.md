# HTTP Requests

## What is an HTTP Request?
An HTTP request is how a client (such as a web browser or API client) asks a server for resources, like a webpage, an image, or data from a database. 

### Structure of an HTTP Request
1. Request Line
This is the first line of the request and includes:
- HTTP Method (e.g., `GET`, `POST`, `PUT`, `DELETE`)
- Request Target (URL or Path), (e.g., `/index.html` or `/`)
- HTTP Version (e.g., `HTTP/1.1`)

```sh
GET /about-us HTTP/1.1
```

This means: "Retrieve the `/about-us` page using HTTP/1.1". 

2. Headers
Headers provide metadata about the request, such as:
- `Host`: Specifies the domain name (e.g., `Host: example.com`)
- `User-Agent`: Identifies the client making the request (e.g., `Mozilla/5.0`)
- `Accept`: Indicates the content type the client expects (e.g., `application/json`)
- `Authorization`: Sends authentication credentials (e.g., `Bearer token`)

```sh
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

> NOTE: The client must signal that the headers are completed by using a double carriage return, `\r\n\r\n`. Otherwise the server will not know that the headers have finished sending. 

