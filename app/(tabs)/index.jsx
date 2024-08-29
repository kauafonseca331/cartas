import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Modal, Dimensions } from 'react-native';
import { cards } from './Dados';

const getRandomCard = () => cards[Math.floor(Math.random() * cards.length)];

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        elevation: 8,
        margin: 10,
        padding: 20,
        width: width * 0.4, // Ajusta a largura com base na largura da tela
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6
    },
    cardImage: {
        width: '100%', // Ajusta a largura da imagem
        height: height * 0.2, // Ajusta a altura com base na altura da tela
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'contain'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#34495e'
    },
    cardContent: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50'
    },
    button: {
        backgroundColor: '#e67e22',
        padding: 15,
        borderRadius: 25,
        width: 200,
        alignItems: 'center',
        marginVertical: 15,
        elevation: 4
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2C3E50',
        opacity: 0.9,
        borderRadius: 20,
        padding: 20,
        width: '85%'
    },
    modalText: {
        color: '#ffffff',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    }
});

export default function CardBattleScreen() {
    const [playerCard, setPlayerCard] = useState(null);
    const [opponentCard, setOpponentCard] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const playRound = () => {
        const player = getRandomCard();
        const opponent = getRandomCard();
        setPlayerCard(player);
        setOpponentCard(opponent);

        let result = '';
        if (player.power > opponent.power) {
            result = 'Você ganhou!';
        } else if (player.power < opponent.power) {
            result = 'Você perdeu!';
        } else {
            result = 'Empate!';
        }

        setResultMessage(`Sua carta: ${player.name} (${player.power})\nCarta do oponente: ${opponent.name} (${opponent.power})\n${result}`);
        setShowModal(true);
    };

    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <View style={style.card}>
                    <Text style={style.cardTitle}>Sua Carta</Text>
                    {playerCard && (
                        <>
                            <Image style={style.cardImage} source={{ uri: playerCard.image }} />
                            <Text style={style.cardContent}>{playerCard.name}</Text>
                            <Text style={style.cardContent}>{playerCard.power}</Text>
                        </>
                    )}
                </View>
                <View style={style.card}>
                    <Text style={style.cardTitle}>Carta do Oponente</Text>
                    {opponentCard && (
                        <>
                            <Image style={style.cardImage} source={{ uri: opponentCard.image }} />
                            <Text style={style.cardContent}>{opponentCard.name}</Text>
                            <Text style={style.cardContent}>{opponentCard.power}</Text>
                        </>
                    )}
                </View>
            </View>
            <Pressable style={style.button} onPress={playRound}>
                <Text style={style.buttonText}>Jogar</Text>
            </Pressable>
            <Modal
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={style.modalContainer}>
                    <Text style={style.modalText}>{resultMessage}</Text>
                    <Pressable style={style.button} onPress={() => setShowModal(false)}>
                        <Text style={style.buttonText}>Fechar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}
