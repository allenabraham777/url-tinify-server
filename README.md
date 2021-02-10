# URL TINIFY BACKEND

> The system takes up a long url and convert it to a short one

### Framework and Database
- HapiJS is used for implementing the complete logic.
- The data is stored in MongoDB
- For URL shortening ```ShortId``` package is used

### Downloading and Testing

```
git clone https://github.com/allenabraham777/url-tinify-server.git
cd url-tinify-server
npm install
```
### Running the project

Create a .env file and add the following values
```
PORT = 3001
HOST= 'localhost:3001'
DB_CONNECT= YOUR MONGODB URL
SECRET = SECRET CODE FOR SALTING PASSWORDS
```

You must have [nodemon](https://www.npmjs.com/package/nodemon) installed in your system
```
npm install -g nodemon
```
Run the following script to start the development server
```
npm run dev
```

### Deployment

The project server is deployed using Google Cloud Platform - Micro Instance.

Visit [API Documentation](https://cutcut.cf/documentation) for more details on routes.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Client
[Source Code](https://github.com/allenabraham777/url-tinify-client)
