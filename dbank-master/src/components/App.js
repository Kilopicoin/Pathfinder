import React, { Component } from "react";
import Polly15 from "../abis/Polly15.json";
import LOP from "../abis/LOP.json";
import Web3 from "web3";
//import web3 from './web3';
import "./App.css";
import Content from "./Content";
import Content2 from "./Content2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //     web3: 'undefined',
      account: "",
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null,
      datax: "",
      pollyadresi: "0x61412D7b2bEBa95A44fE4d2C3E8599985951f559",
      tokenadresi: "0x1791c97603b4695f53A4f1c02ca0efB74C44b310",
      projectName: "",
      projectNumara: "",
      voteAmount: 1000,
      voteAmountx: 1000,
      ProjectNo: [],
      ProjectNo2: [],
      hasVoted: false,
      loading: false,
    };

    this.updateProjectName = this.updateProjectName.bind(this);
    this.updateVoteAmount = this.updateVoteAmount.bind(this);
    this.updateVoteAmountx = this.updateVoteAmountx.bind(this);
    this.updateprojectNumara = this.updateprojectNumara.bind(this);
  }

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    this.fetchData();
    this.startEventListener();
    this.startEventListener2();
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum === "undefined") {
      //      const web3 = new web3(this.state.HMY_TESTNET_RPC_URL)

      //      const web3 = new Web3(window.ethereum)

      window.alert("Please install MetaMask");

      const HMY_RPC_URL = "https://api.s0.t.hmny.io";
      const web3 = new Web3(HMY_RPC_URL);

      const polly15 = new web3.eth.Contract(
        Polly15.abi,
        this.state.pollyadresi
      );
      const LOPx = new web3.eth.Contract(LOP.abi, this.state.tokenadresi);
      this.setState({ polly15: polly15 });
      this.setState({ LOPx: LOPx });
    } else {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable();

      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], balance: balance, web3: web3 });

        const polly15 = new web3.eth.Contract(
          Polly15.abi,
          this.state.pollyadresi
        );
        const LOPx = new web3.eth.Contract(LOP.abi, this.state.tokenadresi);
        this.setState({ polly15: polly15 });
        this.setState({ LOPx: LOPx });
      } else {
        window.alert("Please login with MetaMask");

        const HMY_RPC_URL = "https://api.s0.t.hmny.io";
        const web3 = new Web3(HMY_RPC_URL);

        const polly15 = new web3.eth.Contract(
          Polly15.abi,
          this.state.pollyadresi
        );
        const LOPx = new web3.eth.Contract(LOP.abi, this.state.tokenadresi);
        this.setState({ polly15: polly15 });
        this.setState({ LOPx: LOPx });
      }

      //load contracts
    }
  }

  startEventListener() {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    this.state.polly15.events
      .e_addProject({})
      .on("data", async function (event) {
        console.log(event.returnValues);

        // Do something here
        window.location.reload();
      })
      .on("error", console.error);
  }

  startEventListener2() {
    this.state.polly15.events
      .e_addtoProject({})
      .on("data", async function (event) {
        console.log(event.returnValues);

        // Do something here
        window.location.reload();
      })
      .on("error", console.error);
  }

  async fetchData() {
    const projectCount = await this.state.polly15.methods.projectCount().call();
    console.log("projectCount", projectCount);

    for (var i = 1; i <= projectCount; i++) {
      const project_tmp = await this.state.polly15.methods.ProjectNo(i).call();
      console.log("project_tmp", project_tmp);

      const ProjectNo = [...this.state.ProjectNo];
      const ProjectNo2 = [...this.state.ProjectNo2];

      //		let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(project_tmp.recordTime.toNumber());

      if (project_tmp.published === "0") {
        ProjectNo.push({
          id: project_tmp.id,
          name: project_tmp.name,
          voted: project_tmp.voted / 1000000,
          published: project_tmp.published,
        });
      }

      if (project_tmp.published === "1") {
        ProjectNo2.push({
          id: project_tmp.id,
          name: project_tmp.name,
          voted: project_tmp.voted / 1000000,
          burnt: project_tmp.burnt / 1000000,
          link: project_tmp.link,
          published: project_tmp.published,
          linktx: project_tmp.linkyz,
        });
      }

      const datax = ProjectNo2.reduce((a, v) => (a = a + v.burnt), 0);
      this.setState({ datax: datax });

      ProjectNo.sort((a, b) => {
        if (a.voted < b.voted) {
          return 1;
        }
        if (a.voted > b.voted) {
          return -1;
        }
        return 0;
      });

      ProjectNo2.sort((a, b) => {
        if (a.burnt < b.burnt) {
          return 1;
        }
        if (a.burnt > b.burnt) {
          return -1;
        }
        return 0;
      });

      this.setState({ ProjectNo: ProjectNo });
      this.setState({ ProjectNo2: ProjectNo2 });
    }
  }

  async addProject() {
    const trnsfrAmnt = this.state.voteAmount * 1000000;
    const projectName = this.state.projectName;
    const hak = await this.state.LOPx.methods
      .allowance(this.state.account, this.state.pollyadresi)
      .call();

    if (hak === "0") {
      await this.state.LOPx.methods
        .approve(this.state.pollyadresi, trnsfrAmnt)
        .send({
          from: this.state.account,
          gasPrice: 101000000000,
        });
      this.state.polly15.methods.addProject(projectName, trnsfrAmnt).send({
        from: this.state.account,
        gasPrice: 101000000000,
      });
    } else {
      await this.state.LOPx.methods
        .increaseAllowance(this.state.pollyadresi, trnsfrAmnt)
        .send({
          from: this.state.account,
          gasPrice: 101000000000,
        });
      this.state.polly15.methods.addProject(projectName, trnsfrAmnt).send({
        from: this.state.account,
        gasPrice: 101000000000,
      });
    }
  }

  async addtoProject() {
    const trnsfrAmntx = this.state.voteAmountx * 1000000;
    const projectNumara = this.state.projectNumara;
    const hakx = await this.state.LOPx.methods
      .allowance(this.state.account, this.state.pollyadresi)
      .call();

    if (hakx === "0") {
      await this.state.LOPx.methods
        .approve(this.state.pollyadresi, trnsfrAmntx)
        .send({
          from: this.state.account,
          gasPrice: 101000000000,
        });
      this.state.polly15.methods.addtoProject(projectNumara, trnsfrAmntx).send({
        from: this.state.account,
        gasPrice: 101000000000,
      });
    } else {
      await this.state.LOPx.methods
        .increaseAllowance(this.state.pollyadresi, trnsfrAmntx)
        .send({
          from: this.state.account,
          gasPrice: 101000000000,
        });
      this.state.polly15.methods.addtoProject(projectNumara, trnsfrAmntx).send({
        from: this.state.account,
        gasPrice: 101000000000,
      });
    }
  }

  updateProjectName(evt) {
    console.log("projectName : ", this.state.projectName);
    this.setState({
      projectName: evt.target.value,
    });
  }

  updateprojectNumara(evt) {
    console.log("projectNumara : ", this.state.projectNumara);
    this.setState({
      projectNumara: evt.target.value,
    });
  }

  updateVoteAmount(evt) {
    console.log("voteAmount : ", this.state.voteAmount);
    this.setState({
      voteAmount: evt.target.value,
    });
  }

  updateVoteAmountx(evt) {
    console.log("voteAmountx : ", this.state.voteAmountx);
    this.setState({
      voteAmountx: evt.target.value,
    });
  }

  render() {
    return (
      <div className="text-center">
        <div className="baslik">
          Pathfinder (Youtube Content Voting dAPP of Kilopi D.A.O) v0.2
        </div>
        <div id="votelist">Voting List</div>
        <br />
        <div className="newproject">
          {" "}
          New Project :{" "}
          <input
            style={{ width: "150px", backgroundColor: "#fff0b3" }}
            value={this.state.projectName}
            onChange={this.updateProjectName}
          />{" "}
          &nbsp; Vote :{" "}
          <input
            style={{ width: "150px", backgroundColor: "#fff0b3" }}
            value={this.state.voteAmount}
            onChange={this.updateVoteAmount}
          />{" "}
          &nbsp;
          <button
            className="btn btn-warning"
            onClick={(event) => {
              event.preventDefault();
              this.addProject();
            }}
          >
            Create
          </button>
        </div>
        <div className="vote">
          {" "}
          Project No :{" "}
          <input
            style={{ width: "150px", backgroundColor: "#fff0b3" }}
            value={this.state.projectNumara}
            onChange={this.updateprojectNumara}
          />{" "}
          &nbsp; Vote :{" "}
          <input
            style={{ width: "150px", backgroundColor: "#fff0b3" }}
            value={this.state.voteAmountx}
            onChange={this.updateVoteAmountx}
          />{" "}
          &nbsp;
          <button
            className="btn btn-warning"
            onClick={(event) => {
              event.preventDefault();
              this.addtoProject();
            }}
          >
            Add
          </button>
        </div>
        <br />
        <div className="kolon1">
          <div id="table-left">
            {this.state.loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <Content ProjectNo={this.state.ProjectNo} />
            )}
          </div>
        </div>
        <div className="publishTotalburn">
          <div className="publishVideos">Published Videos</div>
          <div className="totalBurn">
            Total Burnt LOP Tokens ={this.state.datax}
          </div>
        </div>
        <div className="kolon2">
          {this.state.loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <Content2 ProjectNo2={this.state.ProjectNo2} />
          )}
        </div>
      </div>
    );
  }
}

export default App;