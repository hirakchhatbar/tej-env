
# <p align="center">Tej-Env</p>

A zero-dependency module to load environment variables in your Nodejs project.

## 🧐 Features
- Load environment variables and access them anywhere with process.env or our global variable TejEnv
- Ability to set environment variables to access them anytime anywhere within that application session. (This doesn't update .env file)
-  [UPCOMING] - Optionally update .env file on the go with in-built routes for express.js and te.js

<br>

## 🛠️ Install
```bash
npm install tej-env
```

<br>

## 🧑🏻‍💻 Basic Usage
```js
import "tej-env"

// To read an environment variable anywhere in your project:
const value = process.env.YOUR_VARIABLE_NAME;
```

<br>

## 🧑🏻‍💻 Advanced Usage
tej-env module can be used to set and unset variables at global level. This will not update the .env file yet. Updating env file is a work in progress.
<br>
Import required functions from tej-env module and use them as shown below:
```js
import { env, setEnv, unsetEnv} from 'tej-env'
```

There are 2 options to read an environment variable or global variable anywhere in your project:
<br>
<br>
Option 1: Using process.env
```js
const value = process.env.YOUR_VARIABLE_NAME;
```
Option 2: Using env() function from tej-env
```js
const data = env("YOUR_VARIABLE_NAME");
```

<br>
To set an environment variable or global variable anywhere in your project, use setEnv() function from tej-env

```js
setEnv(key, value);
```

<br>
To unset an environment variable or global variable anywhere in your project, use unsetEnv() function from tej-env

```js
unsetEnv(key, value);
```


<br>

## 🍰 Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.


<br>

## ❤️ Support
A simple star to this project repo is enough to keep me motivated on this project for days. If you find your self very much excited with this project let me know with a star.


<br>

## 🙇 Author
#### Hirak Chhatbar
- Github: [@hirakchhatbar](https://github.com/hirakchhatbar)


<br>

## ➤ License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
