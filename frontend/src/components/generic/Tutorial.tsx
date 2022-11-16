
import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "../css/Message.css";
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button/Button';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const steps = [
    {
        label: 'Play Classic',
        description: `The Classic mode is what you would expect:
                    the legacy pong game against a real opponent, the first one to score 5 points wins the match;
                    upon victory you will gain 10 personal points and if you lose you will lose as much.
                    You can move up and down using W and S OR Arrow Up and Arrow Down.`,
    },
    {
        label: 'Play Custom',
        description: `The Custom mode is totally unexpected:
                    You can move both vertically and horizontally, using the same buttons as the classic mode plus A and D OR Arrow Left and Arrow Right;
                    there will be Power Ups and, of course, Power Downs that will make the game more interesting.
                    This mode is a bit longer, to win you need to score 10 points; doing so, you will gain 30 personal points
                    but you will lose as much if you are not the winner.`,
    },
    {
        label: 'Custom Power Ups/Downs',
        description: ``,
        img1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Star_with_eyes.svg/1920px-Star_with_eyes.svg.png',
        img2: 'https://www.clipartmax.com/png/full/27-274934_new-super-mario-bros-mario-power-up-mushroom.png',
        img3: 'https://www.clipartmax.com/png/full/202-2029979_boomerang-mario-boomerang-mario.png',
        img4: 'https://www.clipartmax.com/png/full/373-3735636_blooper-weird-very-hard-to-destroy-creature-blooper-weird-very-hard-to.png',
    },
    {
        label: 'Quitting',
        description: `Quitters are puny losers, don't do that. It's not fun. -42 points.`,
    },
];

export const Tutorial = (props: any) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>

                <Box sx={{ maxWidth: 400, padding: 4 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 3 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                    {index === 2 ?
                                    <>
                                    <table border={1} style={{padding: 3}}>
                                        <tr style={{border: '1px solid'}}>
                                            {/* <th colspan="2">When the ball hits the power ups/downs:</th> */}
                                            <th colSpan={2} style={{border: 1}}>When the ball hits the power ups/downs:</th>
                                        </tr>
                                        <tr style={{border: '1px solid'}}>
                                            <td><img width="25px" height="25px" src={step.img1}/></td>
                                            <td>Speed, the ball starts to go faster</td>
                                        </tr>
                                        <tr style={{border: '1px solid'}}>
                                            <td><img width="25px" height="25px" src={step.img2}/></td>
                                            <td>Size, the ball changes the size</td>
                                        </tr>
                                        <tr style={{border: '1px solid'}}>
                                            <td><img width="25px" height="25px" src={step.img3}/></td>
                                            <td>Reverse, the ball reverses its direction</td>
                                        </tr>
                                        <tr style={{border: '1px solid'}}>
                                            <td><img width="25px" height="25px" src={step.img4}/></td>
                                            <td>Ball black, the ball bounces</td>
                                        </tr>
                                    </table>
                                    </>
                                    : null
                                    }
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={props.closeStatus} sx={{ mt: 1, mr: 1 }}>
                                CLOSE
                            </Button>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                AGAIN
                            </Button>
                        </Paper>
                    )}
                </Box>

            </Dialog>
        </>
    );
}


