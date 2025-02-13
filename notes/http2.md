# HTTP/2

## Key Improvements
1. **Multiplexing**: Multiple requests share a single TCP connection, improving speed. 
2. **Header Compression (HPACK)**: Reduces redundant header data, making requests smaller.
3. **Binary Protocol**: More efficient than text-based HTTP/1.1
4. **Server Push**: The server can send resource **before the client requests them**, reducing load times.

