import Path from './abis/Path.json'
import Token from './abis/Token.json'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // Import ethers.js library
import "./App.css";
import Swal from 'sweetalert2'; 
import Content from "./Content";
import Content2 from "./Content2";
import Web3 from 'web3';

const PathfinderAdres = '0x64491880c3f18276582e16D989943Aba6c141f04';
const TokenAddress = '0x09e6E20FF399c2134C14232E172ce8ba2b03017E';
const ChainRPC = 'https://api.harmony.one';


const App = () => {

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isMetaMaskLoggedIn, setIsMetaMaskLoggedIn] = useState(true);
  const [walletAddress, setWalletAddress] = useState(PathfinderAdres);
  const [Loading, setLoading] = useState(0);
  const [ONEbalance, setONEbalance] = useState(0);
  const [TXH, setTXH] = useState(1);
  const [LoadBalanceD, setLoadBalanceD] = useState(1);
  const [totalBurnt, settotalBurnt] = useState("List Published Videos to see");
  const [ProjectNo, setProjectNo] = useState([]);
  const [ProjectNo2, setProjectNo2] = useState([]);
  const [projectName, setprojectName] = useState('Name');
  const [voteAmount, setvoteAmount] = useState(1);
  const [projectNumara, setprojectNumara] = useState('No');
  const [voteAmountx, setvoteAmountx] = useState(1);
  const [listPublished, setlistPublished] = useState(1);

  
  
  useEffect(() => {
    const loadBalance = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          let ONEbalance = await provider.getBalance(address);
          ONEbalance = parseInt(ONEbalance);
          ONEbalance = ONEbalance / ( 10 ** 18 );


		  setWalletAddress(address);
      setONEbalance(ONEbalance);
        } catch (error) {
          console.error('Error loading balance:', error);
        }
      } else {
        console.log('Please install MetaMask to use this application.');
        setIsMetaMaskInstalled(false);
      }
    };

    loadBalance();
  }, [LoadBalanceD]);


  
  const checkMetaMaskLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setIsMetaMaskLoggedIn(accounts.length > 0);

        
        window.ethereum.on("accountsChanged", (Newaccounts) => {
          // Handle wallet change
          setIsMetaMaskLoggedIn(Newaccounts.length > 0);
          setLoadBalanceD(LoadBalanceD + 1);
          console.log("cüzdan değişti");
        });


        

        
      } catch (error) {
        console.error("Error checking MetaMask login status:", error);


      }
    }
  };

  checkMetaMaskLogin();
  

  
  const loadingOn = async () => {
		setLoading(1);
	}
		
	
	const loadingOff = async () => {
		setLoading(0);
	}




    const updateProjectName = async (evt) => {
      
	  
	  setprojectName(evt.target.value);
	  
	  
    };


    const updateVoteAmount = async (evt) => {
      
	  
      setvoteAmount(evt.target.value);
      
      
      };


      const updateprojectNumara = async (evt) => {
      
	  
        setprojectNumara(evt.target.value);
        
        
        };
    
    
        const updateVoteAmountx = async (evt) => {
          
        
          setvoteAmountx(evt.target.value);
          
          
          };
	





          const eventListeners = async () => {


            try {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(PathfinderAdres, Path.abi, signer);

      

    contract.on("e_publishProject", ()=>{
        
      setTXH(TXH + 1);
    })



  } catch (error) {

    console.error('Error listening events');

  }


          };
        
          
          eventListeners();




    useEffect(() => {

      const handleContractFunction = async () => {
        
      
    
        try {


          const HMY_RPC_URL = ChainRPC;
          const web3 = new Web3(HMY_RPC_URL)
          const contract = new web3.eth.Contract(Path.abi, PathfinderAdres)
          
/*

     //     await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
           const signer = provider.getSigner();


          // Create an instance of the smart contract
             const contract = new ethers.Contract(PathfinderAdres, Path.abi, signer);
          
*/

             let projectCount = await contract.methods.projectCount().call();
             projectCount = parseInt(projectCount);

             const ProjectNo = [];

             loadingOn();
             for (var i = 1; i <= projectCount; i++) {

              const project_tmp = await contract.methods.ProjectNo(i).call();

              const voted = parseInt(project_tmp.voted) / 1000000;
              let votedShow = voted.toLocaleString('en-US', {
                style: 'decimal',
                maximumFractionDigits: 0,
              });
              
                ProjectNo.push({
                  id: i,
                  name: (project_tmp.name).toString(),
                  voted: voted,
                  votedShow: votedShow,
                });


             }
             loadingOff();

  
        ProjectNo.sort((a, b) => {
          if (a.voted < b.voted) {
            return 1;
          }
          if (a.voted > b.voted) {
            return -1;
          }
          return 0;
        });


  
        setProjectNo(ProjectNo);


    
          // Handle the result
          console.log('Smart contract function result:');
      
        } catch (error) {
          console.error('Error calling contract function:', error);
        }
      };
      
      handleContractFunction();
      }, [walletAddress, TXH]);





      const listPublisheds = async () => {


        try {
          
          /*
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.JsonRpcProvider('https://api.s0.b.hmny.io');
           const signer = provider.getSigner();


          // Create an instance of the smart contract
             const contract = new ethers.Contract(PathfinderAdres, Path.abi, signer);

             */

             const HMY_RPC_URL = ChainRPC;
             const web3 = new Web3(HMY_RPC_URL)
             const contract = new web3.eth.Contract(Path.abi, PathfinderAdres)

          
             let projectDoneCount = await contract.methods.projectDoneCount().call();
             projectDoneCount = parseInt(projectDoneCount);

             const ProjectNo2 = [];

             loadingOn();
             for (var i = 1; i <= projectDoneCount; i++) {

              const project_tmp = await contract.methods.ProjectNoDone(i).call();

              const burnt = parseInt(project_tmp.burnt) / 1000000;
              let burntShow = burnt.toLocaleString('en-US', {
                style: 'decimal',
                maximumFractionDigits: 0,
              });
              
                ProjectNo2.push({
                  id: i,
                  name: (project_tmp.name).toString(),
                  burnt: burnt,
                  burntShow: burntShow,
                  link: (project_tmp.link).toString(),
                });


             }
             loadingOff();

  
        ProjectNo2.sort((a, b) => {
          if (a.burnt < b.burnt) {
            return 1;
          }
          if (a.burnt > b.burnt) {
            return -1;
          }
          return 0;
        });
  
        
        let datax = ProjectNo2.reduce((a, v) => (a = a + v.burnt), 0);

        datax = datax.toLocaleString('en-US', {
          style: 'decimal',
          maximumFractionDigits: 2,
        });

        settotalBurnt(datax);


        setProjectNo2(ProjectNo2);



    
          // Handle the result
          console.log('Smart contract function result:');
      
        } catch (error) {
          console.error('Error calling contract function:', error);
        }






      }







      const addProject = async () => {
        const trnsfrAmnt = voteAmount * 1000000;
        const projectNameC = projectName;

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(PathfinderAdres, Path.abi, signer);

        const TokenContract = new ethers.Contract(
          TokenAddress,
          Token.abi,
          signer
        );


        let hak = await TokenContract.allowance(walletAddress, PathfinderAdres);
        hak = parseInt(hak);

        let tokenMiktariK = await TokenContract.balanceOf(walletAddress);
        tokenMiktariK = parseInt(tokenMiktariK);





        if (ONEbalance < 0.1) {
          Swal.fire({
            text: 'You need to have at least 0.1 ONE in your wallet to continue this operation',
            width: 300,
           
        });
        } else if (tokenMiktariK < trnsfrAmnt) {
          Swal.fire({
            text: 'You do not have enough LOP tokens in your wallet',
            width: 300,
           
        });
        } else if ( voteAmount < 1) { 

            Swal.fire({
              text: 'Minimum voting amount is 1',
              width: 300,
             
          });

          } else {


        if (hak === 0) {
          const transactionizin = await TokenContract.increaseAllowance(
            PathfinderAdres,
            trnsfrAmnt,
            {
              from: walletAddress,
              gasPrice: 101000000000,
            }
          );
          loadingOn();
          await transactionizin.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();

          const transaction = await contract.addProject(projectNameC, trnsfrAmnt, {
            from: walletAddress,
            gasPrice: 101000000000,
          });
          loadingOn();
          await transaction.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();
          // Transaction confirmed, execute the success handling code

          setTXH(TXH + 1);
        } else if (hak < trnsfrAmnt) {
          const fark = trnsfrAmnt - hak;

          const transactionizin = await TokenContract.increaseAllowance(
            PathfinderAdres,
            fark,
            {
              from: walletAddress,
              gasPrice: 101000000000,
            }
          );
          loadingOn();
          await transactionizin.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();

          const transaction = await contract.addProject(projectNameC, trnsfrAmnt, {
            from: walletAddress,
            gasPrice: 101000000000,
          });
          loadingOn();
          await transaction.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();
          // Transaction confirmed, execute the success handling code

          setTXH(TXH + 1);
        } else {
          
          const transaction = await contract.addProject(projectNameC, trnsfrAmnt, {
            from: walletAddress,
            gasPrice: 101000000000,
          });
          loadingOn();
          await transaction.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();
          // Transaction confirmed, execute the success handling code

          setTXH(TXH + 1);
        }


      }


    
        
      }


  



      const addtoProject = async () => {

        const trnsfrAmntx = voteAmountx * 1000000;
        const projectNumaraC = projectNumara;


        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();


        const contract = new ethers.Contract(PathfinderAdres, Path.abi, signer);

        const TokenContract = new ethers.Contract(
          TokenAddress,
          Token.abi,
          signer
        );




        let hak = await TokenContract.allowance(walletAddress, PathfinderAdres);
        hak = parseInt(hak);

        let tokenMiktariK = await TokenContract.balanceOf(walletAddress);
        tokenMiktariK = parseInt(tokenMiktariK);


        if (ONEbalance < 0.1) {
          Swal.fire({
            text: 'You need to have at least 0.1 ONE in your wallet to continue this operation',
            width: 300,
           
        });
        } else if (tokenMiktariK < trnsfrAmntx) {
          Swal.fire({
            text: 'You do not have enough LOP tokens in your wallet',
            width: 300,
           
        });
        } else if ( voteAmountx < 1) { 

            Swal.fire({
              text: 'Minimum voting amount is 1',
              width: 300,
             
          });

          } else {



        if (hak === 0) {
          const transactionizin = await TokenContract.increaseAllowance(
            PathfinderAdres,
            trnsfrAmntx,
            {
              from: walletAddress,
              gasPrice: 101000000000,
            }
          );
          loadingOn();
          await transactionizin.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();

          const transaction = await contract.addtoProject(projectNumaraC, trnsfrAmntx, {
            from: walletAddress,
            gasPrice: 101000000000,
          });
          loadingOn();
          await transaction.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();
          // Transaction confirmed, execute the success handling code

          setTXH(TXH + 1);
        } else if (hak < trnsfrAmntx) {
          const fark = trnsfrAmntx - hak;

          const transactionizin = await TokenContract.increaseAllowance(
            PathfinderAdres,
            fark,
            {
              from: walletAddress,
              gasPrice: 101000000000,
            }
          );
          loadingOn();
          await transactionizin.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();

          const transaction = await contract.addtoProject(projectNumaraC, trnsfrAmntx, {
            from: walletAddress,
            gasPrice: 101000000000,
          });
          loadingOn();
          await transaction.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();
          // Transaction confirmed, execute the success handling code

          setTXH(TXH + 1);
        } else {
          
          const transaction = await contract.addtoProject(projectNumaraC, trnsfrAmntx, {
            from: walletAddress,
            gasPrice: 101000000000,
          });
          loadingOn();
          await transaction.wait(); // Wait for the transaction to be confirmed on the blockchain
          loadingOff();
          // Transaction confirmed, execute the success handling code

          setTXH(TXH + 1);
        }



      }






      }


  return (
    

<div className="text-center">



        <div className="publishVideosBaslik">
          Pathfinder (
            <a
                      href="https://kilopi.net/blog/index.php?view=article&id=24:how-to-use-pathfinder&catid=2"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      How to use
                    </a>
            
            )
        </div>

       
        <br />
        <div className="project">
          <div id="votelist">Voting List</div>

          

          <div className="newproject">


          {isMetaMaskInstalled ? (
            <>
            {isMetaMaskLoggedIn ? (
              <>


            {" "}
            <input
              className="yazigirisi"
              value={projectName}
              onChange={updateProjectName}
            />{" "}
            &nbsp;
            <input
              className="yazigirisi"
              type="number"
              value={voteAmount}
              onChange={updateVoteAmount}
            />{" "}
            &nbsp;
            <button
              className="btn"
              onClick={(event) => {
                event.preventDefault();
                addProject();
              }}
            >
              Create
            </button>


            </>
            ) : (
              <p>Please log in to your MetaMask wallet.</p>
            )}
</>
) : (
  <p>Please install MetaMask to use this application.</p>
)}


          </div>
          <div className="vote">

          {isMetaMaskInstalled ? (
            <>
            {isMetaMaskLoggedIn ? (
              <>
            
            <input
              className="yazigirisi"
              value={projectNumara}
              onChange={updateprojectNumara}
            />
            &nbsp;
            <input
              type="number"
              className="yazigirisi"
              value={voteAmountx}
              onChange={updateVoteAmountx}
            />{" "}
            &nbsp;
            <button
              className="btn"
              onClick={(event) => {
                event.preventDefault();
                addtoProject();
              }}
            >
              Add
            </button>

            </>
            ) : (
              <p> </p>
            )}
</>
) : (
  <p> </p>
)}


          </div>
          <br />

          
          

        </div>


        


        {Loading === 1 && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}


        <div className="kolon1">


            <Content ProjectNo={ProjectNo} />

        </div>





        <div className="kisim2">
            <div className="publishTotalburn">
               <div className="publishVideos">Published Videos</div>
                  <div className="totalBurn">
                      Total Burnt LOP Tokens = {totalBurnt}
                  </div>
            
          <div className="kolon2">



          <div>
          {listPublished === 1 &&
<div>

<button
              className="btnList"
              onClick={(event) => {

                event.preventDefault();


                  setlistPublished(2);
                  listPublisheds();


              }}
            >
              List Published Videos
            </button>
	
				</div>
}
</div>
   


            {listPublished === 2 &&
<>

<Content2 ProjectNo2={ProjectNo2} />
	
				</>
}

              





          </div>

          </div>
        </div>
        

      </div>






  );
};

export default App;
