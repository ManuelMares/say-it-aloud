import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
const writeItAloudPrimary = defineStyle({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'writeItAloud.600',
    _dark: {
        borderColor: 'writeItAloud.500',
    }
})

export const DividerTheme = defineStyleConfig({
    variants: { writeItAloudPrimary },
})