import fs from 'fs';

const defaultEnv = () => {
    if (fs.existsSync(".env")) return ".env";
    if (fs.existsSync(".env.local")) return ".env.local";
}

const envFile = () => {
    const node_env = process.env.NODE_ENV;
    if (node_env === "development") {
        //Check if .env.development exists
        if (fs.existsSync(".env.development")) return ".env.development";
        else return defaultEnv();

    }

    if (node_env === "production") {
        //Check if .env.production exists
        if (fs.existsSync(".env.production")) return ".env.production";
        else return defaultEnv();
    }

    return defaultEnv();
}

export default envFile;
