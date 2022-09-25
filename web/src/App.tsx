import './styles/main.css';
import logoImg from './assets/game1.png';
import {GameController, MagnifyingGlassPlus} from 'phosphor-react'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import {useState, useEffect} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
// interface ButtonProps{
//   title: string;
// }

// function Button(props:ButtonProps){
//   return (
//     <button>
//       {props.title}
//     </button>
//   )
// }

interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads:number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([])

useEffect(() =>{
      axios.get("http://localhost:3334/games")
      .then((response)=>{
        setGames(response.data)
      })
      .catch(()=>{
        console.log("deu errado")
      })
}, [])


  // const [games, setGames] = useState<Game[]>([])

  // useEffect(() =>{
  //   fetch('http://localhost:3334/games')
  //     .then(response => response.json())
  //     .then(data =>{
  //       // console.log(data)
  //       setGames(data)
  //     }).catch(error => console.log(error))
  // },[])


  return(
   <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg} alt=""/>

    <h1 className='text-6xl text-white font-black mt-20'>
       Seu <span className='bg-nlw-gradient bg-nlw-gradient bg-clip-text' >duo </span> está aqui.
    </h1>

    <div className='grid grid-cols-6 gap-6 mt-16'>
        
            {/* Axios */}
        {games.map(game =>{
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}

  
   
       
    </div>

          {/*Dialog.Root por volta do banner, que está o button que vai abrir o modal */}
        <Dialog.Root>
            <CreateAdBanner/>

            {/* Dialog.Portal Permite fazer que o conteudo do portal, 
            aparece em um lugar diferente da tela que ta a div dos games */}
            <Dialog.Portal>
                {/* <Dialog.Overlay> é o que faz o efeito de tela por cima da outra */}
                <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-c'>
                  <Dialog.Title className='text-3xl text-white font-black'>
                     Publique um anúncio
                  </Dialog.Title>

                  <Dialog.Content>
                    <form>

                      <div>
                        <label htmlFor="game">Qual game?</label>
                        <input id="game" placeholder="Selecione o game que deseja jogar"/>
                      </div>

                      <div>
                        <label htmlFor="name">Qual nome? (ou nickname)</label>
                        <input id="name" placeholder="Como te chama dentro do game?"/>
                      </div>

                      <div>
                        <div>
                          <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                          <input id="yearsPlaying" type="number" placeholder="Tudo bem ser Zero"/>
                        </div>

                        <div>
                            <label htmlFor='discord'>Qual seu Discord?</label>
                            <input id="discord" type="text" placeholder="Usuario#0000"/>
                        </div>
                      </div>

                      <div>
                        <div>
                          <label htmlFor='meekDays'>Quando Costuma Jogar?</label>
                        </div>
                        <div>
                          <label htmlFor='hourStart'>Qual horário do dia?</label>
                          <div>
                            <input id='hourStart' type='time' placeholder='De'/>
                            <input id='hourEnd' type='time' placeholder='Até'/>
                          </div>
                        </div>
                      </div>

                      <div>
                        <input type="checkbox"/>
                        Costumo me conectar ao chat de voz
                      </div>

                      <footer>
                        <button>Cancelar</button>
                        <button type="submit">
                          <GameController/>
                            Encontrar duo
                        </button>
                      </footer>

                    </form>
                  </Dialog.Content>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>


   </div>
  )

}

export default App
