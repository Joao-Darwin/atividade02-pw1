import { Request, Response } from 'express';
import Technologies from '../../model/Technologies/index';
import Users from '../../model/Users/index';

const create = async (req: Request, res: Response) => {
    try {
        let technologie = req.body;
        const userName = req.header("username");

        const user = await Users.findOne({ where: { username: userName } });

        technologie.UserId = user.id;

        const technologieSaved = await Technologies.create(technologie);

        const technologieDto = {
            id: technologieSaved.id,
            title: technologieSaved.title,
            studied: technologieSaved.studied,
            deadline: technologieSaved.deadline,
            created_at: technologieSaved.createdAt
        }

        res.status(201).send(technologieDto);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

const findAllTechnologiesByUserName = async (req: Request, res: Response) => {
    try {

        const userName = req.header("username");

        const user = await Users.findOne({ include: Technologies, where: { username: userName } });

        res.send(user?.Technologies);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

const updateTecnologie = async (req: Request, res: Response) => {
    try {
        const technologieId = req.params.id;
        const technologieDto = req.body;

        const technologieToUpdate = await Technologies.findOne({ where: { id: technologieId } });

        if (technologieToUpdate == null) {
            res.status(404).send({ error: "Technologie não encontrada" });
        } else {

            technologieToUpdate.title = technologieDto.title;
            technologieToUpdate.deadline = technologieDto.deadline;

            const updated = await Technologies.update({
                title: technologieDto.title,
                deadline: technologieDto.deadline
            }, { where: { id: technologieId } });

            if (updated > 0) {
                res.status(200).send(technologieToUpdate);
            } else {
                res.status(501).send("Technologie não atualizada");
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

const updateStudiedTechnologie = async (req: Request, res: Response) => {
    try {
        const technologieId = req.params.id;

        const technologie = await Technologies.findOne({ where: { id: technologieId } });
        if (technologie == null) {
            res.status(404).send({ error: "Technologie não encontrada" });
        } else {
            technologie.studied = true
            const updated = await Technologies.update({
                studied: true
            }, { where: { id: technologieId } });

            if (updated > 0) {
                res.status(200).send(technologie);
            } else {
                res.status(501).send("Technologie não atualizada");
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const technologieId = req.params.id;

        const technologieRemoved = await Technologies.destroy({ where: { id: technologieId } });

        if (technologieRemoved <= 0) {
            res.status(404).send({ error: "Technologie não encontrada" });
        } else {
            const user = await Users.findOne({ include: Technologies, where: { username: req.header("username") } });
            res.status(200).send(user?.Technologies);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

export {
    create,
    findAllTechnologiesByUserName,
    updateTecnologie,
    updateStudiedTechnologie,
    remove
};
