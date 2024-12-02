const cors = require('cors');

App.use(
    cors(
        {
            origin: "http://localhost:5173"
        }
    )
)