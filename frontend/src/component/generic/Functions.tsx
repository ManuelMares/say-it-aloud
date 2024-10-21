


export default function Functions(){
    /*
        Given a path to a file, this function returns only the name of the file
        @param filePath
            A string indicating the full path
        @return
            A string indicating the name of the file
    */
    function ExtractFileName(filePath: string){
        const parts = filePath.split('\\');
        return parts[parts.length - 1];
    };



    return{
        ExtractFileName
    }

}