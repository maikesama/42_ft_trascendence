import {Injectable} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class ChatService{

    constructor(private prismaService: PrismaService){}

    async newChannel(body: any, userId: number){

        try{
            const user = this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            // const channel = this.prismaService.chat.create({
            //     data: {
            //         name: body.name,
            //         type: body.type,
            //     }
            // })
        }
        catch(err){
            console.log(err)
        }
        
    
    }
}