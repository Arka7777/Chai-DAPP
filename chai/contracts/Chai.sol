// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract chai {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    // ✅ Declare an event for new memos
    event NewMemo(address indexed from, uint timestamp, string name, string message);

    constructor() {
        owner = payable(msg.sender);
    }

    function buy(string memory name, string memory message) public payable {
        require(msg.value > 0, "please pay greater than 0 eth");
        owner.transfer(msg.value);
        
        // ✅ Store memo
        memos.push(Memo(name, message, block.timestamp, msg.sender));

        // ✅ Emit the event so the frontend gets notified
        emit NewMemo(msg.sender, block.timestamp, name, message);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
