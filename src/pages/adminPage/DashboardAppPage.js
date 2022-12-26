import React,  {useState, useEffect} from 'react';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper } from '@mui/material';

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import axios from 'axios';
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
} from '../../sections/@admin/app';



// ----------------------------------------------------------------------
const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

export default function DashboardAppPage() {
  const theme = useTheme();

  const [productFactory, setProductFactory] = useState([]);

  const getProductFactory = async () => {
    const response = await axios.get("http://localhost:8000/admin/statistic-factory");
    setProductFactory(response.data);
  };

  useEffect(() => { getProductFactory(); }, [])
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
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'icon-park:factory-building'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'map:insurance-agency'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'mdi:car-insurance'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <Chart
                data= {productFactory}
              >
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                  name="Tồn kho"
                  valueField="inventory"
                  argumentField="name"
                  color="#ffd700"
                />
                <BarSeries
                  name="Đã bán"
                  valueField="sold"
                  argumentField="name"
                  color="#c0c0c0"
                />
                <BarSeries
                  name="Lỗi"
                  valueField="error"
                  argumentField="name"
                  color="#cd7f32"
                />
                <Animation />
                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                <Title text="Thống kê sản phẩm tại cơ sở sản xuất" />
                <Stack />
              </Chart>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <Chart
                data={[{
                  country: 'USA',
                  gold: 36,
                  silver: 38,
                  bronze: 36,
                }, {
                  country: 'China',
                  gold: 51,
                  silver: 21,
                  bronze: 28,
                }, {
                  country: 'Russia',
                  gold: 23,
                  silver: 21,
                  bronze: 28,
                }, {
                  country: 'Britain',
                  gold: 19,
                  silver: 13,
                  bronze: 15,
                }, {
                  country: 'Australia',
                  gold: 14,
                  silver: 15,
                  bronze: 17,
                }, {
                  country: 'Germany',
                  gold: 16,
                  silver: 10,
                  bronze: 15,
                }]}
              >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                  name="Gold Medals"
                  valueField="gold"
                  argumentField="country"
                  color="#ffd700"
                />
                <BarSeries
                  name="Silver Medals"
                  valueField="silver"
                  argumentField="country"
                  color="#c0c0c0"
                />
                <BarSeries
                  name="Bronze Medals"
                  valueField="bronze"
                  argumentField="country"
                  color="#cd7f32"
                />
                <Animation />
                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                <Title text="Olimpic Medals in 2008" />
                <Stack />
              </Chart>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <Chart
                data={[{
                  country: 'USA',
                  gold: 36,
                  silver: 38,
                  bronze: 36,
                }, {
                  country: 'China',
                  gold: 51,
                  silver: 21,
                  bronze: 28,
                }, {
                  country: 'Russia',
                  gold: 23,
                  silver: 21,
                  bronze: 28,
                }, {
                  country: 'Britain',
                  gold: 19,
                  silver: 13,
                  bronze: 15,
                }, {
                  country: 'Australia',
                  gold: 14,
                  silver: 15,
                  bronze: 17,
                }, {
                  country: 'Germany',
                  gold: 16,
                  silver: 10,
                  bronze: 15,
                }]}
              >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                  name="Gold Medals"
                  valueField="gold"
                  argumentField="country"
                  color="#ffd700"
                />
                <BarSeries
                  name="Silver Medals"
                  valueField="silver"
                  argumentField="country"
                  color="#c0c0c0"
                />
                <BarSeries
                  name="Bronze Medals"
                  valueField="bronze"
                  argumentField="country"
                  color="#cd7f32"
                />
                <Animation />
                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                <Title text="Olimpic Medals in 2008" />
                <Stack />
              </Chart>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
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
