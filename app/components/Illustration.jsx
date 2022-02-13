import React from "react";
import { Grid } from "~/components/Grid";
import { Tile } from "~/components/Tile";

export function Illustration() {
  return (
    <div className="inline-block">
      <Grid>
        <Tile status="match">I</Tile>
        <Tile status="include">N</Tile>
        <Tile status="miss">F</Tile>
        <Tile status="miss">I</Tile>
        <Tile status="match">N</Tile>

        <Tile status="match">I</Tile>
        <Tile status="miss">T</Tile>
        <Tile status="include">E</Tile>
        <Tile status="miss">W</Tile>
        <Tile status="miss">O</Tile>

        <Tile status="miss">R</Tile>
        <Tile status="match">D</Tile>
        <Tile status="include">L</Tile>
        <Tile status="match">E</Tile>
        <Tile status="miss">.</Tile>
      </Grid>
    </div>
  );
}
