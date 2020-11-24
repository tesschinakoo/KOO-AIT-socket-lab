const socket = io();
document.addEventListener("DOMContentLoaded", main);

function handlePlayer1Click(event) {

    const emojiObj = {
        className: 'player1'
    };

    socket.emit('emojiMove', emojiObj);

}

function handlePlayer2Click(event) {

    const emojiObj = {
        className: 'player2'
    };

    socket.emit('emojiMove', emojiObj);
    
}

function main() {
  const player1Btn = document.getElementsByClassName('player1Btn')[0];
  const player2Btn = document.getElementsByClassName('player2Btn')[0];
  
  player1Btn.addEventListener('click', handlePlayer1Click);
  player2Btn.addEventListener('click', handlePlayer2Click);

  socket.on('emojiMove', (event) => {
      console.log('client received', event)
      const emojiToMove = document.getElementsByClassName(event.className)[0];
      emojiToMove.style.left = event.x + 'px';
  });
}