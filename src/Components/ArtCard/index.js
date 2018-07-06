import React from "react";
import { IMAGE_API } from "../../constants";
import styled from "styled-components";

let Card = styled.div`
  border-radius: 5px;
  background: #ffffff;
  margin: 10px;
  padding: 0px;
  height: auto;
  -webkit-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
`;
let CardTitle = styled.p`
  margin-bottom: 0px;
  font-size: 16px;
`;
let CardDescription = styled.div`
  min-height: 70px;
`;
let CardArtist = styled.p`
  margin-bottom: 0px;
  margin-top: 5px;
  font-size: 12px;
`;
let CardImage = styled.img`
  margin-top: 20px;
  width: 150px;
  height: 215px;
`;

const ArtCard = ({ artistName, artTitle, artKey }) => {
  return (
    <Card>
      <CardImage src={IMAGE_API(artKey)} />
      <CardDescription>
        <CardTitle>{artTitle}</CardTitle>
        <CardArtist>
          <i>{artistName}</i>
        </CardArtist>
      </CardDescription>
    </Card>
  );
};

export default ArtCard;
