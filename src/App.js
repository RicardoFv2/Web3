import "./App.css";
import Formulario from "./components/form";
import Menu from "./components/menu";
import { useState, useEffect } from "react";
import Web3 from 'web3';

function App() {
  const [MetaMask, setMetamask] = useState(false);
  const [web3, setweb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const conectarWallet = async () => {
    console.log("Conectar Wallet");
  };

  useEffect(() => {
    async function Wallet() {
      if (typeof window.ethereum !== "undefined") {
        const web3Instance = new web3(window.ethereum);
        setweb3(web3Instance);

        try {
        } catch (error) {
          console.error(error);
        }

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
          <Menu conectarWallet={conectarWallet} />
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
