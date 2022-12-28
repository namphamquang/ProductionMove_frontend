import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Select, MenuItem, InputLabel } from '@mui/material';

import axios from 'axios';
import { Label } from '@mui/icons-material';
// components
import Iconify from '../../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@factory/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [productMonth, setProductMonth] = useState([]);
  const [productError, setProductError] = useState([]);
  const getProductMonth = async () => {
    const response = await axios.get(`http://localhost:8000/factory/statistic-year/${localStorage.getItem('id')}`);
    setProductMonth(response.data);
  };
  useEffect(() => {
    getProductMonth();
  }, []);
  const getProductError = async () => {
    const response = await axios.get(`http://localhost:8000/factory/statistic-error/${localStorage.getItem('id')}`);
    setProductError(response.data);
  };
  useEffect(() => {
    getProductError();
  }, []);

  const label = productMonth.map(p => p.month);
  const soldMonth = productMonth.map(p => p.sold);
  const errorMonth = productMonth.map(p => p.error);

  return (
    <>
      <Helmet>
        <title> Dashboard | ProductionMove </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={100}>

            <AppWebsiteVisits
              title="Phân tích sản phẩm năm 2022"
              chartLabels={label}
              chartData={[
                {
                  name: 'Đã bán',
                  type: 'line',
                  fill: 'solid',
                  data: soldMonth,
                },
                {
                  name: 'Lỗi',
                  type: 'area',
                  fill: 'gradient',
                  data: errorMonth,
                },
              ]}
            />

          </Grid>

          <Grid item xs={12} md={6} lg={100}>
            <AppConversionRates
              title="Tỉ lệ sản phẩm lỗi của các dòng sản phẩm"
              chartData={productError}
            />
          </Grid>



          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
