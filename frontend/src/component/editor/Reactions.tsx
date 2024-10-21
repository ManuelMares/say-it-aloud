export default function Reactions(){
    const REACTIONS = {
        "Happy":"",
        "Sad":"",
        "Scared":"",
        "Breath":"",
        "Laugh":"",
        "Cry":"",
        "fiuu":"",
        "negation":"",
    }
    return(
        <div className="w-100 flex-shrink-1 d-flex flex-row flex-wrap gap-1 overflow invisible-scroll p-1 border border-primary-subtle mb-2">
            {
                Object.keys(REACTIONS).map( (key:string) =>{
                    return(
                        <button className="d-flex flex-column p-2 justify-content-center align-items-center">
                            <div className="rounded-circle bg-success" style={{width:"25px", height:"25px"}}></div>
                            {key}
                        </button>
                    )
                })
            }
        </div>
    )
}