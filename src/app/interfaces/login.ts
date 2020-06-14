import { userData } from './userData';

export interface loginRespond {
    isAuthorized: boolean;
    data: userData;
    error?: string;
}