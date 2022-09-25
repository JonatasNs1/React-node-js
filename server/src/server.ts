import express from 'express';
import cors from 'cors' ;
import { PrismaClient } from '@prisma/client';
import {convertHour} from './utils/convert'
import { convertMinutes } from './utils/convertMinutes';

const app = express()
//para retornar os dados no body
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient(
   {
    log:['query']
   }
)
// request -buscar informações que estão vindo da requisição

app.get('/games', async (request, response) =>{
    const games = await prisma.game.findMany({
        //include -> tipo um join, faz um count do relacionamento do ads
        include:{
            _count:{
                select:{
                    ads:true,
                }
            }
        }
    })
     
   
    
    return response.json(games);
});

app.post('/games/:id/ads', async (request, response) =>{
    
    const gameId = request.params.id;

    //acessando o corpo da requisição
    const body: any = request.body;
    
    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord ,
            weekDays:  body.weekDays.join(','),
            hourStart:convertHour(body.hourStart) ,
            hourEnd:convertHour(body.hourEnd) ,
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    return response.status(201).json(ad);
});

 
app.get('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
       // select para listar só os campos que quer
        select:{
        id:true,
        name: true,
        weekDays:true,
        useVoiceChannel:true,
        yearsPlaying:true,
        hourStart:true,
        hourEnd:true,
       }, where:{
            gameId,
        },
        orderBy:{
           createAt:'desc'
        }
    })
    
    return response.json(ads.map(ad=>{
        return{
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutes(ad.hourStart),
            hourEnd: convertMinutes(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async(request, response)=>{
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
       select:{
        discord:true,
       },
        where:{
            id: adId,
        }
    })
    
    
    return response.json({
        discord: ad.discord,
    })
})

app.listen(3334)