import mongoose from "mongoose";

const connectDatabase = () => {
  const env = process.env;
  mongoose
    .connect(
      `${env.DB_DRIVER}://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .catch((error) => console.log(error.message))
    .then(() =>
      console.log(`CONNECTED TO DB NAME '${env.DB_NAME}' PORT '${env.DB_PORT}'`)
    );
};
try {
  connectDatabase();
} catch (error) {
  console.log(error.message);
}

export { mongoose };
