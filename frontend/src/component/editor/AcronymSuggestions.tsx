import { TabList, Tab, Tabs, TabPanels, TabPanel, Text } from "@chakra-ui/react";

interface Props{
    matchingValues: string[][],
    handleTabClick: (index:number)=>void,
}
export default function AcronymSuggestions(props:Props){
    /*
        This components render the acronym function at the bottom of the text editor.
    */
    return(
        <div className='overflow-hidden' style={{ display: 'flex', height: '30%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Tabs colorScheme="blue" isLazy isFitted variant='unstyled' >
                <TabList>
                    {props.matchingValues.map(([key,], index) => (
                        <Tab _selected={{ color: 'white', bg: 'blue.500' }} key={index} 
                        onClick={() => props.handleTabClick(index)} >{key}</Tab> 
                    ))}
                </TabList>
                <TabPanels>
                    {props.matchingValues.map(([, value], index) => (
                        <TabPanel key={index}>
                            <Text>{value}</Text>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </div>
    )
}