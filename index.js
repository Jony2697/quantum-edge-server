const express = require('express')
const cors=require('cors')
const axios = require('axios');
const app = express()
const port=process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await axios.get('https://api.mnimedu.com/api/browse/pro-jobs/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/registration', async (req, res) => {
  try {
    const response = await axios.post('http://api.mnimedu.com/api/auth/registration/', req.body, {
      headers: { 'Content-Type': 'application/json' },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Registration error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// login
app.post('/api/login', async (req, res) => {
  try {
    const response = await axios.post('http://api.mnimedu.com/api/auth/login/', req.body, {
      headers: { 'Content-Type': 'application/json' },
    });

    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Login error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
