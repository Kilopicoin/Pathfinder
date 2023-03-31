// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

interface IHRC20 {
  function transfer(address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Polly15{

    struct Project{
        uint256 id;
        string name;
        uint256 voted;
		uint256 published;
		uint256 burnt;
		string link;
		string linkyz;
    }

	IHRC20 public token;
	address public owner;
	string name_;
	string linkx_;
	string linky;
	uint256 toid_;
	uint256 toidy;
	uint256 ProjectNum_;
    uint256 miktar_;
	uint256 miktarr_;
	address payable public blackHole;
	address payable public whiteHole;
	
	constructor (address payable black, address payable white, IHRC20 _token) public {
       owner = msg.sender;
	   blackHole = black;
	   whiteHole = white;
       token = _token;
    }
   
	event e_addProject(address indexed e_recorder, string e_project);
	event e_addtoProject(address indexed e_recorder, uint256 e_id);
	event e_publishProject(address indexed e_publisher, string e_project);
	event e_addTx(address indexed e_publisher, string e_project);
	
	uint256 public projectCount;
	
	mapping (uint256 => Project) public ProjectNo;
	
	receive() external payable {
        addProject(name_, miktar_);
		publishProject(ProjectNum_, linkx_);
		addtoProject(toid_, miktarr_);
		addTx(toidy, linky);
    }
	
	function addProject(string memory namex_, uint256 miktarx_) payable public {
		require(miktarx_ > 999999999, "must be more than 1000 nos");
        require(token.balanceOf(address(msg.sender)) > miktarx_, "must be more than requested");
        token.transferFrom(msg.sender,(address(this)),miktarx_);
		projectCount++;
		ProjectNo[projectCount] = Project(projectCount,namex_,miktarx_,0,0,"0","0");
		emit e_addProject(msg.sender, namex_);
	}
	
	function addtoProject(uint256 toidx_, uint256 miktarrx_) payable public {
		require(miktarrx_ > 999999999, "must be more than 1000 nos");
		require(token.balanceOf(address(msg.sender)) > miktarrx_, "must be more than requested");
		require(ProjectNo[toidx_].voted != 0, "no project name");
		require(ProjectNo[toidx_].published == 0, "project not exist");
		token.transferFrom(msg.sender,(address(this)),miktarrx_);
		ProjectNo[toidx_].voted = ProjectNo[toidx_].voted + miktarrx_;
		emit e_addtoProject(msg.sender, toidx_);
	}
	
	function publishProject(uint256 ProjectNum, string memory linkx) payable public {
		require(msg.sender == owner, "only owner");
		require(ProjectNo[ProjectNum].voted != 0, "no project name");
		require(ProjectNo[ProjectNum].published == 0, "project not exist or published");
		uint256 yari = ProjectNo[ProjectNum].voted / 2;
        token.transfer(whiteHole, yari);
        token.transfer(blackHole, yari);
		ProjectNo[ProjectNum].link = linkx;
		ProjectNo[ProjectNum].burnt = yari;
		ProjectNo[ProjectNum].published = 1;
		emit e_publishProject(msg.sender, ProjectNo[ProjectNum].name);
	}
	
	function addTx(uint256 toidy_, string memory linky_) payable public {
		require(msg.sender == owner, "only owner");
		require(ProjectNo[toidy_].voted != 0, "no project name");
		require(ProjectNo[toidy_].published == 1, "project not published");
		ProjectNo[toidy_].linkyz = linky_;
		emit e_addTx(msg.sender, ProjectNo[toidy_].name);
	}
	
	
}