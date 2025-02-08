from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class SimpleJSONHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Specify UTF-8 encoding when reading the file
            with open('response.json', 'r', encoding='utf-8') as file:
                data = json.load(file)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            self.wfile.write(json.dumps(data).encode('utf-8'))
        
        except FileNotFoundError:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'response.json not found'}).encode('utf-8'))

        except UnicodeDecodeError as e:
            # Handle Unicode errors gracefully
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_message = {'error': 'UnicodeDecodeError', 'details': str(e)}
            self.wfile.write(json.dumps(error_message).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=SimpleJSONHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Serving JSON from response.json at http://localhost:{port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
