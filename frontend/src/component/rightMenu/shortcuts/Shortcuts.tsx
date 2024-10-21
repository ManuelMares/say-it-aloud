import Shortcut from './Shortcut';

export default function Shortcuts(){

    const shortcuts:Combination = {
      "Move between text are and dictionary" : ["tab"],
      "Move 1 word right" : ["ctrl", "→"],
      "Move 1 word left" : ["ctrl", "←"],
      "Delete word on left" : ["ctrl", "del"],
      "Select a whole line upwards": ["shift", "↑"],
      "Select a whole line downwards": ["shift", "↓"]
    }
    interface Combination{
      [key: string]: string[];
    }
    return(
        <div className='w-100'>
            <label className='pb-3'>
                Type faster with shortcuts
            </label>

            {
              Object.keys(shortcuts).map( (key:string) => {
                return <Shortcut description = {key} shortcut= {shortcuts[key] }></Shortcut>
              })
            }
        </div>
    )
}
