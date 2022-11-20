const bs58 = require("bs58");
var { NFTStorage, File } = require("nft.storage");

const NFT_STORE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzQjEwNEE1MWMxQUQyNDQwYTk0MjNjODEzZGNCQUVDRDU3ODY3NzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODY2NzQ4NTExMywibmFtZSI6IlNpbXBsZVN0b3JhZ2UifQ.u_PRFXCFCIRRPljVEM-rgFAi224QF28AtA-ZZq8NAQc";

export const getBytes32FromIpfsHash = (ipfsHash) => {
  console.log("XXX ipfsHash in utils ", ipfsHash);
  // return "0x" + bs58.decode(ipfsListing).slice(2).toString("hex");

  const bytes = bs58.decode(ipfsHash);
  return "0x" + Buffer.from(bytes).toString("hex");
};

export const getIpfsHashFromBytes32 = (bytes32Hex) => {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = bytes32Hex.slice(2);
  const hashBytes = Buffer.from(hashHex, "hex");
  const hashStr = bs58.encode(hashBytes);
  return hashStr;
};

export const storeOnNFT = async (bufferData) => {
  console.log("XXX storeOnNFT");
  const client = new NFTStorage({ token: NFT_STORE_API_KEY });

  try {
    const metaData = await client.store({
      name: "Example NFT",
      description: "Testing IPFS network",
      image: new File([bufferData], "mimi.png", {
        type: "image/png",
      }),
    });
    console.log("XXX metaData ", metaData);
    return metaData?.ipnft;
  } catch (error) {}
};
