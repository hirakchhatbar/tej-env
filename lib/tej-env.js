import crypto from 'crypto';
import fs from 'fs';
import envFile from '../helper/env-file.js';
import toObj from '../helper/to-obj.js';

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
    if (!encoding) console.error(
        'No encoding provided to load environment variables');

    this.encoding = encoding;

    if (fs.existsSync(this.envFile)) {
      this.envContent = fs.readFileSync(this.envFile, this.encoding);
      this.envData = toObj(this.envContent);

      for (const e in this.envData) {
        this.data[e] = this.encrypt(this.envData[e], this.key);
        process.env[e] = this.envData[e];
      }
    }
  }

  encrypt(value, key) {
    if (!value) return undefined;

    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(value.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(value, key) {
    if (!value) return undefined;

    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(value, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  env(key) {
    return this.decrypt(this.data[key], this.key);
  }

  set(key, value) {
    this.data[key] = this.encrypt(value, this.key);
    process.env[key] = value.toString();
  }

  unset(key) {
    delete this.data[key];
    delete process.env[key];
  }
}

export default TejEnv;
