import { Card, CardContent, Grid, Typography } from "@mui/material";

const DashBoardCard = ({ title, content, style, icon: Icon }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <Card style={style}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {Icon && (
              <Icon
                fontSize="small"
                style={{ verticalAlign: "middle", marginRight: 4 }}
              />
            )}
            {title}
          </Typography>
          <Typography variant="h4">{content}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DashBoardCard;
