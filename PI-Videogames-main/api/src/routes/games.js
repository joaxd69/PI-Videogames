const bodyParser = require("body-parser");
const { Router, } = require("express");
const { Videogame,Genres,Op}= require('../db')
const server = Router()
server.use(bodyParser.json())
const { getDbAndApi,
getVideoGameId,
getVideoGamessameName,
getVideoGamesGenre,
DeleteGamesCreated,
EditGamesCreated,
}= require('./Controllers/Controllers')

/// obtener todos los juegos
  server.get ("/videogames",async (req, res) => {
    const name = req.query.name;///videogames/?name=query
   
    // si no viene nada por query
    if (!name) {//osea  en la url si no recibo un nombre 
      try {
        const videogames = await getDbAndApi(); //guardo lo que tengo en api y db y lo devuelvo
       
        res.json(videogames);//transformo en json 
      } catch (error) {/// si hay un error devuelvo el error
        res.status(404).json(error);
      }
    }

    // si  por query.name recibimos algo 
    if (name) {///si el nombre viene
      try {
        const videogamesApi = await getVideoGamessameName(name);///usamos la funcion que busca los juegos con ese nombre y guardamos la info en la constante 
        const videogameDb = await Videogame.findAll({///consultamos en la base de datos :  
          where: {                                   //donde
            name: {
              [Op.iLike]: `%${name}%`,              ///haya registros con nombres igual name(osea el query recibido)
            },
          },
          include: {
            model: Genres,                                // en esta consulta se espesificas que se deben incluir datos de genres  con atributo name
            atribute: "name",
          },
           
        });

        ////y en la base de datos Videogame buscamos todo .. donde hay una propiedad name 
                                     ///***recordar chequear si la base de datos devuelve algo */
        const videogames = [...videogameDb, ...videogamesApi.splice(0,15)];///unimos todo para devolver todo junto
       
        videogames.length?res.json(videogames):res.status(404).json({ERROR:'Server say :No hay coincidencias con ese nombre'})
      } catch (error) {
        res.status(404).json(error);
      }
    }
  })
  


  server.get ( "/videogames/:id",async (req, res) => {
    const { id } = req.params;

    // si el id es menor a 10, es porq pertenece a la api
    if (id.length < 10 ) {
      try {
        const videogameApi = await getVideoGameId(id);
 
        const infoApi = {
          image: videogameApi.background_image,
          name: videogameApi.name,
          description: videogameApi.description_raw,
          released: videogameApi.released,
          rating: videogameApi.rating,
          platforms: videogameApi.parent_platforms.map((e) => e.platform.name),
          genres: videogameApi.genres.map((e) => e.name),
        };

        res.json(infoApi);
      } catch (error) {
        res.status(404).json(error);
      }
    }

    // sino, pertenece a la db
    else {
      try {
        const videogameDb = await Videogame.findByPk(id, {
          include: Genres,
        });                         
         
        res.json(videogameDb);
      } catch (error) {
        res.status(404).json(error);
      
      }
    }
  })
  
  server.post("/videogames",async (req, res) => {
    const { name, description, released, rating, platforms, image, genres }=req.body;  
    //  console.log(name,description,released,rating,platforms,image,genres)
    if (!name || !description || !platforms)
      throw new Error({ msg: "complete required fields" });
 
    try {
      const videogame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
     
      });
 
      const genreDb = await Genres.findAll({
        where: { name: genres },
      });
  
      videogame.addGenre(genreDb);

      res.json({ msg: "Server say :VideoGame created successfully" });
    } catch (error) {
      res.status(404).json({error:'Error, no se pudo realizar la solicitud'});
    }
  }) 
/////...............................................................................................................
  server.get("/genres",async (req, res) => {
    try {
      const genres = await getVideoGamesGenre();
  
      res.json(genres);
    } catch (error) {
      res.status(404).json(error);
    }
  })
//////...............................................................................
server.delete('/videogames/:id',(req,res)=>{
  try {
    
   const {id} = req.params;
   DeleteGamesCreated(id)
   res.status(200).json({state:' Server say : The game was deleted succesfully.'})
  } catch (error) {
    res.status(404).json({error:'Delete game failed'})
  }
})

///...............................................
server.put('/videogames/:id',async(req,res)=>{
  try {
   const {id}=req.params
  
   const { name, description, released, rating, platforms, image, genres }=req.body;
   await EditGamesCreated(id,{name,description,released,rating,platforms,image,genres})
   res.status(200).json({state:' Server say : The game was uploaded succesfully.'})
  

  } catch (error) {
    res.status(404).json({error:'server say: Failed update game'})
  }
  
  
 
})


   


module.exports=server

