import "./App.css";
import Formulario from "./components/form";
import Menu from "./components/menu";
import ListarData from "./components/listarData";
import { useState, useEffect } from "react";
import Web3 from "web3";
import smartContractRegistro from "./registro.json";

function App() {
  const [MetaMask, setMetamask] = useState(false);
  const [web3, setweb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState();

  const [ListarInformacionEstudios, setListarInformacionEstudios] = useState(
    []
  );
  console.log("ListarInformacionEstudios =>", ListarInformacionEstudios);

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

        const contractInstance = new web3Instance.eth.Contract(
          smartContractRegistro,
          smartContractRegistro && "0x34D44DBc2c73B0eCb4bC738bfB850f92AaB89ae2"
        );
        setContract(contractInstance);
        console.log("contracInstance ==>", contractInstance);
        console.log(balanceEth);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };

  const ListarRegistros = async () => {
    console.log("contract==>", contract);
    if (contract) {
      try {
        const contadorRegistro = await contract.methods
          .registroCounter()
          .call();

        let arrayEstudio = [];

        for (let i = 1; i <= contadorRegistro; i++) {
          const inforestuido = await contract.methods.estudios(i).call();
          console.log(inforestuido);

          if (inforestuido.categoria != " ") {
            const estudio = {
              categoria: inforestuido.categoria,
              creatAtl: inforestuido.creatAtl,
              fechFin: inforestuido.fechaFin,
              fechaInicio: inforestuido.fechaInicio,
              id: inforestuido.id,
              lugarDeFormación: inforestuido.lugarDeFormación,
              tituloEstudio: inforestuido.tituloEstudio,
              verificacion: inforestuido.verificacion,
            };

            arrayEstudio.push(estudio);
          }
        }
        //  console.log(arrayEstuido);
        setListarInformacionEstudios(arrayEstudio);
      } catch (error) {
        console.log("Error al actualizar el valor", error);
      }
    }
  };

  useEffect(() => {
    ListarRegistros();
  }, [contract]);

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
            <Formulario contrato ={contract} direccion = {account} />
            <ListarData  
            mostrarListados={ListarInformacionEstudios} />
          </div>
        </>
      ) : (
        <div> MAIKI</div>
      )}
    </div>
  );
}

export default App;
