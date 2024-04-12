
# <p align="center">Tej-Env</p>

A zero-dependency module to load environment variables in your Nodejs project.

## 🧐 Features
- Load environment variables and access them anywhere with process.env or our global variable TejEnv
- Ability to set environment variables to access them anytime anywhere within that application session. (This doesn't update .env file)
-  [UPCOMING] - Optionally .env file on the go


## 🛠️ Install Dependencies
```bash
npm install tej-env
```


## 🧑🏻‍💻 Usage
```js
import { env, setEnv, unsetEnv} from 'tej-env'
// or if you don't want to use any of these methods, just do
import "tej-env"

// To read an environment variable:
const data = env("YOUR_ENV_VARIABLE");
//or
const data = process.env.YOUR_ENV_VARIABLE;

// To set an environment variable:
setEnv(key, value);

// To unset an environment variable:
unsetEnv(key);
```


## 🍰 Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.



## ❤️ Support
A simple star to this project repo is enough to keep me motivated on this project for days. If you find your self very much excited with this project let me know with a star.


## 🙇 Author
#### Hirak Chhatbar
- Github: [@hirakchhatbar](https://github.com/hirakchhatbar)


## ➤ License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
