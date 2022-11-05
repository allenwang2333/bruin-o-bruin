function randomPlaceBlock (board, pieceSet, count) {
    let length = pieceSet.length;
    let num = Math.floor(Math.floor((count / 3)) / length) * 3;
    var pieces = new Array(length).fill(num);
    // Assign least occurance to each piece
    num *= length;
    let remain = (count - num) / 3;
    for(i = 0; i < remain; i++){
        pieces[Math.floor(Math.random() * length)] += 3;
    }
    for(const layer in board){
        for(const row in board[layer]){
            for(const piece in board[layer][row]){
                if(board[layer][row][piece]){
                    let curr = Math.floor(Math.random() * pieces.length);
                    while(pieces[curr] == 0){
                        curr = Math.floor(Math.random() * pieces.length);
                    }
                    board[layer][row][piece] = pieceSet[curr];
                    pieces[curr]--;
                }else {
                    board[layer][row][piece] = null;
                }
            }
        }
    }
    return board
}


// function test(){
//     bA = [[[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1]], [[1,1,1,0], [1,1,0,1]], [[1,1], [1,1]]];
//     count = 30
//     pieceSetA = ["A", "B", "C", "D", "E", "F"]
//     pieceSetB = ["A", "B", "C", "D"]

//     console.log(randomPlaceBlock(bA, pieceSetA, count))
//     console.log(randomPlaceBlock(bA, pieceSetB, count))
// }
// test()