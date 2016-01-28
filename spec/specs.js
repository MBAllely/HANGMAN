describe('getRandomWord', function(){
  it("get random number", function(){
    expect(getRandomWord()).to.equal("goodbye");
  });
});

describe("letterQuest", function() {
  it("replaces the target puzzleArray index with a correct input letter", function() {
    expect(letterQuest("hell", "l")).to.eql(["_", "_", "l", "l"])
  })
})
