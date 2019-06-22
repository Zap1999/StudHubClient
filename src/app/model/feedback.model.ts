import { Tag } from './tag.model';
import { User } from './user.model';
import { Answer } from './answer.model';

export class Feedback {
    id: number;
    title: string;
    body: string;
    creationDate: Date;
    user: User;
}