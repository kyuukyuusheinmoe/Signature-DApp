import React, { useState, useEffect } from "react";
import {
  StyledSmallButton,
  StyledImageCard,
  StyledCardContainer,
  StyledFlexContainer,
} from "./sharedStyles";
import storeSignature from "../services/storeSignature";
import { getIpfsHashFromBytes32 } from "../utils";
import ipfs from "../services/ipfs";

const ViewRecentSignature = () => {
  const [hexHash, setHexHash] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [recentSignature, setRecentSignature] = useState(null);

  useEffect(() => {
    console.log("XXX hexHash ", hexHash);
    if (hexHash) {
      const originalHash = getIpfsHashFromBytes32(hexHash);
      setIpfsHash(originalHash);
    }
  }, [hexHash]);

  useEffect(() => {
    try {
      ipfs.files.get(ipfsHash, function (err, files) {
        files.forEach((file) => {
          let img = new Buffer.from(file?.content).toString("base64");
          console.log("Signature image  before ", img);
          img = "data:image/png;base64," + img.slice(19, img.length - 1);
          console.log("Signature image  after ", img);

          setRecentSignature(img);
        });
      });
    } catch (error) {}
  }, [ipfsHash]);

  const readSignatureOnContract = async () => {
    try {
      const trxn = await storeSignature.methods.read().call();
      setHexHash(trxn);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledFlexContainer>
        <StyledCardContainer>
          <h3> Recent Stored Signature</h3>
          <StyledSmallButton onClick={readSignatureOnContract}>
            Fetch
          </StyledSmallButton>
        </StyledCardContainer>
        {recentSignature && (
          <StyledImageCard
            width={300}
            height={200}
            style={{ marginLeft: "2rem" }}
          >
            <img
              src={recentSignature}
              alt="sign_image"
              width={300}
              height={200}
            />
          </StyledImageCard>
        )}
      </StyledFlexContainer>
    </>
  );
};

export default ViewRecentSignature;
