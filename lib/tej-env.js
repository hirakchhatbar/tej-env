import envFile from '../helper/env-file.js';
import fs from "fs";
import toObj from "../helper/to-obj.js";
import crypto from 'crypto';

class TejEnv {
    constructor() {
        if (TejEnv.instance) {
            return TejEnv.instance;
        }

        // Generate or load encryption key
        this.key = this.loadEncryptionKey();
        this.envFile = envFile();
        this.data = {};

        TejEnv.instance = this;
    }

    loadEncryptionKey() {
        // Check if key exists in environment or generate a new one
        const storedKey = process.env.ENCRYPTION_KEY;
        if (storedKey) {
            return storedKey;
        } else {
            const newKey = crypto.randomBytes(32).toString('hex');
            process.env.ENCRYPTION_KEY = newKey;
            return newKey;
        }
    }

    init(encoding) {
        if (!encoding) console.error("No encoding provided to load environment variables");

        this.encoding = encoding;

        if (fs.existsSync(this.envFile)) {
            this.envContent = fs.readFileSync(this.envFile, this.encoding);
            this.envData = toObj(this.envContent);

            for (const e in this.envData) {
                const decryptedValue = this.decrypt(this.envData[e], this.key);
                this.data[e] = decryptedValue;
                process.env[e] = decryptedValue;
            }
        }
    }

    encrypt(value, key) {
        const cipher = crypto.createCipher('aes-256-cbc', key);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(value, key) {
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(value, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    env(key) {
        return this.data[key];
    }

    set(key, value) {
        const encryptedValue = this.encrypt(value, this.key);
        this.data[key] = encryptedValue;
        process.env[key] = encryptedValue;

        // Save to .env file
        fs.appendFileSync(this.envFile, `${key}=${encryptedValue}\n`, { encoding: this.encoding });
    }

    unset(key) {
        delete this.data[key];
        delete process.env[key];

        // Update .env file
        const envFileContent = fs.readFileSync(this.envFile, this.encoding);
        const lines = envFileContent.split('\n').filter(line => !line.startsWith(`${key}=`));
        fs.writeFileSync(this.envFile, lines.join('\n'), { encoding: this.encoding });
    }
}

export default TejEnv;
