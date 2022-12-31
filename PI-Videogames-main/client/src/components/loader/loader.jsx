import style from '../loader/loader.module.css'
export default function Loader(){
    return (
        <div className={style.contenedor}>
            <h1 className={style.text}>Cargando...</h1>
            <div className={style.loader}></div>
        </div>
    )
}