import {Kbd} from '@chakra-ui/react'

interface Props{
    description: string;
    shortcut: string[];
}
export default function Shortcut(props:Props){
    return(        
        <div className='w-100 py-2 h-auto d-flex flex-align-start justify-content-start border-top'>
            <label className='w-50 text-start'>                  
                {
                    props.shortcut.map( (key:string) => {
                        if(key  === props.shortcut[props.shortcut.length -1]) 
                            return  <Kbd className='text-dark'>{key}</Kbd> 
                        else
                            return <> <Kbd className='text-dark'>{key}</Kbd> + </>  
                    })
                }
            </label>
            <label className='w-50 text-start'>
                
                {props.description}
            </label>
        </div>
    )
}