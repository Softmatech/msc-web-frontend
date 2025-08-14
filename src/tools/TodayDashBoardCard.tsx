import { Card, CardContent, Grid, Typography, Box } from "@mui/material";

const TodayDashboardCard = ({
  title,
  content,
  icon: Icon,
  color = "#1976d2",
}) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          backgroundColor: color,
          color: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            {Icon && <Icon sx={{ fontSize: 30, mr: 1 }} />}
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TodayDashboardCard;
