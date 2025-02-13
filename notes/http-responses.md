# HTTP Responses


## Parts of an HTTP Response
An HTTP Response is made up of three main parts:
1. **Status Line**: HTTP version, status code, and reason phrase.
2. **Headers**: Metadata about the response
3. **Body (Optional)**: The actual content (HTML, JSON, etc)

### 1. Status Line
The first line of an HTTP Response provides information about the request result. 
```sh
HTTP/1.1 200 OK
```
- `HTTP/1.1`: The HTTP version
- `200`: The status code (success)
- `OK`: A human-readable reason phrase

### 2. Response Headers
Headers provide *metadata* about the response. Each header is a key-value pair. 

```sh
Content-Type: text/html; charset=UTF-8
Content-Length: 3421
Date: Tue, 13 Feb 2025, 12:00:00 GMT
Server: nginx
```

Common headers include:
- `Content-Type`: Defines response format (e.g., `application/json`, `text/html`)
- `Content-Length`: Size of the response body (in bytes)
- `Date` Timestamp of when the response was sent
- `Server`: Web server software (`nginx`, `Apache`, `Deno`, etc.)
- `Cache-Control`: Controls caching behavior (`no-cache`, `max-age=3600`)
- `Set-Cookie`: Sends cookies to the client
- `Location`: Used in redirects (`301 Moved Permanently`)

### 3. Response Body (Optional)
The body contains the actual content, such as: 
- **HTML** for web pages
- **JSON/XML** for APIs
- **Images, videos, files**

