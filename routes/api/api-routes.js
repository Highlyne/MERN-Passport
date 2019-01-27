// Requiring our models and passport as we've configured it
const express = require('express');
const router = express.Router();

// ============== passing data routes =======
router.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
router.post('/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
})


module.exports = router;