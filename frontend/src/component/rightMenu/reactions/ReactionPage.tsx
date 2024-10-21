import { useState } from "react";
import  Reactions from "../../../ALOUDpackage/ReactionsDictionary"
import Reaction from "./Reaction";
import { Box } from "@chakra-ui/react";


interface IReactionsDictionary{
    [key: string]       : IReaction;
}

interface IReaction{ 
    name            : string, 
    defaultIntensity: number, 
    icon            : string, 
    description     : string, 
    audios          :{
        [audioItem:string]  : string,
    }
}

export default function ReactionPage(){
    const [reactions]   = useState<IReactionsDictionary>(Reactions);
    return(
        <Box h="full" w="full" pt="8">
            <Box h="full" w="full" p="1" pb="5" className="simple-scroll">
                <Box display="flex" flexDir="row" gap="4" flexWrap="wrap" alignItems="center" justifyContent="center">
                    {
                        Object.keys(reactions).map( (reactionName:string) => {
                            return <Reaction {...reactions[reactionName]}/>
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}