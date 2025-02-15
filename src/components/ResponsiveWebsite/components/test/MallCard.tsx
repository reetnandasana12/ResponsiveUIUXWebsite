import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';

interface Product {
  name: string;
  price: string;
}

interface MallCardProps {
  logo: string;
  name: string;
  slogan: string;
  products: Product[];
}

const MallCard: React.FC<MallCardProps> = ({ logo, name, slogan, products }) => {
  return (
    <Card elevation={3} sx={{ borderRadius: 2, p: 2, maxWidth: 350 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar src={logo} alt={name} sx={{ width: 50, height: 50 }} />
        </Grid>
        <Grid item xs>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {slogan}
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={4} key={index}>
              <div style={{ textAlign: 'center' }}>
                <Typography variant="body2">{product.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {product.price}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MallCard;
