import express from 'express';
const technologieRouter = express.Router();

import * as technologieController from '../../controller/Technologies/index';

technologieRouter.post("/", technologieController.create);
technologieRouter.get("/", technologieController.findAllTechnologiesByUserName);
technologieRouter.put("/:id", technologieController.updateTecnologie);
technologieRouter.patch("/:id/studied", technologieController.updateStudiedTechnologie);
technologieRouter.delete("/:id", technologieController.remove);

export default technologieRouter;
