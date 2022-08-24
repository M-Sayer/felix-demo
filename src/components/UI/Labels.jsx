import React from 'react'
import { Box } from '@material-ui/core'

const Label = props => (
  <Box 
    color='#C0C0C0'
    fontSize={14}
    // textAlign="center"
    {...props}
  />
)

export const GoalLabels = props => (
  <Box display='flex' flexDirection='row' {...props}>
    <Label
      flexBasis='40%'
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      Name
    </Label>
    <Label 
      flexBasis='25%'
    >
      Target Date
    </Label>
    <Label 
      flexBasis='35%'
    >
      Weekly Contribution
    </Label>
  </Box>
)

export const TransactionLabels = props => (
  <Box display='flex' flexDirection='row' {...props}>
    <Label
      flexBasis='40%'
    >
      Name
    </Label>
    <Label 
      flexBasis="30%"
    >
      Category
    </Label>
    <Label 
      flexBasis="30%"
    >
      Description
    </Label>
  </Box>
)