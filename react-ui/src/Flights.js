import React from 'react';
import Grid from '@material-ui/core/Grid';
import FlightCard from './FlightCard';
import { Container } from '@material-ui/core';
import { Col, Row } from "react-bootstrap";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


export default class Flights extends React.Component {

  constructor() {
    super();
    this.state = {
      flights: [],
      launch_year: '',
      launch_success: '',
      land_success: '',
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.callCovidApi(this.state.launch_year,this.state.launch_success,this.state.land_success);
  }

  handleClick(e, type) {
    console.log(type);
    e.preventDefault();
    this.setState({
      type: e.currentTarget.value
    })
    switch(type) {
      case 'launch_year' : this.callCovidApi(e.currentTarget.value,'','');
        break;
      case 'launch_success': this.callCovidApi('',e.currentTarget.value,'');
        break;
      case 'land_success': this.callCovidApi('','',e.currentTarget.value);
        break;
      default: 
        break;
    }
  }

  callCovidApi(year, launch, land) {
    console.log('Calling Api');

    let params = '';
    params += year ? '&launch_year=' + year :'';
    params += launch ? '&launch_success=' + launch:'';
    params += land ? '&land_success=' + land :'';

    fetch(
      'https://api.spaceXdata.com/v3/launches?limit=100' + params,
      {
        method: 'GET',
        headers: new Headers({
          accept: 'application/json',
        }),
      }
    )
      .then((res) => res.json())
      .then((response) =>
        this.setState({
          flights: response,
          launch_year: year,
          launch_success: launch,
          land_success: land,
          isLoading: false,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    const { flights, isLoading } = this.state;
    const years = ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
      '2016','2017','2018','2019','2020'];
    console.log(flights);
    const margin = {
      margin: theme.spacing(1),
    };
    
    return isLoading ? (
      <div class="loaderWrapper">
        <div class="loader"></div>
          <p>Loading Dashboard</p>
      </div>
    ) : (
      <Container>
        <Row>
          <Col md={3}>
            <Grid>
            <Card>
              <CardActionArea>
                <CardContent variant="alignCenter">
                  <Typography gutterBottom component="h1">
                    Filters
                  </Typography>
                  <Typography fontSize="10px !important" color="textSecondary" >
                    <span>Launch Year</span><hr/>
                    {/* <Button hidden></Button> */}
                    <Grid container spacing={3}>
                      {years.map((year) => (
                        <Grid item xs = {6}>
                          <Button variant="contained" color="primary" className={margin} buttontype= 'launch_year' value= {year} onClick= {(e) => 
                            this.handleClick(e,'launch_year')}>
                          {year}
                          </Button> 
                        </Grid>
                      ))}
                    </Grid>
                  </Typography>
                  <br></br>
                  <Typography color="textSecondary" className={{textDecoration: 'underline'}}>
                    Successful Launch<hr/>
                    <ThemeProvider theme={theme}>
                      <Grid container spacing={3}>
                        <Grid item xs = {6}>
                          <Button variant="contained" color="primary" className={margin} value= 'true' onClick= {(e) => 
                            this.handleClick(e,'launch_success')}>
                          True
                          </Button> 
                        </Grid>
                        <Grid item xs = {6}>
                          <Button variant="contained" color="primary" className={margin} value= 'false' onClick= {(e) => 
                            this.handleClick(e,'launch_success')}>
                          False
                          </Button> 
                        </Grid>
                      </Grid>
                    </ThemeProvider>
                  </Typography>
                  <br></br>
                  <Typography color="textSecondary" className={{textDecoration: 'underline'}}>
                    Successful Landing<hr/>
                    <ThemeProvider theme={theme}>
                      <Grid container spacing={1}>
                        <Grid item xs = {6}>
                          <Button variant="contained" color="primary" className={margin} value= 'true' onClick= {(e) => 
                            this.handleClick(e,'land_success')}>
                          True
                          </Button> 
                        </Grid>
                        <Grid item xs = {6}>
                          <Button variant="contained" color="primary" className={margin} value= 'false' onClick= {(e) => 
                            this.handleClick(e,'land_success')}>
                          False
                          </Button> 
                        </Grid>
                      </Grid>
                    </ThemeProvider>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Grid>
          </Col>
          <Col >
            <Grid container spacing={3}>
              {flights.map((flight) => (
                <Grid item sm={3}>
                  <FlightCard flight = {flight}/>
                </Grid>
              ))}
            </Grid>
          </Col>
        </Row>
      </Container>
      );
  }
}
