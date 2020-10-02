import React from "react";
import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AndroidIcon from "@material-ui/icons/Android";


const notSelected = "NOT_SELECTED";
const ABIs = [
    "x86-64",
    "armeabi-v7a",
    "arm64-v8a",
    "I don't know what ABI is."
];

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(notSelected);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="select-ABI"
            open={open}
        >
            <DialogTitle id="select-ABI">Please select ABI</DialogTitle>
            <List>
                {ABIs.map((ABI) => (
                    <ListItem
                        button
                        onClick={() => handleListItemClick(ABI)}
                        key={ABI}
                    >
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <AndroidIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={ABI} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function Android() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(notSelected);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {

        setOpen(false);
        setSelectedValue(value);
        switch (value) {
            case notSelected:
                return;

            case ABIs[0]: {
                window.location.href = '/navand-x86_64-release.apk';
                break;
            }
            case ABIs[1]: {
                window.location.href = '/navand-armeabi-v7a-release.apk';
                break;
            }
            case ABIs[2]: {
                window.location.href = '/navand-arm64-v8a-release.apk';
                break;
            }
            case ABIs[3]: {
                window.location.href = '/navand.apk';
                break;
            }
            default:
                break;
        }
    };

    return (
        <div className={classes.root}>
            <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                <AndroidIcon />
            </Fab>

            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>);
}