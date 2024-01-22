import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import color from './constants/color';
import choices from './data/mockData';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    if (userChoice !== null && computerChoice !== null) {
      determineWinner(userChoice, computerChoice);
    }
  }, [userChoice, computerChoice]);

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    randomComputerChoice(choice);
  };

  const randomComputerChoice = (choice) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoice(computerRandomChoice);
  };

  const determineWinner = (user, computerRandomChoice) => {
    if (user?.name === computerRandomChoice?.name) {
      setResult("Berabere!");
    } else if (
      (user?.name === "Taş" && computerRandomChoice?.name === "Makas") ||
      (user?.name === "Kağıt" && computerRandomChoice?.name === "Taş") ||
      (user?.name === "Makas" && computerRandomChoice?.name === "Kağıt")
    ) {
      setResult("Kazandın!");
      setUserScore((prevScore) => prevScore + 1);
    } else {
      setResult("Kaybettin!");
      setComputerScore((prevScore) => prevScore + 1);
    }
  };

  const renderScore = () => {
    return (
      <>

        <View style={styles.title}>
          <Text style={[styles.title]}>TAŞ KAĞIT MAKAS</Text>
        </View >
        <Text style={styles.resultText}>Score</Text>
        <Text style={[styles.resultText]} >
          Kullanıcı : {userScore} - {computerScore} : Telefon
        </Text>
      </>
    );
  };

  // Yeni Oyun Başlatma Fonksiyonu
  const startNewGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setUserScore(0);
    setComputerScore(0);
    setNewGame(!newGame);
  }

  return (
    <>


      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.backgroundColor} barStyle="light-content" />
        <View style={styles.resultContainer}>
          {renderScore()}
        </View>
        <View style={styles.container}>
          <Text style={styles.computerChoiceText}>Kullanıcı Seçimi:</Text>
          <View style={styles.choices}>
            {choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                onPress={() => handleUserChoice(choice)}
                style={
                  choice?.name === userChoice?.name
                    ? [styles.button, styles.buttonActive]
                    : styles.button
                }
              >
                <Image source={choice?.image} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
          {computerChoice && (
            <>
              <Text style={styles.resultText}>{result}</Text>
              <Text style={styles.computerChoiceText}>Bilgisayarın Seçimi:</Text>
              <View style={styles.button}>
                <Image source={computerChoice?.image} style={styles.image} />
              </View>
            </>
          )}

          <View style={styles.containerGame}>
            <TouchableOpacity onPress={startNewGame} style={[styles.button]}>
              <Text style={styles.game}>Yeni Oyun</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  containerGame: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 20,
  },
  computerChoiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: color.white,
  },
  game: {
    color: color.newGame,
    fontSize: 20,
    fontWeight: 'bold',

  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: color.white,
    fontSize: 24,
  },
  buttonActive: {
    borderWidth: 2,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  resultContainer: {
    marginTop: 70,
    alignItems: 'center',
    margin: 28,
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
  },
  resultText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: color.white,
  },
});
