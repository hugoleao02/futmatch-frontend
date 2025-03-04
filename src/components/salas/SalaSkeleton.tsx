import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Skeleton,
} from "@mui/material";

interface SalaSkeletonProps {
  count?: number;
}

const SalaSkeleton: React.FC<SalaSkeletonProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="80%" height={32} />
              <Skeleton variant="text" width="60%" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Box>
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width="100%" height={36} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default SalaSkeleton;
