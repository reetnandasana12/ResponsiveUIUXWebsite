import React from 'react';
import { Grid } from '@mui/material';
import MallCard from './MallCard';

const mallData = [
  {
    logo: '/path/to/logo1.png',
    name: 'Nike Sae Mall',
    slogan: 'Just do it bro!',
    products: [
      { name: 'Bag', price: 'Rp650.000' },
      { name: 'Shoes', price: 'Rp270.000' },
      { name: 'Hat', price: 'Rp99.000' },
    ],
  },
  {
    logo: '/path/to/logo2.png',
    name: 'Barudak Disaster Mall',
    slogan: 'Unleash Your Fashion',
    products: [
      { name: 'Jacket', price: 'Rp324.000' },
      { name: 'Shoes', price: 'Rp199.000' },
      { name: 'T-Shirt', price: 'Rp120.000' },
    ],
  },
  // Add more malls here
];

const MallGrid: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {mallData.map((mall, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <MallCard {...mall} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MallGrid;
