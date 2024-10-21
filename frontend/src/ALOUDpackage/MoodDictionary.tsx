export default () => {return MoodDictionary}

interface IMoodDictionary{
    [mood: string]  : {
        name        : string, 
        description : string
    }
}

const MoodDictionary:IMoodDictionary = {   
    // HAPPY    :  { mood: "happy",    description: "Louder, brighter voice."},
    // ANGRY    :  { mood: "angry",    description: "Louder, faster, aggressive voice."},
    SAD      :  { name: "sad",      description: "lower, slower, voice."},
    NORMAL   :  { name: "normal",   description: "default."},
    // WHISPER  :  { mood: "whisper",  description: "slower, loud, echo-ed voice."},
}