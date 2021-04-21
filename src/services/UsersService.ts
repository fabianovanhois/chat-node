import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UsersRepository";

class UsersService {

    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UserRepository);
    }

    async create(email: string) {
        
        //Verificar se o user existe
        const userExists = await this.usersRepository.findOne({
            email
        });

        //Se existir, retornar user
        if(userExists) {
            return userExists;
        }

        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        //Se não existir, salvar no DB
        return user;

    }

}

export { UsersService };