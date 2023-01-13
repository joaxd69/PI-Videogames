const axios = require('axios')
const { Videogame,Genres}= require('../../db.js')
require('dotenv').config()
const {
APY_KEY
} = process.env;

const videogamesloader= async ()=>{
   const Pag1 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}`)
   const Pag2 =await axios(Pag1.data.next)
   const Pag3 = await axios(Pag2.data.next)
   const Pag4 = await axios (Pag3.data.next)
   const Pag5 =await axios(Pag4.data.next)

   const Paginas =Pag1.data.results
   .concat(Pag2.data.results)
   .concat(Pag3.data.results)
   .concat(Pag4.data.results)
   .concat(Pag5.data.results) 

   const DataApi = await Paginas.map(games=>{
    return{                                  
        id:games.id, 
        name:games.name,
        image:games.background_image,
        rating:games.rating,
        date:games.released,
        platforms:games.platforms.map(i=>i.platform.name),
        genres: games.genres.map(i=>i.name)
      }
   }) 

   return DataApi

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////



// const getplatform = async ()=>{
//   const Pag1 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}`)
//   const Pag2 =await axios(Pag1.data.next)
//   const Pag3 = await axios(Pag2.data.next)
//   const Pag4 = await axios (Pag3.data.next)
//   const Pag5 =await axios(Pag4.data.next)
//   const Paginas =Pag1.data.results
//   .concat(Pag2.data.results)
//   .concat(Pag3.data.results)
//   .concat(Pag4.data.results)
//   .concat(Pag5.data.results)
//  const plataformas= await Paginas.map(i=>i.platforms.map(p=>p.platform.name)).join().split(',')
//  return plataformas.filter((item,index)=>plataformas.indexOf(item)===index)
// }


const getVideoGamessameName = async (name) => {
    const datanameApi = await axios(  `https://api.rawg.io/api/games?search=${name}&&key=${APY_KEY}`);
    const GameInfo = datanameApi.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((ele) => ele.name),
        platforms:game.platforms?game.platforms.map(i=>i.platform.name):['no desponible']
      }
    })

    return GameInfo
  };
 
  
// obtener juego por id
const getVideoGameId = async (id) => {
    const videogameId = await axios(
      `https://api.rawg.io/api/games/${id}?key=${APY_KEY}`
    )
    const infoApi = {
      image: videogameId.data.background_image,
      name: videogameId.data.name,
      description: videogameId.data.description_raw,
      released: videogameId.data.released,
      rating: videogameId.data.rating,
      platforms: videogameId.data.parent_platforms.map((e) => e.platform.name),
      genres: videogameId.data.genres.map((e) => e.name),
    };
    // console.log(infoApi)
  return infoApi
  }


//---------------------------------------------------------------------------------------
const getVideoGamesGenre = async () => {////llamada a la api por genero
    const videogames = await axios(
      `https://api.rawg.io/api/genres?key=${APY_KEY}`
    );
    
    const generos = await videogames.data.results.map((genre) => genre.name);
    const genero= await Genres.findAll()
    const names = await genero.length?genero.map(i=>i.name):[]
   
    await generos.map((genre) => {
      Genres.findOrCreate({
        where: { name: genre },
      });
    });
  //  console.log(genero) //compruebo que mi base de datos contenga los generos 
  return names
  }

const DeleteGamesCreated=async(id)=>{
  Videogame.destroy({
    where:{id:id}
  })
}

const EditGamesCreated= async(id,data)=>{
await  Videogame.update(data,{
    where:{id:id}
  })
}

  



// obtener info de la base de datos
const getInfoDataBase = async () => {
    const dbVideoGames = await Videogame.findAll({
      include: {
        model: Genres,
        atribute: ["name"],
      },
    });
    
    return dbVideoGames;
  };

//------------------------------------------------------------------------------------------------------------


const getDbAndApi = async () => {//////unir todo 
    const infoApi = await videogamesloader();
    const infoDb = await getInfoDataBase();
    const allInfo = [...infoDb, ...infoApi];

    return allInfo;
  };

///----------------------------------------------------------------------------------------------------------------





module.exports={
   
    getDbAndApi,///
    getVideoGameId,///
    getVideoGamessameName,///
    getVideoGamesGenre,///
    // getplatform,
    DeleteGamesCreated,
    EditGamesCreated

}

