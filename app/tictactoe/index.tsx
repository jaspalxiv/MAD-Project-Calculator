import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const TicTacToe = () => {
  const router = useRouter();
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handlePress = (index: number) => {
    if (board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setScores({ ...scores, [currentPlayer]: scores[currentPlayer] + 1 });
      setBoard(Array(9).fill(""));
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === currentPlayer)
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}> 
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.scoreboard}>
        <View style={styles.playerBox}>
          <Text style={styles.playerText}>Player 1</Text>
          <Text style={styles.score}>{scores.X}</Text>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.playerBox}>
          <Text style={styles.playerText}>Player 2</Text>
          <Text style={styles.score}>{scores.O}</Text>
        </View>
      </View>
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => setBoard(Array(9).fill(""))}>
        <Text style={styles.resetText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  playerBox: {
    alignItems: "center",
  },
  playerText: {
    color: "red",
    fontSize: 18,
  },
  score: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  vs: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  board: {
    width: width * 0.8,
    height: width * 0.8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "30%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    margin: 5,
    borderRadius: 10,
  },
  cellText: {
    color: "red",
    fontSize: 36,
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resetText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TicTacToe;
