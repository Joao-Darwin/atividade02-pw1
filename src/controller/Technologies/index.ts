import { Request, Response } from 'express';
import Technologies from '../../model/Technologies/index';
import Users from '../../model/Users/index';

const create = async (req: Request, res: Response) => {
    try {
        let technologie = req.body;
        const userName = req.header("username");

        const user = await Users.findFirst({ where: { userName: userName } });

        technologie.UserId = user?.id;

        const technologieSaved = await Technologies.create({data: technologie});

        const technologieDto = {
            id: technologieSaved.id,
            title: technologieSaved.title,
            studied: technologieSaved.studied,
            deadline: technologieSaved.deadline,
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

        const user = await Users.findFirst({ where: { userName: userName }, include: {technologies: true} });

        res.send(user?.technologies);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

const updateTecnologie = async (req: Request, res: Response) => {
    try {
        const technologieId = req.params.id;
        const technologieDto = req.body;

        const technologieToUpdate = await Technologies.findFirst({ where: { id: technologieId } });

        if (technologieToUpdate == null) {
            res.status(404).send({ error: "Technologie não encontrada" });
        } else {

            technologieToUpdate.title = technologieDto.title;
            technologieToUpdate.deadline = technologieDto.deadline;

            const updated = await Technologies.update({
                data: {
                    title: technologieToUpdate.title,
                    deadline: technologieToUpdate.deadline
                },
                where: {
                    id: technologieId
                }
            });

            if (updated) {
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

        const technologie = await Technologies.findFirst({ where: { id: technologieId } });
        if (technologie == null) {
            res.status(404).send({ error: "Technologie não encontrada" });
        } else {
            technologie.studied = true
            const updated = await Technologies.update({
                data: {
                    studied: true
                }, 
                where: {
                    id: technologieId
                }
            });

            if (updated) {
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

        const technologieRemoved = await Technologies.delete({ where: { id: technologieId } });

        if (technologieRemoved) {
            const user = await Users.findFirst({ where: { userName: req.header("username") }, include: {technologies: true} });
            res.status(200).send(user?.technologies);
        } else {
            res.status(404).send({ error: "Technologie não encontrada" });
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
