import app from "./app";

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err: Error) => {
    console.error(`Server error: ${err.message}`);
    process.exit(1);
});