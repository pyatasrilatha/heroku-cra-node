import React from 'react';
import Container from 'react-bootstrap/Container';
import Grid from '@material-ui/core/Grid';

function Footer(props) {
    return (
        // <nav class="navbar navbar-dark bg-primary">
        <>
            <Container>
                <Grid xs={12} style={{textAlign:"center"}}><span>Developed By Srilatha</span></Grid>
            </Container>
        </> 
    )
}
export default Footer;