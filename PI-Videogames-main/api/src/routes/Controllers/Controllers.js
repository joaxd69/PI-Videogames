const axios = require('axios')
const { Videogame,Genres}= require('../../db.js')
require('dotenv').config()
const {
  DB_USER, DB_PASSWORD, DB_HOST,APY_KEY
} = process.env;

const videogamesloader= async ()=>{
   const Pag1 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}`)////hacemos la peticion a la api, que nos devuelve 20 juegos
   const Pag2 =await axios(Pag1.data.next)///en el llamado nos devuelve una propiedad next la cual posee la pagina siguiente con otros 20 juegos,entonces hacemos otra peticion  a es enlace 
   const Pag3 = await axios(Pag2.data.next)//cada llamado viene con una propiedad next con el enlace a la siguien pagina asi que la llamamaos  hasta recibir 5 mientras la guardamos en constantes
   const Pag4 = await axios (Pag3.data.next)
   const Pag5 =await axios(Pag4.data.next)

   const Paginas =Pag1.data.results///aqui es donde unimos la informacion recibida, concatenamos todo en un solo array las peticiones que guardamos
   .concat(Pag2.data.results)// en las constantes anteriores
   .concat(Pag3.data.results)
   .concat(Pag4.data.results)
   .concat(Pag5.data.results) ///como resultado obtenemos en Paginas un total de 100 juegos

   const DataApi = await Paginas.map(games=>{///aqui es donde recorremos toda la informacion recibida y de cada juegos nos traemos
    return{                                    //las propiedades que nos importan
        id:games.id, 
        name:games.name,
        image:games.background_image,
        rating:games.rating,
        date:games.released,
        platforms:games.platforms.map(i=>i.platform.name),//debido a que las plataformas son muchos objetos nos quedamos solo con los nombres
        genres: games.genres.map(i=>i.name)
      }
   }) 

   return DataApi///finalmente retornamos todo lo que obtuvimos

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 

const getplatform = async ()=>{
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
 const plataformas= await Paginas.map(i=>i.platforms.map(p=>p.platform.name)).join().split(',')
 return plataformas.filter((item,index)=>plataformas.indexOf(item)===index)///revisar
}


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
    )////obtendremos datos sobre el juego que posea dicho id 
  ////retornamos sus
     
  return videogameId.data
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
    getplatform,
    DeleteGamesCreated,
    EditGamesCreated

}

