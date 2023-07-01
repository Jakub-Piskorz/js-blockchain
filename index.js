const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, previousHash = '', data) {
    this.index = index + 1;
    this.timestamp = new Date();
    this.data = '';
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date(), 'Genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      return true;
    }
  }
}

let JacobCoin = new BlockChain();
JacobCoin.addNewBlock(new Block(1, new Date(), { amount: 4 }));
JacobCoin.addNewBlock(new Block(2, '01-01-2137', { amount: 5 }));
JacobCoin.addNewBlock(new Block(3, '01-01-2138', { amount: 2 }));

console.log(JacobCoin);
console.log('is JacobCoin valid? ', JacobCoin.isChainValid());
