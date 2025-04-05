import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("window");

const Calculator = () => {
    const router = useRouter();

    const [input, setInput] = useState<string>("");

    const handleButtonClick = (value: string) => {
        if (value === "AC") {
            setInput("");
        }
        else if (value === "C") {
            setInput(input.slice(0, -1));
        }
        else if (value === "=") {
            try {
                setInput(eval(input).toString());

                if(input == "666"){
                    router.push("./tictactoe");
                }
                else if(input == "108"){
                    router.push("./hangman");
                }
                else if(input == "1111"){
                    router.push("./snake");
                }
            } catch {
                setInput("Error");
            }
        } else {
            setInput(input + value);
        }
    };

    const buttons = [
        ["C", "AC", "%", "÷"],
        ["1", "2", "3", "×"],
        ["4", "5", "6", "-"],
        ["7", "8", "9", "+"],
        ["0", ".", "="]
    ];

    return (
        <View style={styles.container}>
            <View style={styles.displayContainer}>
                <Text style={styles.display}>{input || "0"}</Text>
            </View>
            <View style={styles.buttonGrid}>
                {buttons.flat().map((btn) => (
                    <TouchableOpacity
                        key={btn}
                        style={[styles.button, btn === "=" && styles.equalButton]}
                        onPress={() => handleButtonClick(btn.replace("×", "*").replace("÷", "/"))}
                    >
                        <Text style={styles.buttonText}>{btn}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black",
        width: width,
        height: height,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02,
    },
    displayContainer: {
        width: "100%",
        alignItems: "flex-end",
        paddingHorizontal: width * 0.05,
        marginBottom: height * 0.02,
    },
    display: {
        color: "white",
        fontSize: width * 0.12,
    },
    buttonGrid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#1c1c1c",
        padding: height * 0.02,
        margin: height * 0.005,
        borderRadius: width * 0.11,
        width: width * 0.22,
        height: width * 0.22,
        alignItems: "center",
        justifyContent: "center",
    },
    equalButton: {
        width: width * 0.46,
    },
    buttonText: {
        color: "red",
        fontSize: width * 0.08,
    },
});

export default Calculator;