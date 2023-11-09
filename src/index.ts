import dotenv from 'dotenv';
import express from 'express';
import database from './database/index';
import checkExistsUserAccount from './middleware/index';
import technologieRouter from './router/Technologies';
import userRouter from './router/Users';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/technologies", checkExistsUserAccount);
app.use("/technologies", technologieRouter);

const portApplication = process.env.PORT;

database.sync()
  .then(() => {
    app.listen(portApplication, () => {
      console.info("Aplicação rodando na porta 3000!");
    });
  })
  .catch((err: Error) => {
    console.error(err);
  });
