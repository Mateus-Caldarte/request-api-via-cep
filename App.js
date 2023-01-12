import axios from 'axios';
import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class App extends Component {
  state = {
    cepDigitado: '',
    dados: {
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      ibge: '',
      gia: '',
      ddd: '',
      siafi: '',
    },
  };
  buscarCep = async () => {
    if (this.state.cepDigitado.length === 8) {
      const {data} = await axios.get(
        `https://viacep.com.br/ws/${this.state.cepDigitado}/json/`,
      );
      this.setState({
        dados: data,
      });
    } else {
      Alert.alert('Cep inválido', 'Informe um cep válido.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txts}>Informe seu cep:</Text>
        <TextInput
          placeholder="Digite seu cep"
          style={styles.i}
          value={this.state.cepDigitado}
          onChangeText={item => this.setState({cepDigitado: item})}
          keyboardType="numeric"
          maxLength={8}
        />
        <TouchableOpacity style={styles.botao} onPress={this.buscarCep}>
          <Text>Buscar</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.txt}>
            Logradouro: {this.state.dados.logradouro}
          </Text>
          <Text style={styles.txt}>
            complemento: {this.state.dados.complemento}
          </Text>
          <Text style={styles.txt}>bairro: {this.state.dados.bairro}</Text>
          <Text style={styles.txt}>
            localidade: {this.state.dados.localidade}
          </Text>
          <Text style={styles.txt}>uf: {this.state.dados.uf}</Text>
          <Text style={styles.txt}>ibge: {this.state.dados.ibge}</Text>
          <Text style={styles.txt}>siafi: {this.state.dados.siafi}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 15,
  },
  i: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    fontSize: 20,
    paddingLeft: 15,
  },
  botao: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: 120,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  txts: {
    fontSize: 20,
  },
  txt: {
    fontSize: 20,
  },
});
