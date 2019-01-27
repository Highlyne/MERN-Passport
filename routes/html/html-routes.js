const express = require('express');
const router = express.Router();

router.get('/helloworld', (req, res) => res.send('Hello World. It is warm today'))
router.get('/', (req, res) => res.send('Home slice'))

module.exports = router;