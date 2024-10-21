import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import randomIcon from "../../../icons/random_blue.png";
import playIcon from "../../../icons/play_blue.png"
import { useState } from "react";
import {SunIcon} from "@chakra-ui/icons";

interface IReaction{  
    name            : string, 
    defaultIntensity: number, 
    icon            : string, 
    description     : string, 
    audios          :{
        [audioItem:string]  : string,
    }
}
export default function Reaction(props:IReaction){
    const [sliderValue, setSliderValue] = useState(2)
    const [showTooltip, setShowTooltip] = useState(false)
    const [onHover, setOnHover] = useState<boolean>(false)
    
    
    function Play(intensity:number){
        let audio = null;
        switch (intensity) {
            case 0:
                audio = new Audio(props.audios.audio1);
                break;        
            case 1:
                audio = new Audio(props.audios.audio2);
                break;        
            case 2:
                audio = new Audio(props.audios.audio3);
                break;        
            case 3:
                audio = new Audio(props.audios.audio4);
                break;        
            default:
                audio = new Audio(props.audios.audio2);
                break;
        }
        audio!.play();
    }

    function playRandom()
    {
        const random = Math.floor(Math.random() * 3);
        Play(random);
    }

    return(
        <div className=" hover-bg-white hover-shadow rounded-4 d-flex flex-column p-2 " onMouseEnter={()=>setOnHover(true)} onMouseLeave={()=>setOnHover(false)}>
            {/* Start Reaction */}
            <div className="d-flex flex-column justify-content-center align-items-center" style={{position: "relative"}}>
                <img style={{margin: "5px", paddingTop:"5px", width: "35px", height: "35px"}} src={props.icon}>
                </img>
                <div className="">
                    {props.name}
                </div>

                <Tooltip label="Play Reaction"  bg='blue.500' color='white' placement='top'>
                    <button className="white-background rounded-circle shadow hover-button d-flex align-items-center justify-content-center" 
                            style={{ visibility: onHover ? "visible" : "hidden", margin:"5px", position:"absolute", zIndex: 10, top:"0px", aspectRatio: "1", width: "45px", height: "45px", border: "solid 1px var(--iccc-blue-quaternary)"}}
                            onClick={()=> {Play(sliderValue)}}
                            >
                        <img  style={{width: "25px", maxHeight: "25px"}} src={playIcon}>
                        </img>
                    </button>
                </Tooltip>

            </div>
            {/* End Reaction */}

            {/* Start hidden section */}
            <div className="d-flex flex-row py-2" style={{visibility: onHover ? "visible" : "hidden" }}>
                <Tooltip label="Play Random Intensity"  bg='blue.500' color='white' placement='top'>
                    <button onClick={() => playRandom()} className="rounded-circle shadow hover-button" style={{ padding: "5px", aspectRatio: "1", width: "25px", height: "25px"}}>
                        <img style={{width: "15px", maxHeight: "15px", aspectRatio:"1"}} src={randomIcon}>
                        </img>
                    </button>
                </Tooltip>

                <div className="px-2 ps-3" style={{width: "100px"}}>
                    <Slider
                        id='slider'
                        defaultValue={props.defaultIntensity}
                        min={0}
                        max={3}
                        colorScheme='blue'
                        onChange={(v:number) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        >
                        <SliderMark value={0} mt='1' ml='' fontSize='sm'>
                            1
                        </SliderMark>
                        <SliderMark value={1} mt='1' ml='-1' fontSize='sm'>
                            2
                        </SliderMark>
                        <SliderMark value={2} mt='1' ml='-1' fontSize='sm'>
                            3
                        </SliderMark>
                        <SliderMark value={3} mt='1' ml='-1' fontSize='sm'>
                            4
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                            hasArrow
                            bg='blue.500'
                            color='white'
                            placement='top'
                            isOpen={showTooltip}
                            label={"Intensity Level"}
                        >
                            <SliderThumb boxSize={6}>
                            <Box color='blue.400' as={SunIcon} />
                            </SliderThumb>
                        </Tooltip>
                    </Slider>
                </div>
            </div> 
            {/* End hidden section */}

        </div>
    )
}