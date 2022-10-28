import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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