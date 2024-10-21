export default () => {return AcronymDictionary}

interface IAcronymDictionary{
    [acronym:string]    :{
        id              : string, 
        name            : string, 
        description     : string, 
        pinnedstatus    : boolean,
    }
}
const AcronymDictionary:IAcronymDictionary = {    
    "0192cf4e-cd91-4a11-9e0a-eeed86fca4d7": {
        "id": "0192cf4e-cd91-4a11-9e0a-eeed86fca4d7",
        "name": "intro",
        "description": "welcome to aloud. this is a small demo",
        "pinnedstatus": true
    },
    "fd561570-a8dc-47a3-b192-40dfa63048c8": {
        "id": "fd561570-a8dc-47a3-b192-40dfa63048c8",
        "name": "lol",
        "description": "laughing out loud",
        "pinnedstatus": false
    },
    "96aabfab-0695-4e4c-a297-5179fd2aaf1c": {
        "id": "96aabfab-0695-4e4c-a297-5179fd2aaf1c",
        "name": "hhy",
        "description": "hellow how are yo",
        "pinnedstatus": false
    },
    "54111d3e-1464-45ef-b488-6b8684207685": {
        "id": "54111d3e-1464-45ef-b488-6b8684207685",
        "name": "leave",
        "description": "well, i left beans in the pot at home. i got to go",
        "pinnedstatus": false
    },
    "00f11547-eaab-4c1d-bf1d-3244727fa81f": {
        "id": "00f11547-eaab-4c1d-bf1d-3244727fa81f",
        "name": "complex",
        "description": "\\sad{i can embed voices}",
        "pinnedstatus": false
    },
    "8e89aff2-136d-42d9-a895-775d5a3596b0": {
        "id": "8e89aff2-136d-42d9-a895-775d5a3596b0",
        "name": "comacro",
        "description": "\\sad{this acronym uses a voice}",
        "pinnedstatus": false
    }
}