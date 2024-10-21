import WriteItAloud from '../../../icons/Write_it_aloud2.png';

export default function AcronymWaitingPage(){
    return(        
        <div className="d-flex w-100 flex-column align-items-center justify-content-center">                
            <img className="w-75 " src={WriteItAloud} style={{marginTop: "25%", maxWidth: "500px",}}></img>
            
            <div className='w-100' style={{fontWeight: 'bold', fontSize: '18px', textAlign: 'center', margin: 'auto'}}>
                Please wait a moment. Pinning a new item requires to optimize its use for you.
            </div>
        </div>
    )
}