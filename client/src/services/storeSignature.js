import web3 from "./web3";

const address = "0x12865C933B9fa65698C12DBFe7a615d67abEBD12";

const abi = [
  {
    constant: true,
    inputs: [],
    name: "read",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x57de26a4",
  },
  {
    constant: false,
    inputs: [
      {
        name: "newValue",
        type: "string",
      },
    ],
    name: "write",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xebaac771",
  },
];

export default new web3.eth.Contract(abi, address);
