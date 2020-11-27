const express = require('express');
const cors = require('cors');

const server = express();

const TaskRoutes = require('./routes/TaskRoutes');

server.use(express.json());

server.use(cors());

server.use('/task', TaskRoutes);

const port = 3333;



server.listen(port, () => {
    console.log(`Backend started on port ${port} 👻`);
});