import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    newChannel(body: any, userId: number): Promise<void>;
}
