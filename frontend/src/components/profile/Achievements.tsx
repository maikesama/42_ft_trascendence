import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Achievements = (props:any) => {

    const useStyle = {
      width: '80%',
      achievUnlock:
      {
        width: '80%',
        border: '2px solid green'
      }
    }


    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    return(
        <Accordion style={props.unlocked ? useStyle.achievUnlock : useStyle} expanded={expanded === props.number} onChange={handleChange(props.number)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '100%' }}>
              {props.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                {props.explain}
            </Typography>
          </AccordionDetails>
        </Accordion>
    );
}