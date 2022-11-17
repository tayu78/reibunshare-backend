import { IUser } from '../index';


declare global {
    namespace Express {
        interface Request{
            userData?: {user: IUser} 
        }
    }
}