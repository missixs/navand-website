import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as PushNotifications from '@pusher/push-notifications-web'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Cookies from 'universal-cookie';

const PurpleSwitch = withStyles({

    switchBase: {

        color: pink[500],
        '&$checked': {
            color: pink[400],

        },
        '&$checked + $track': {
            backgroundColor: pink[400],
        },
    },
    checked: {},
    track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',

        },
        '& .MuiFormGroup-root': {
            padding: '10px'
        },
    },
    button: {
        margin: theme.spacing(1),
    },

}));

const beamsClient = new PushNotifications.Client({
    instanceId: '5ef6cb51-3913-416a-891b-637f5068d31d',
});

const getEnable = () => { return cookies.get('enabled') === 'true' ? true : false; };
const getToken = () => { return cookies.get('tk') || 'ALL' };

const cookies = new Cookies();
beamsClient.start()
    .then(() => beamsClient.getDeviceId())
    .then(deviceId => {
        console.log('Your device ID is : ', deviceId); // Will log something like web-1234-1234-1234-1234
    }).then(() => {
        beamsClient.clearDeviceInterests().then(() => {
            const enabled = getEnable();///TODO:Fix this 
            const tk = getToken();

            if (enabled)
                beamsClient.setDeviceInterests([tk]).then(() => {
                    beamsClient.getDeviceInterests()
                        .then(interests => {
                            console.log("DeVice Interests Initial", interests) // Will log something like ["a", "b", "c"]
                        })
                })
        })
    });



export default function MultilineTextFields() {
    const classes = useStyles();

    const enabled = getEnable(); ///TODO:Fix this 
    const [is_enabled, setState] = React.useState(enabled);
    const [value, setValue] = React.useState(getToken());

    const getDeviceInterests = () => {
        beamsClient.getDeviceInterests()
            .then(interests => {
                console.log("DeVice Interests", interests) // Will log something like ["a", "b", "c"]
            })
    }

    const update_notification_status = () => {
        beamsClient.clearDeviceInterests().then(() => {
            const enabled = getEnable(); ///TODO:Fix this 
            if (enabled)
                beamsClient.setDeviceInterests([value]).then(() => {
                    getDeviceInterests();
                });
        })
    };

    const onSwitchClick = (event) => {
        setState(event.target.checked);
        cookies.set('enabled', event.target.checked, { path: '/' });
        update_notification_status();
    };


    const onTextChange = (event) => {
        setValue(event.target.value);
    };


    const onSubmitClick = (e) => {
        e.preventDefault();

        cookies.set('tk', value, { path: '/' });
        update_notification_status();
    }


    return (
        <div>
            <div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitClick}>
                    <Box display="flex" flexDirection="column"  >
                        <FormGroup>
                            <FormControlLabel
                                control={<PurpleSwitch checked={is_enabled} onChange={onSwitchClick} name="checkedA" />}
                                label="Receive notifications"
                            />
                        </FormGroup>
                        <TextField
                            id="outlined-textarea"
                            label="Token"
                            placeholder="Your Token from Android App"
                            multiline
                            variant="outlined"
                            color="secondary"
                            onChange={onTextChange}
                            value={value}
                            autoFocus={false}

                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type="submit" >
                            Save
                </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
}