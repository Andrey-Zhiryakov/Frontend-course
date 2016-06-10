(function(){
  function TicTacToe() {
    this.player = 0;
    this.fieldData = [[,,,],[,,,],[,,,]];
  }

  TicTacToe.prototype = {
    Move(coords) {
      if (!Array.isArray(coords)) {
        return false;
      }

      if (coords[0] < 0|| coords[0] > 2) {
        return false;
      }

      if (coords[1] < 0|| coords[1] > 2) {
        return false;
      }

      if (!this.fieldData[coords[0]][coords[1]]) {
        this.fieldData[coords[0]][coords[1]] = this.player ? 'Y' : 'X';

        this.switchPlayer();

        return true;
      } else {
        return false;
      }
    },

    switchPlayer() {
      if (this.player) {
        this.player = 0;
      } else {
        this.player = 1;
      }
    },

    Check() {
      if (this.checkHorizontal() || this.checkDiagonal() ) {
        return {win: true, winner: Number(!this.player)};
      }

      return {win: false, winner: -1};
    },

    checkHorizontal(){
      var flg = false;
      this.fieldData.forEach((item) => {
        if (!flg) {
          if (item[0] === item[1] && item[1] === item[2] && item[0] !== undefined) {
            flg = true;
          }
        }
      });

      return flg;
    },

    checkDiagonal(){

      if (this.fieldData[1][1] !== undefined) {
        if (this.fieldData[0][0] === this.fieldData[1][1]
          && this.fieldData[1][1] === this.fieldData[2][2]) {
            return true;
          }

        if (this.fieldData[0][2] === this.fieldData[1][1]
          && this.fieldData[1][1] === this.fieldData[2][0]){
            return true;
          }
      }

      return false;
    },

    checkVertical() {
      var cols = [[],[],[]];

      this.fieldData.forEach((item) => {
        cols[0].push(item[0]);
        cols[1].push(item[1]);
        cols[2].push(item[2]);
      });

      var obj = {};
      obj.fieldData = cols;

      return this.checkHorizontal.call(fieldData);
    }
  };

  window.TicTacToe = TicTacToe;
})();
