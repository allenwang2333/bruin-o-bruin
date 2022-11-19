//import 3D board, a pieceSet array of block pics, count of blocks.
//export 3D board with piece assigned
export default function randomPlaceBlock (board, pieceSet, count) { 
    let length = pieceSet.length;
    let num = Math.floor(Math.floor((count / 3)) / length) * 3;
    var pieces = new Array(length).fill(num);
    // Assign least occurance to each piece
    num *= length;
    let remain = (count - num) / 3;
    for(var i = 0; i < remain; i++){
        pieces[Math.floor(Math.random() * length)] += 3;
    }
    for(const layer in board){
        for(const row in board[layer]){
            for(const col in board[layer][row]){
                if(board[layer][row][col].fill){
                    let curr;
                    do {
                        curr = Math.floor(Math.random() * pieces.length);
                    }while(pieces[curr] === 0);
                    board[layer][row][col].category = pieceSet[curr];
                    pieces[curr]--;
                }
                // else {
                //     board[layer][row][piece].category = null;
                // }
            }
        }
    }
    return board;
}