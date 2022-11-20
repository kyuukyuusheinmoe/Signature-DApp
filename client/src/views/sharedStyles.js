import styled from "styled-components";

const StyledAppTitle = styled.h1`
  text-align: center;
`;

const StyledMainContainer = styled.div`
  margin: auto;
  width: 80%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 50px;
  align-items: stretch;
`;

const StyledCardContainer = styled.div``;

const StyledPreviewCard = styled.div``;

const StyledSignatureCard = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const StyledCardTitle = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledFlexContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
`;

const StyledLargeButton = styled.button`
  padding: 1rem;
  border: 1px solid;
  border-radius: 1rem;
  width: 100%;
  margin-top: 1rem;
  background: black;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

const StyledTextButton = styled.p`
  cursor: pointer;

  :hover {
    color: grey;
  }
`;

const StyledImageCard = styled.div`
  width: ${(props) => (props.width ? props.width : "500")}px;
  height: 250px;
  background-color: #e3e1e1;
  border: 1px solid #e3e1e1;
  border-radius: 5px;
  display: flex;
`;

const StyledSmallButton = styled.button`
  padding: 1rem;
  border: 1px solid;
  max-width: 400px;
  background: black;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

export {
  StyledAppTitle,
  StyledMainContainer,
  GridContainer,
  StyledCardContainer,
  StyledSignatureCard,
  StyledCardTitle,
  StyledFlexContainer,
  StyledLargeButton,
  StyledTextButton,
  StyledImageCard,
  StyledSmallButton,
  StyledPreviewCard,
};
