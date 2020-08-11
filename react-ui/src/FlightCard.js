import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import { Card } from 'react-bootstrap';
// import corona from './performance-metrics.jpg';
import { List, ListItem} from '@material-ui/core';
// const img = require.context('assets/img', true);

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: '5%',
  },
  media: {
    width: '100%',
    height: '160px',
    aspectRatio: 1
  },
  text: {
    fontWeight: 'bold !important',
    fontSize: '0.1em',
  },
  darkblue: {
    color: '#000080',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
});

export default function FlightCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
//   handleClick = () => {
//     this.props.history.push("/source");
//   }
  return (
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant="top" src={corona} />
    //   <Card.Body>
    //     <Card.Title>{props.flight.mission_name} #{props.flight.flight_number}</Card.Title>
    //     <Card.Text>
    //       Mission ids:
    //       <List>
    //           {props.flight.mission_id.map((id) => (
    //             <ListItem>
    //               {bull}{id}
    //               {/* <ListItemIcon>
    //                 <FiberManualRecordIcon/>
    //               </ListItemIcon> */}
    //               {/* <ListItemText primary={id}></ListItemText> */}
    //             </ListItem>
    //           ))}
    //         </List>
    //     </Card.Text>
    //     <Card.Text>Launch Year:{props.flight.launch_year}</Card.Text>
    //     <Card.Text>Successful Launch:{`${props.flight.launch_success ? true : false}`}</Card.Text>
    //     <Card.Text>Successful Landing:{`${props.flight.rocket.first_stage.cores.land_success ? true : false}`}</Card.Text>
    //   </Card.Body>
    // </Card>
    <Card className={classes.root}>

      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image={props.flight.links.mission_patch}
          image= "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHwUqg0Qmpj91zY7L1rFNzulwmAoDeL4or3A&usqp=CAU"
          title="Covid"
        />
        <CardContent class = 'float-left' className = {classes.text}>
          <Typography component="h2" className = {classes.darkblue}>
            <br/>{props.flight.mission_name} #{props.flight.flight_number}<br/>
          </Typography>
          <Typography variant="body2" fontWeight="fontWeightBold">Mission ids:</Typography>
          <Typography>
            <List>
              {props.flight.mission_id.map((id) => (
                <ListItem>
                  {bull}{id}
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography variant="body2">Launch Year:{props.flight.launch_year}</Typography>
          <Typography variant="body2">Successful Launch:{`${props.flight.launch_success ? true : false}`}</Typography>
          <Typography variant="body2">Successful Landing:{`${props.flight.rocket.first_stage.cores.land_success ? true : false}`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}