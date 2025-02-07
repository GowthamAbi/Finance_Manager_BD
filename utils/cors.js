const cors = require('cors');

const allowedOrigins = ['http://localhost:5173']; // Frontend URL
const cors = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if necessary
  allowedHeaders: ['Content-Type'], // Allow headers as needed
};

export default cors

