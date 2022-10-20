import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import profilePic from '../images/bg_room.jpg'
import Grid from '@material-ui/core/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import StepLabel from '@mui/material/StepLabel';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

export const MatchesList = (props: any) => {
    function renderMatchesRow(props: any) {
        const { index, style, matches } = props;

        return (
            <ListItem button className="matchResult" style={style} key={index}>
                <Avatar sx={{ width: 56, height: 56 }} />
                <ListItemText className="matchLossResult" primary={`You`} />
                <ListItemText className="matchLossResult" primary={`3 - 5`} />
                <ListItemText className="matchLossResult" primary={`Adversary`} />
                <Avatar sx={{ width: 56, height: 56 }} />
            </ListItem>
        );
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle textAlign="center">Matches List</DialogTitle>
            <DialogContent>
                <div style={{ textAlignLast: 'center' }}>
                    <FixedSizeList
                        height={400}
                        width={400}
                        itemSize={80}
                        itemCount={5} /*Qui deve essere restituito il numero di match completati*/
                        overscanCount={5}
                    >
                        {renderMatchesRow}
                    </FixedSizeList>
                </div>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={props.closeStatus}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}