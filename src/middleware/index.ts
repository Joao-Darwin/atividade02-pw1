import { Request, Response, NextFunction } from 'express';
import Users from '../model/Users/index';

const checkExistsUserAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userName = req.header("username");
        const user = await Users.findOne({ where: { username: userName } });

        if (user == null) {
            res.status(404).send(`Username ${userName} não encontrado`);
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
    }
}

export default checkExistsUserAccount;
