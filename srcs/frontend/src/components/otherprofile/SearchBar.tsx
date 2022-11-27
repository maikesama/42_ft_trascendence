
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BlockIcon from '@mui/icons-material/Block';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "lightgrey",
    '&:hover': {
        backgroundColor: "grey",
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const SearchBar = (props: any) => {
    function renderSearchRow(props: any) {
        const { index, style, matches } = props;

        return (
            <ListItem style={style} key={index} >
                <Avatar />
                <ListItemText primary={`Friend`} />
                <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
                <Divider variant="middle" />
                <IconButton aria-label="watch" size="small" style={{ color: 'lightrey' }}><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
                <IconButton aria-label="unfriend" size="small" style={{ color: 'green' }}><PersonAddOutlinedIcon fontSize="large" /></IconButton>
                <IconButton aria-label="block" size="small" style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle textAlign="center">Search Friends</DialogTitle>
            <DialogContent>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div style={{ textAlignLast: 'center', border: '2px solid lightgrey', borderRadius: '3%', marginTop: '7px' }}>
                    <FixedSizeList
                        height={400}
                        width={400}
                        itemSize={80}
                        itemCount={5} /*Qui deve essere restituito il numero di amici nella lista*/
                        overscanCount={5}
                    >
                        {renderSearchRow}
                    </FixedSizeList>
                </div>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={props.closeStatus}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}