import { Module } from '@nestjs/common';
import { TodoistService } from './todoist.service';

@Module({
    imports: [],
    exports: [TodoistService],
    providers: [TodoistService]
})
export class TodoistModule {}
