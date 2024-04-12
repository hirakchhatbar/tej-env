import envFile from '../helper/env-file.js';
import fs from "fs";
import toObj from "../helper/to-obj.js";

class TejEnv {
    constructor() {
        if (TejEnv.instance) {
            return TejEnv.instance;
        }

        this.key = null; // TODO - Implement generation of encryption key
        this.envFile = envFile();
        this.data = {};

        TejEnv.instance = this;
    }

    init(encoding) {
        if (!encoding) console.error("No encoding provided to load environment variables");

        this.encoding = encoding;

        if (fs.existsSync(this.envFile)) {
            this.envContent = fs.readFileSync(this.envFile, this.encoding);
        }

        this.envData = toObj(this.envContent);

        for (const e in this.envData) {
            this.data[e] = this.envData[e];
            process.env[e] = this.data[e];
        }
    }

    env(key) {
        // TODO - Implement decryption of environment variables
        return this.data[key];
    }

    set(key, value) {
        // TODO - Implement encryption of environment variables
        this.data[key] = value;
        process.env[key] = value;
    }

    unset(key) {
        delete this.data[key];
        delete process.env[key];
    }
}

export default TejEnv;
