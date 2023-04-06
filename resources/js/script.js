let account;
const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        document.getElementById("userArea").innerHTML = `User Account: ${account}`;
    }
}

const getMetamaskBalance = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] });
            document.getElementById('MetabalanceArea').innerHTML = `MetaMask Balance: ${balance}`;
        } catch (error) {
            console.error(error);
        }
    }
}




const connectContract = async () => {
    const ABI = [
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const Address = "0xb9898b3b7e7c2e4f3CA2455F1C0889a1e11E56be"; // Taking Address from Remix 
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
}

const getContractAccount = async () => {
    try {
        const data = await window.contract.methods.getAddress().call();
        document.getElementById("contractAccount").innerHTML = `Contract Account: ${data}`;
    } catch (error) {
        console.error(error);
    }
}


const getBalanceApple = async () => { // const getBalanceApple is the HTML function & .contract.getBalance is the smart contract function
    try {
        const data = await window.contract.methods.getBalance().call();
        document.getElementById("balanceArea").innerHTML = `Contract Balance: ${data}`;
    } catch (error) {
        console.error(error);
    }
}

const depositContract = async () => {
    try {
        const amount = document.getElementById("depositInput").value;
        await window.contract.methods.deposit().send({ from: account, value: amount });
    } catch (error) {
        console.error(error);
    }
}

const withdraw = async () => {
    try {
        const amount = document.getElementById("amountInput").value;
        const address = document.getElementById("addressInput").value;
        await window.contract.methods.withdraw(address, amount).send({ from: account });
    } catch (error) {
        console.error(error);
    }
}