import React from 'react'
import { Box } from '@material-ui/core'

const Label = props => (
  <Box 
    color='#C0C0C0'
    fontSize={14}
    {...props}
  />
)

export const GoalLabels = props => (
  <Box display='flex' flexDirection='row' {...props}>
    <Label
      color='#C0C0C0'
      fontSize={14}
      flexBasis='40%'
    >
      Name
    </Label>
    <Label 
      color='#C0C0C0'
      fontSize={14}
      flexBasis='20%'
      textAlign='center'
    >
      Target Date
    </Label>
    <Label 
      color='#C0C0C0'
      fontSize={14}
      flexBasis='20%'
      textAlign='center'
    >
      Weekly Contribution
    </Label>
  </Box>
)