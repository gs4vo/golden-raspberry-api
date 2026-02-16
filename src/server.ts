import app from './app.js';
import { initDB } from './database.js';

const PORT = 3000;

async function start(){
    await initDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();