interface IAcronym
{
    id              : string,
    name            : string,
    description      : string,
    pinnedstatus    : boolean
}

interface IAcronymDictionary {
    [acronym:string]:IAcronym
}

export type {
    IAcronym,
    IAcronymDictionary
}