import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { EditGame } from "../../Redux/actions";
import Creategame from "../Creategame/Creategame";

export default function UploadGame(){
    const [name,setName]=useState('SELECT A GAME')
    const games=useSelector(state=>state.games_created)
    const currenturl=useLocation().pathname.slice(10)
     
    const actualgame=games&&games.find(i=>i.id.includes(currenturl))
    useEffect(()=>{
    actualgame&&setName(games.name) /* eslint-disable react-hooks/exhaustive-deps */
    },[])

    return (
        <div>
           <h1 style={{color:'rgb(233, 10, 203)'}}>Edit game:</h1>
           <Creategame
           defaultname={actualgame&&actualgame.name?actualgame.name:name}///ternarios por que si no recibimos el objeto(direccion erronea) le diremos que elija un juego
           id={actualgame&&actualgame.id}
           putdispatch={EditGame}/> 
        </div>
    )
}