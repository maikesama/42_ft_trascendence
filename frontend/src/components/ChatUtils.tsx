import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

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

function renderRow(props: ListChildComponentProps, status: any) {
    const { index, style } = props;

    if(status == 1){
        
    }
    return (
        <ListItem style={style} key={index} >
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}

const [openJoinGroup, setopenJoinGroup] = useState(false);

const handleClickOpenJoinGroup = () => {
        setopenJoinGroup(true);
    };
const handleCloseJoinGroup = () => {
        setopenJoinGroup(false);
    };


function JoinGroup(props:any) {
    
	return(
    <>
        <Dialog open={openJoinGroup} onClose={handleCloseJoinGroup}>
                <DialogTitle>Join Group</DialogTitle>
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

                            height={230}
                            width={500}
                            itemSize={46}
                            itemCount={10}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </div>
                </DialogContent>
            </Dialog>
    </>
	)
}

export {JoinGroup, renderRow, handleClickOpenJoinGroup, handleCloseJoinGroup}