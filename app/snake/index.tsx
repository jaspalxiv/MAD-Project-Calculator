import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Check collision with walls
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check collision with itself
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        if (newHead.x === food.x && newHead.y === food.y) {
          // Generate new food
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    if (!gameOver) {
      const interval = setInterval(moveSnake, 300);
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameOver]);

  const handleMove = (newDirection: { x: number; y: number }) => {
    // Prevent reverse movement
    if (direction.x + newDirection.x !== 0 && direction.y + newDirection.y !== 0) {
      setDirection(newDirection);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake Game</Text>
      {gameOver && <Text style={styles.gameOverText}>Game Over!</Text>}

      {/* Grid */}
      <View style={styles.grid}>
        {[...Array(GRID_SIZE)].map((_, y) =>
          [...Array(GRID_SIZE)].map((_, x) => {
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <View
                key={`${x}-${y}`}
                style={[
                  styles.cell,
                  isSnake ? styles.snakeSegment : isFood ? styles.food : styles.emptyCell,
                ]}
              />
            );
          })
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleMove({ x: 0, y: -1 })} style={styles.button}>
          <Text style={styles.arrow}>↑</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleMove({ x: -1, y: 0 })} style={styles.button}>
            <Text style={styles.arrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMove({ x: 1, y: 0 })} style={styles.button}>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleMove({ x: 0, y: 1 })} style={styles.button}>
          <Text style={styles.arrow}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  gameOverText: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "black",
  },
  cell: {
    width: 20,
    height: 20,
    margin: 1,
  },
  emptyCell: {
    backgroundColor: "black",
  },
  snakeSegment: {
    backgroundColor: "brown",
    borderRadius: 5,
  },
  food: {
    backgroundColor: "green",
    borderRadius: 10,
  },
  controls: {
    marginTop: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  },
  arrow: {
    fontSize: 24,
    color: "white",
  },
});

export default SnakeGame;
