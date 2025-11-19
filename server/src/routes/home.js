const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
       <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
      <h1>API is ready</h1>
       <p>The HeyGov Mini CRM backend is running and ready to handle requests.</p>
     </div>

    `);
});

module.exports = router;
