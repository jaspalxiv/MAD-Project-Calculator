import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const words = ["HELLO", "WORLD", "REACT", "NATIVE"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Hangman = () => {
  const router = useRouter();
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <Text key={index} style={styles.letter}>
        {guessedLetters.includes(letter) ? letter : "_"}
      </Text>
    ));
  };

  const renderAlphabet = () => {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
      <TouchableOpacity
        key={letter}
        onPress={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter)}
        style={[styles.letterButton, 
          guessedLetters.includes(letter) && (word.includes(letter) ? styles.correctLetter : styles.wrongLetter)]}
      >
        <Text style={[styles.letterText, guessedLetters.includes(letter) && styles.disabledLetterText]}>{letter}</Text>
      </TouchableOpacity>
    ));
  };

  const renderHangman = () => {
    return (
      <View style={styles.hangmanDrawing}>
        <View style={styles.gallows}>
          <View style={styles.pole} />
          {incorrectGuesses > 0 && <View style={styles.rope} />}
          {incorrectGuesses > 0 && <View style={styles.head} />}
          {incorrectGuesses > 1 && <View style={styles.body} />}
          {incorrectGuesses > 2 && <View style={styles.leftArm} />}
          {incorrectGuesses > 3 && <View style={styles.rightArm} />}
          {incorrectGuesses > 4 && <View style={styles.leftLeg} />}
          {incorrectGuesses > 5 && <View style={styles.rightLeg} />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}> 
        <Text style={styles.backText}>Return</Text>
      </TouchableOpacity>
      <View style={styles.hangmanContainer}>{renderHangman()}</View>
      <Text style={styles.attemptsText}>Attempts Left: {6 - incorrectGuesses}</Text>
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
  hangmanDrawing: {
    alignItems: "center",
  },
  gallows: {
    width: 80,
    height: 150,
    alignItems: "center",
    position: "relative",
  },
  pole: {
    width: 5,
    height: 100,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
  },
  rope: {
    width: 2,
    height: 20,
    backgroundColor: "#fff",
    position: "absolute",
    top: 10,
  },
  head: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    top: 30,
  },
  body: {
    width: 5,
    height: 40,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },
  leftArm: {
    width: 20,
    height: 5,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
    left: -15,
  },
  rightArm: {
    width: 20,
    height: 5,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
    right: -15,
  },
  leftLeg: {
    width: 20,
    height: 5,
    backgroundColor: "#fff",
    position: "absolute",
    top: 90,
    left: -10,
  },
  rightLeg: {
    width: 20,
    height: 5,
    backgroundColor: "#fff",
    position: "absolute",
    top: 90,
    right: -10,
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
  }
});

export default Hangman;
