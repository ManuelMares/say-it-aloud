export default function Delay(timeInMiliSeconds: number){
    /*
        This is a promise that stops the execution of code for the given amount of time in miliseconds
        @param timeInMiliSeconds
            An integer indicating the amount of time before continuing executing the code
        @return 
            A promise
        @note
            Since this is a promise, you either to 
                'await delay(1000)'
            or
                delay(1000)
                    .then(()=>{
                        following code
                    })
    */
    return new Promise( res => setTimeout(res, timeInMiliSeconds) );
}