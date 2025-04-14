import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Style/LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate(); 

  return (
    <div className="landing-container">
      <Card className="LandingCard" >
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Library Necessity
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary',fontSize:"15px" }}>
          A library is not a luxury but one of the necessities of life.
          </Typography>
        </CardContent>
        {/* Centering the buttons and adding navigation */}
        <CardActions className="card-actions">
          <Button 
            className="custom-button" 
            onClick={() => navigate('/adloginpage')}
          >
            Admin Login
          </Button>
          <Button 
            className="custom-button-1" 
            onClick={() => navigate('/userlogin')}
          >
            User Login
          </Button>
        </CardActions>
      </Card>
    </div>

   
  );
}
