import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import words from "./words.json";
 
const { width } = Dimensions.get("window");
 
const hangmanImages = [
  require("../../assets/1.png"),
  require("../../assets/2.png"),
  require("../../assets/3.png"),
  require("../../assets/4.png"),
  require("../../assets/5.png"),
  require("../../assets/6.png"),
  require("../../assets/7.png"),
];
 
const getRandomWord = () => words[Math.floor(Math.random() * words.length)].toUpperCase();
 
const Hangman = () => {
  const router = useRouter();
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
 
  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || incorrectGuesses >= 7) return;
 
    setGuessedLetters([...guessedLetters, letter]);
 
    if (!word.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };
 
  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setIncorrectGuesses(0);
  };
 
  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <Text key={index} style={styles.letter}>
        {guessedLetters.includes(letter) ? letter : "_"}
      </Text>
    ));
  };
 
  const renderAlphabet = () => {
    if (incorrectGuesses >= 6) return null;
 
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
      <TouchableOpacity
        key={letter}
        onPress={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter)}
        style={[
          styles.letterButton,
          guessedLetters.includes(letter) &&
            (word.includes(letter) ? styles.correctLetter : styles.wrongLetter),
        ]}
      >
        <Text
          style={[
            styles.letterText,
            guessedLetters.includes(letter) && styles.disabledLetterText,
          ]}
        >
          {letter}
        </Text>
      </TouchableOpacity>
    ));
  };
 
  const renderHangman = () => {
    if (incorrectGuesses >= 6) {
      return (
        <Image
          source={hangmanImages[6]}
          style={{ width: 250, height: 250, resizeMode: "contain", marginBottom: 20 }}
        />
      );
    }
 
    return (
      <Image
        source={hangmanImages[incorrectGuesses]}
        style={{ width: 250, height: 250, resizeMode: "contain", marginBottom: 20 }}
      />
    );
  };
 
  const renderGameOver = () => {
    if (incorrectGuesses < 6) return null;
 
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Game Over!</Text>
        <TouchableOpacity style={styles.retryButton} onPress={resetGame}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={() => router.push("/")}>
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  };
 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={styles.backText}>Return</Text>
      </TouchableOpacity>
 
      <View style={styles.hangmanContainer}>
        {renderHangman()}
        {renderGameOver()}
      </View>
 
      <Text style={styles.attemptsText}>
        Attempts Left: {Math.max(6 - incorrectGuesses, 0)}
      </Text>
 
      <View style={styles.wordContainer}>{renderWord()}</View>
 
      <View style={styles.alphabetContainer}>{renderAlphabet()}</View>
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
    bottom: 40,
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
  hangmanContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  attemptsText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wordContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  letter: {
    color: "white",
    fontSize: 36,
    marginHorizontal: 5,
  },
  letterText: {
    fontSize: 20,
    color: "white",
  },
  disabledLetterText: {
    opacity: 0.5,
  },
  alphabetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: width * 0.8,
    justifyContent: "center",
  },
  letterButton: {
    width: 30,
    height: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#555",
  },
  correctLetter: {
    backgroundColor: "green",
  },
  wrongLetter: {
    backgroundColor: "red",
  },
  gameOverContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  gameOverText: {
    color: "red",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  retryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  exitButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  exitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
 
export default Hangman;