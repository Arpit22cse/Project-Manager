const express = require('express');
const cors = require('cors')
const db = require('./utils/dbConnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validate = require('./middlewares/validate');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  }
));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/', require('./routes/authRoutes'));
app.use('/tasks',validate, require('./routes/taskRoutes'));
app.use('/projects', validate, require('./routes/projectRoutes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {  
  console.log("Backend is running on ",port);
});