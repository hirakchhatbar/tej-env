import TejEnv from "./lib/tej-env.js";

const tejEnv = new TejEnv();
tejEnv.init("utf-8");

const env = (key) => {
  return tejEnv.env(key);
};

const setEnv = (key, value) => {
  tejEnv.set(key, value);
};

const unsetEnv = (key) => {
  tejEnv.unset(key);
};

const getAllEnv = () => {
  return tejEnv.getAll();
};

export { env, setEnv, unsetEnv, getAllEnv };
