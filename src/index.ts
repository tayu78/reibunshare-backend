import express from 'express';
import {json} from 'body-parser'
import cors from 'cors';

import errorHandler from './middleware/errorHandler';

const app = express()
const PORT = process.env.PORT || 5000

app.use(json())

app.use(cors())

app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`This app is running on port ${PORT} !!`)
})

