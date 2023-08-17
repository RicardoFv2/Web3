import "./App.css";
import Formulario from "./components/form";
import Menu from "./components/menu";
import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [MetaMask, setMetamask] = useState(false);
  const [web3, setweb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const conectarWallet = async () => {
    console.log("Conectar Wallet");

    if (typeof window.ethereum !== "undefined") {
      const web3Instance = new Web3(window.ethereum);
      setweb3(web3Instance);
      try {
        await window.ethereum.enable();

        const accounts = await web3Instance.eth.getAccounts();
        console.log(accounts[0]);
        setAccount(accounts[0]);

        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
        setBalance(balanceEth);
        console.log(balanceEth);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };

  useEffect(() => {
    async function Wallet() {
      if (typeof window.ethereum !== "undefined") {
        console.log("Si tenemos wallet");
        setMetamask(true);
      } else {
        console.log("No tenemos wallet");
      }
    }
    Wallet();
  }, []);

  return (
    <div>
      {MetaMask ? (
        <>
          <Menu
            conectarWallet={conectarWallet}
            mostrarDireccion={account}
            mostrarBalance={balance}
          />
          <div className="centro">
            <Formulario />
          </div>
        </>
      ) : (
        <div> MAIKI</div>
      )}
    </div>
  );
}

export default App;
