import { extendTheme } from "@chakra-ui/react";
import {DividerTheme} from "./Components/DividerTheme";

export const writeItAloudTheme = extendTheme({
  components:{
    Divider: DividerTheme,
  },
  colors : {
      // aloudGrey: {    
      //   5: "#022bd6", //darker
      //   4: "#035bd8", //This is the standard dark color 
      //   3: "#176ee8", //medium
      //   2: "#297bee", //This is the standard clear color
      //   1: "#176ee8"  //blue
      // },
      aloudBlue: {
        4: "#3088FE",
        3: "#01E9FA",
        2: "#1201FA",
        1: "#016CFA",
      },
      aloudWhite: {
        4: "#C7C7C7",
        3: "#E3E3E3",
        2: "#F1F1F1",
        1: "#FFFFFF"
      }
    },

    fonts : {
      body: '',
    }
})