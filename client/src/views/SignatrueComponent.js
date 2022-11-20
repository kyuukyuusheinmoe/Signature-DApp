import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  GridContainer,
  StyledCardContainer,
  StyledSignatureCard,
  StyledCardTitle,
  StyledLargeButton,
  StyledTextButton,
  StyledImageCard,
} from "./sharedStyles";
import storeSignature from "../services/storeSignature";
import web3 from "../services/web3";
import ipfs from "../services/ipfs";
import { getBytes32FromIpfsHash } from "../utils";
import ViewRecentSignature from "./ViewRecentSignature";

const SignatrueComponent = () => {
  const signatureRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageBuffer, setImageBuffer] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [ethAccount, setEthAccount] = useState(null);

  const getActiveEthAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Sending from Metamask account: ", accounts[0]);
    if (accounts && accounts.length > 0) {
      setEthAccount(accounts[0]);
    }
  };

  const getContractAddress = async () => {
    const contractAddr = await storeSignature.options.address;
    console.log("ethAddress: ", contractAddr);
    setContractAddress(contractAddr);
  };

  useEffect(() => {
    const storeImage = async () => {
      if (imageBuffer) {
        await storeImageInIPFS();
      }
    };

    storeImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageBuffer]);

  useEffect(() => {
    writeSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfsHash]);

  const writeSignature = () => {
    if (ipfsHash) {
      const byteValue = getBytes32FromIpfsHash(ipfsHash);

      try {
        storeSignature.methods.write(byteValue).send(
          {
            from: ethAccount,
          },
          (error, transactionHash) => {
            console.log("err hash is ", error);

            setTransactionHash(transactionHash);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const storeImageInIPFS = async () => {
    await ipfs.files.add(imageBuffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      setIpfsHash(ipfsHash[0].hash);
    });
  };

  const clearSign = () => {
    signatureRef.current.clear();
  };

  const saveSign = async () => {
    const signImg = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    const imageBuffer = await Buffer.from(signImg, "base64");

    // const ipnft = await storeOnNFT(imageBuffer);

    setImageUrl(signImg);
    setImageBuffer(imageBuffer);

    await getActiveEthAccount();
    await getContractAddress();

    clearSign();
  };

  return (
    <>
      <GridContainer>
        <StyledCardContainer>
          <StyledCardTitle>
            <p>Signature</p>
            <StyledTextButton onClick={clearSign}>Clear</StyledTextButton>
          </StyledCardTitle>
          <StyledSignatureCard>
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{ width: 700, height: 400, className: "sigCanvas" }}
            />
          </StyledSignatureCard>
          <StyledLargeButton onClick={saveSign}>Submit</StyledLargeButton>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledCardTitle>
            <p>Preview</p>
          </StyledCardTitle>
          <div>
            <StyledImageCard>
              {imageUrl ? (
                <img src={imageUrl} alt="sign_image" width={350} height={250} />
              ) : (
                <p style={{ margin: "auto" }}>No Preview yet</p>
              )}
            </StyledImageCard>
            {contractAddress && <p> Contract Address: {contractAddress} </p>}
            {ipfsHash && <p> Stored Hash: {ipfsHash} </p>}
            {transactionHash && <p> Transaction Hash: {transactionHash} </p>}
          </div>
        </StyledCardContainer>
      </GridContainer>
      <ViewRecentSignature />
    </>
  );
};

export default SignatrueComponent;
