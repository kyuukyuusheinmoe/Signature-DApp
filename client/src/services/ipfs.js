const IPFS = require("ipfs-api");

//authentication for Project ID and Secrete
const IPFS_AUTH = "";

const auth = ` Basic ${IPFS_AUTH}`;

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
console.log(ipfs);
export default ipfs;
