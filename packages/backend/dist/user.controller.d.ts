import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(data: {
        userId: number;
    }): {
        id: number;
        name: string;
        email: string;
    };
}
