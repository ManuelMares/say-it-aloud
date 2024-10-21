import agreement    from "../icons/agreement.svg";
import agreement1   from "./ReactionsAudios/agreement/agreement1.mp3";
import agreement2   from "./ReactionsAudios/agreement/agreement2.mp3";
import agreement3   from "./ReactionsAudios/agreement/agreement3.mp3";
import agreement4   from "./ReactionsAudios/agreement/agreement4.mp3";


import disagreement     from "../icons/disagreement.svg";
import disagreement1    from "./ReactionsAudios/disagreement/disagreement1.mp3";
import disagreement2    from "./ReactionsAudios/disagreement/disagreement2.mp3";
import disagreement3    from "./ReactionsAudios/disagreement/disagreement3.mp3";
import disagreement4    from "./ReactionsAudios/disagreement/disagreement4.mp3";

import laugh        from "../icons/laugh.svg";
import laugh1       from "./ReactionsAudios/laugh/laugh1.mp3";
import laugh2       from "./ReactionsAudios/laugh/laugh2.mp3";
import laugh3       from "./ReactionsAudios/laugh/laugh3.mp3";
import laugh4       from "./ReactionsAudios/laugh/laugh4.mp3";

import surprise         from "../icons/surprise.svg";
import surprise1        from "./ReactionsAudios/surprise/surprise1.mp3";
import surprise2        from "./ReactionsAudios/surprise/surprise2.mp3";
import surprise3        from "./ReactionsAudios/surprise/surprise3.mp3";
import surprise4        from "./ReactionsAudios/surprise/surprise4.mp3";

interface IReactionsDictionary{
    [reaction: string]  :{
        name            : string, 
        defaultIntensity: number, 
        icon            : string, 
        description     : string, 
        audios          :{
            [audioItem:string]  : string,
        }
    }
}

export default () => {return ReactionsDictionary}
const ReactionsDictionary:IReactionsDictionary = {
    "agreement":{
        "name": "agreement",
        "defaultIntensity": 2,
        "icon": agreement, 
        "description": "to say yes",
        "audios": {
            "audio1": agreement1,
            "audio2": agreement2,
            "audio3": agreement3,
            "audio4": agreement4
        }
    },
    "disagreement": {
        "name": "disagreement",
        "defaultIntensity": 2,
        "icon": disagreement, 
        "description": "to say no",
        "audios": {
            "audio1": disagreement1,
            "audio2": disagreement2,
            "audio3": disagreement3,
            "audio4": disagreement4
        }
    },
    "laugh": {
        "name": "laugh",
        "defaultIntensity": 2,
        "icon": laugh, 
        "description": "to make happy sounds",
        "audios": {
            "audio1": laugh1,
            "audio2": laugh2,
            "audio3": laugh3,
            "audio4": laugh4
        }
    },
    "surprise": {
        "name": "surprise",
        "defaultIntensity": 2,
        "icon": surprise, 
        "description": "to show you are impressed",
        "audios": {
            "audio1": surprise1,
            "audio2": surprise2,
            "audio3": surprise3,
            "audio4": surprise4
        }
    }
}

