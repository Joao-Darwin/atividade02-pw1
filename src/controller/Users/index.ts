import { Request, Response } from 'express';
import User from '../../model/Users/index';

const create = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        if (await userExists(user.username)) {
            res.status(401).send("UserName já está sendo usado");
        } else {
            const userCreated = await User.create({data: {
                name: user.name,
                userName: user.username,
                technologies: {
                    
                }
            }});
            const userCreatedDto = {
                id: userCreated.id,
                name: userCreated.name,
                username: userCreated.userName,
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
        const user = await User.findFirst({ where: { userName: userName } });

        return !!user;
    } catch (err) {
        console.error(err);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findMany();
        
        res.send(allUsers);
    } catch (err) {
        res.status(500).send({ error: "Erro no servidor" });
    }
}

export {
    create,
    findAll
};
