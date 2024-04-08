import React,{useState} from 'react';
import { TextField, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser'
import { userStorage } from './Storage/UserStorage';

const EmailForm: React.FC = () => {
    const {currentUser} = userStorage();
    const [message, setMessage] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.init("k8d_wwr_GDpwtGQ14");

    var params = {
        sendername: currentUser?.userName,
        to: "m.khvalei@gmail.com",
        subject: "UserQuestion",
        replyto: currentUser?.email,
        message: message
    }

    emailjs.send('service_t853fsi', 'template_fjf4nnv', params)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    setMessage('');
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={sendEmail}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            value={message}
            onChange={handleMessageChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            <SendIcon/>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmailForm;