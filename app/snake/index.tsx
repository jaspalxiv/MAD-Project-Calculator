import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
 
const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
 
const SnakeGame = () => {
  const router = useRouter();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y,
        };
 
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }
 
        const newSnake = [newHead, ...prev];
 
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          let newFood: { x: number; y: number };
          do {
            newFood = {
              x: Math.floor(Math.random() * GRID_SIZE),
              y: Math.floor(Math.random() * GRID_SIZE),
            };
          } while (newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
          setFood(newFood);
        } else {
          newSnake.pop();
        }
 
        return newSnake;
      });
    }, 150);
 
    if (gameOver) clearInterval(interval);
    return () => clearInterval(interval);
  }, [direction, gameOver]);
 
  const handleMove = (newDir: { x: number; y: number }) => {
    if (
      (direction.x !== 0 && newDir.x === 0) ||
      (direction.y !== 0 && newDir.y === 0)
    ) {
      setDirection(newDir);
    }
  };
 
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        {!gameOver && (
          <TouchableOpacity onPress={() => router.push("/")} style={styles.quitBtn}>
            <Text style={styles.quitText}>Quit</Text>
          </TouchableOpacity>
        )}
      </View>
 
      {/* Game grid with Nokia look */}
      <View style={styles.grid}>
        {[...Array(GRID_SIZE)].map((_, rowIdx) =>
          [...Array(GRID_SIZE)].map((_, colIdx) => {
            const isSnake = snake.some((s) => s.x === colIdx && s.y === rowIdx);
            const isHead = snake[0].x === colIdx && snake[0].y === rowIdx;
            const isFood = food.x === colIdx && food.y === rowIdx;
            return (
              <View
                key={`${colIdx}-${rowIdx}`}
                style={[
                  styles.cell,
                  isFood
                    ? styles.food
                    : isSnake
                    ? isHead
                      ? styles.snakeHead
                      : styles.snakeBody
                    : styles.emptyCell,
                ]}
              />
            );
          })
        )}
      </View>
 
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.finalScoreText}>Final Score: {score}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={resetGame}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={() => router.push("/")}>
            <Text style={styles.exitText}>Return</Text>
          </TouchableOpacity>
        </View>
      )}
 
      {!gameOver && (
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => handleMove({ x: 0, y: -1 })}
            style={styles.controlBtn}
          >
            <Text style={styles.arrow}>↑</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleMove({ x: -1, y: 0 })}
              style={styles.controlBtn}
            >
              <Text style={styles.arrow}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleMove({ x: 1, y: 0 })}
              style={styles.controlBtn}
            >
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleMove({ x: 0, y: 1 })}
            style={styles.controlBtn}
          >
            <Text style={styles.arrow}>↓</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreText: {
    color: "#ffffff",
    fontSize: 20,
  },
  quitBtn: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 8,
  },
  quitText: {
    color: "#fff",
    fontSize: 16,
  },
  grid: {
    width: GRID_SIZE * CELL_SIZE,
    height: GRID_SIZE * CELL_SIZE,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#001100",
    borderRadius: 8,
    marginTop: 20,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.3,
    borderColor: "#003300",
  },
  emptyCell: {
    backgroundColor: "#001100",
  },
  snakeBody: {
    backgroundColor: "#00aa00",
  },
  snakeHead: {
    backgroundColor: "#00ff00",
  },
  food: {
    backgroundColor: "#ffff00",
  },
  controls: {
    marginTop: 30,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  controlBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#000",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  arrow: {
    fontSize: 30,
    color: "#fff",
  },
  gameOverContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  gameOverText: {
    color: "red",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  finalScoreText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  retryText: {
    color: "white",
    fontSize: 18,
  },
  exitButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  exitText: {
    color: "white",
    fontSize: 18,
  },
});
 
export default SnakeGame;
 
 