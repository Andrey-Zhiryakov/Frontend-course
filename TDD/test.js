describe("Tic Tac Toe game tests:", function(){
	describe('Game initialisation tests (constructor):', function(){
		it("Should create empty game", function(){
			var game = new TicTacToe();
			game.fieldData.should.deep.equal([[,,,],[,,,],[,,,]]);
		});
	});

	describe("Move function tests:", function(){
		var game;
		var correct;
		beforeEach(function(){
			game = new TicTacToe();
			correct = [[,,,],[,,,],[,,,]];
		});

		it("Should set value 'X' into game field array at [0,0]", function() {
			correct[0][0] = 'X';

			game.Move([0,0]);

			game.fieldData.should.deep.equal(correct);
		});

		it("Should set value Y into game field at [1,1]", function() {
			correct[0][0] = 'X';
			correct[1][1] = 'Y';

			game.Move([0,0]);
			game.Move([1,1]);

			game.fieldData.should.deep.equal(correct);
		});

		it("should return true when player moves correctly", function(){
			game.Move([0,0]).should.equal(true);
		});

		it("should return false when received value of field cell is [-1,-1]", function() {
			game.Move([-1,-1]).should.equal(false);
		});

		it("should return false when received value of field cell is [5,5]", function() {
			game.Move([5,5]).should.equal(false);
		});

		it("should return false when received value of field has already been entered", function() {
			game.Move([1,0]);
			game.Move([1,0]).should.equal(false);
		});

		it("should return false when received value is not array", function() {
			game.Move("42").should.equal(false);
		});

		it("should set value 'player' to 0 at empty game", function() {
			game.player.should.equal(0);
		});

		it("should set value 'player' to 1 at first move", function() {
			game.Move([0,0]);
			game.player.should.equal(1);
		});

		it("should set value 'player' to 0 at second move", function() {
			game.Move([0,0]);
			game.Move([0,1]);
			game.player.should.equal(0);
		});
	});

	describe("Check function tests:", function() {
		var game;
		var checkResult;
		beforeEach(function(){
			game = new TicTacToe();
			checkResult = {};
		});

		it("should return check result", function() {
			game.Check().should.be.a('object');
		});

		it("should return result with winner = -1 and win=false", function(){
			checkResult.winner = -1;
			checkResult.win = false;

			game.Check().should.deep.equal(checkResult);
		});

		it("should return positive result when field has horizontal line", function(){
			checkResult.win = true;
			game.fieldData = [['X','X','X'],[],[]];

			game.Check().win.should.deep.equal(checkResult.win);
		});

		it("should return positive result when field has vertical line", function(){
			checkResult.win = true;
			game.fieldData = [['X',,,],['X',,,],['X',,,]];

			game.Check().win.should.deep.equal(checkResult.win);
		});

		it("should return positive result when field has diagonal line", function(){
			checkResult.win = true;
			game.fieldData = [[,,'X'],[,'X',,],['X',,,]];

			game.Check().win.should.deep.equal(checkResult.win);
		});
	});
});
