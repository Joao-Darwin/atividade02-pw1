import { Request, Response } from 'express';
import User from '../../model/Users/index';
import Technologies from '../../model/Technologies/index';

const create = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        if (await userExists(user.username)) {
            res.status(401).send("UserName já está sendo usado");
        } else {
            const userCreated = await User.create(user);
            const userCreatedDto = {
                id: userCreated.id,
                name: userCreated.name,
                username: userCreated.username,
                technologies: []
            }

            res.status(201).send(userCreatedDto);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro no servidor" });
    }
}

const userExists = async (userName: string) => {
    try {
        const user = await User.findOne({ where: { username: userName } });

        return !!user;
    } catch (err) {
        console.error(err);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findAll({ include: Technologies });
        res.send(allUsers);
    } catch (err) {
        res.status(500).send({ error: "Erro no servidor" });
    }
}

export {
    create,
    findAll
};
